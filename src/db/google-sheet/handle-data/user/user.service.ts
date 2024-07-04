import 'dotenv/config';
import { Injectable } from '@nestjs/common';
import { User, CreateUser } from '../../../../user/dto';
import {
    Decryption,
    Encryption,
    BcryptHash,
    BcryptCompare,
} from '../../../../utils';

@Injectable()
export class UserService {
    // Var
    private readonly spreadsheetId: string;
    private readonly range: string;
    private readonly token: JSON;

    // Constructor
    constructor() {
        this.spreadsheetId = process.env.SHEETS_ID_USER;
        this.range = process.env.SHEETS_RANGE_USER;
    }

    /* 
     * Get all users
     * @param {any} googleSheet - google.sheets({
                    version: 'v4',
                    auth: this.OauthClient,
        });
    
     * @return {Promise<User>}
    */
    async getUsers(googleSheet: any): Promise<any> {
        try {
            const res: any = await googleSheet.spreadsheets.values.get({
                spreadsheetId: this.spreadsheetId,
                range: this.range,
            });

            const rows: any[][] | null | undefined = res.data.values;
            var users: User[] = [];

            if (rows && rows.length > 1) {
                for (var i = 1; i < rows.length; i++) {
                    users.push(
                        new User({
                            id: Number(await Decryption(rows[i][0])),
                            user: await Decryption(rows[i][1]),
                            firstName: await Decryption(rows[i][2]),
                            lastName: await Decryption(rows[i][3]),
                            email: await Decryption(rows[i][4]),
                            password: 'Hash password: ' + rows[i][5],
                            birthday: new Date(await Decryption(rows[i][6])),
                            gender: await Decryption(rows[i][7]),
                            phone: await Decryption(rows[i][8]),
                            created_at: new Date(await Decryption(rows[i][9])),
                            updated_at: new Date(await Decryption(rows[i][10])),
                            roles: (await Decryption(rows[i][11])).split(','),
                            is_deleted:
                                (
                                    await Decryption(rows[i][12])
                                ).toLowerCase() === 'true',
                        }),
                    );
                }
            } else {
                console.log('No data found.');
            }

            return users;
        } catch (err) {
            throw new Error(
                'The API returned an error: ' +
                    err +
                    ' (ERR: readData in )' +
                    __dirname,
            );
        }
    }

    /**
     * Append data to a Google Sheets spreadsheet.
     * @param {any} googleSheet -
     * @param {CreateUser} user -
     * @return {Promise<any>} -
     */
    async appendData(
        googleSheet: any,
        createUseruser: CreateUser,
    ): Promise<any> {
        const user: User = new User({
            ...createUseruser,
            created_at: new Date(),
            updated_at: new Date(),
            is_deleted: false,
            roles: ['user'],
            id: parseInt(await this.getIdCurrent(googleSheet)) + 1,
        });

        const c: any = await this.check(googleSheet, user);
        if (c && c.statusCode === 400) {
            return c;
        }

        const value: any = [
            await Encryption(user.id.toString()),
            await Encryption(user.user),
            await Encryption(user.firstName),
            await Encryption(user.lastName),
            await Encryption(user.email),
            // Hash password with bcrypt
            await BcryptHash(user.password),
            await Encryption(user.birthday.toString()),
            await Encryption(user.gender),
            await Encryption(user.phone),
            await Encryption(user.created_at.toString()),
            await Encryption(user.updated_at.toString()),
            await Encryption(user.roles.toString()),
            await Encryption(user.is_deleted.toString()),
        ];

        try {
            const result = await googleSheet.spreadsheets.values.append({
                spreadsheetId: this.spreadsheetId,
                range: this.range,
                valueInputOption: 'USER_ENTERED',
                insertDataOption: 'INSERT_ROWS',
                resource: {
                    values: [value],
                },
            });
            return result.config.data.values; // todo change
        } catch (err) {
            throw new Error(
                'The API returned an error: ' +
                    err +
                    ' (ERR: appendData in )' +
                    __dirname,
            );
        }
    }

    /**
     * Upgrade user data in database
     * @param {any} googleSheet
     * @param {User} user
     * @returns
     */
    async upgradeUser(googleSheet: any, user: User): Promise<any> {
        // const c: any = await this.check(googleSheet, user);
        // if (c && c.statusCode === 400) {
        //     return c;
        // }

        try {
            const result = await googleSheet.spreadsheets.values.update({
                spreadsheetId: this.spreadsheetId,
                range: `Users!A${Number(user.id) + 1}:M${Number(user.id) + 1}`,
                valueInputOption: 'USER_ENTERED',
                resource: {
                    values: [
                        [
                            await Encryption(user.id.toString()),
                            await Encryption(user.user),
                            await Encryption(user.firstName),
                            await Encryption(user.lastName),
                            await Encryption(user.email),
                            // Hash password with bcrypt
                            await BcryptHash(user.password),
                            await Encryption(user.birthday.toString()),
                            await Encryption(user.gender),
                            await Encryption(user.phone),
                            await Encryption(user.created_at.toString()),
                            await Encryption(user.updated_at.toString()),
                            await Encryption(user.roles.toString()),
                            await Encryption(user.is_deleted.toString()),
                        ],
                    ],
                },
            });
            return result.config.data.values; // todo change
        } catch (err) {
            throw new Error(
                'The API returned an error: ' +
                    err +
                    ' (ERR: upgradeUser in )' +
                    __dirname,
            );
        }
    }

    /**
     * Delete user in database
     * @param {any} googleSheet
     * @param {number} id
     * @returns
     */
    async deleteUser(googleSheet: any, id: number): Promise<any> {
        const user: User = await this.findUser(googleSheet, id);
        if (!user) {
            return {
                statusCode: 404,
                message: 'User not found',
            };
        }
        this.upgradeUser(
            googleSheet,
            new User({
                ...user,
                is_deleted: true,
                updated_at: new Date(),
            }),
        );
    }

    /**
     * Restore user in database
     * @param { any } googleSheet
     * @param { number } id
     * @returns
     */
    async restoreUser(googleSheet: any, id: number): Promise<any> {
        const user: User = await this.findUser(googleSheet, id);
        if (!user) {
            return {
                statusCode: 404,
                message: 'User not found',
            };
        }
        this.upgradeUser(
            googleSheet,
            new User({
                ...user,
                is_deleted: false,
                updated_at: new Date(),
            }),
        );
    }

    /**
     * Find user in database
     * @param {any} googleSheet
     * @param {string | number} identifier
     * @returns {User}
     */
    async findUser(
        googleSheet: any,
        identifier: number,
    ): Promise<User> {
        try {
            const res: any = await googleSheet.spreadsheets.values.get({
                spreadsheetId: this.spreadsheetId,
                range: `Users!A${Number(identifier) + 1}:M${Number(identifier) + 1}`,
            });

            const cols: string[][] | null | undefined = res.data.values;

            if (!cols) {
                throw {
                    statusCode: 404,
                    message: 'User not found',
                };
            }
            return new User({
                id: Number(await Decryption(cols[0][0])),
                user: await Decryption(cols[0][1]),
                firstName: await Decryption(cols[0][2]),
                lastName: await Decryption(cols[0][3]),
                email: await Decryption(cols[0][4]),
                password: 'Hash password: ' + cols[0][5],
                birthday: new Date(await Decryption(cols[0][6])),
                gender: await Decryption(cols[0][7]),
                phone: await Decryption(cols[0][8]),
                created_at: new Date(await Decryption(cols[0][9])),
                updated_at: new Date(await Decryption(cols[0][10])),
                roles: (await Decryption(cols[0][11])).split(','),
                is_deleted:
                    (await Decryption(cols[0][12])).toLowerCase() === 'true',
            });
        } catch (err) {
            console.log('Err handle find User');
            throw err;
        }
    }

    /**
     * FindOne - Handle find User with username
     * @param {string} username
     * @param googleSheet
     * @returns {User}
     */
    async findOne(googleSheet: any, username: string): Promise<User> {
        // Get all user name and compare
        try {
            const res: any = await googleSheet.spreadsheets.values.get({
                spreadsheetId: this.spreadsheetId,
                range: `Users!B2:B`,
            });

            const rows: string[][] | null | undefined = res.data.values;

            if (!rows) {
                throw {
                    statusCode: 404,
                    message: 'User not found',
                };
    
            }
            username = await Encryption(username);
            for (var i = 0; i < rows.length; i++) {
                if (rows[i][0] === username) {
                    return await this.findUser(googleSheet, i + 1);
                }
            }
            throw {
                statusCode: 404,
                message: 'User not found',
            }
        } catch (err) {
            console.log('Err in handle find one with username');
            throw err;
        }
    }

    /*
     * Help function get Id current
     * GetIdCurrent
     * @return {int} Id
     */
    async getIdCurrent(googleSheet: any): Promise<any> {
        try {
            const res: any = await googleSheet.spreadsheets.values.get({
                spreadsheetId: this.spreadsheetId,
                range: 'Users!A1:A',
            });

            const rows: any[][] | null | undefined = res.data.values;

            return rows.length - 1;
        } catch (err) {
            throw new Error(
                'The API returned an error: ' +
                    err +
                    ' (ERR: readData in )' +
                    __dirname,
            );
        }
    }

    /**
     * Help function check handle data can update and append to database
     * @param {any} googleSheet -
     * @param {User} user -
     * @return {Promise<any>} -
     */
    async check(
        googleSheet: any,
        user: User,
    ): Promise<{
        message: string;
        statusCode: number;
    }> {
        const users: User[] = await this.getUsers(googleSheet);
        for (var i = 0; i < users.length; i++) {
            if (users[i].user === user.user) {
                return {
                    message: 'User bi trung !!!',
                    statusCode: 400,
                };
            }
            if (users[i].email === user.email) {
                return {
                    message: 'Email bi trung !!!',
                    statusCode: 400,
                };
            }
            if (users[i].phone === user.phone) {
                return {
                    message: 'Phone bi trung !!!',
                    statusCode: 400,
                };
            }
        }
    }
}
