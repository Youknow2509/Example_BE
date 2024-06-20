import 'dotenv/config';
import { Injectable } from '@nestjs/common';
import { User, CreateUser } from '../../../../user/dto';

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
                            id: rows[i][0],
                            user: rows[i][1],
                            firstName: rows[i][2],
                            lastName: rows[i][3],
                            email: rows[i][4],
                            password: rows[i][5],
                            birthday: rows[i][6],
                            gender: rows[i][7],
                            phone: rows[i][8],
                            created_at: rows[i][9],
                            updated_at: rows[i][10],
                            is_deleted: rows[i][11],
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
        createUseruser: CreateUser
    ): Promise<any> {
        const user: User = new User({
            ...createUseruser,
            created_at: new Date(),
            updated_at: new Date(),
            is_deleted: false,
            id: parseInt(await this.getIdCurrent(googleSheet)) + 1,
        });

        const c: any = await this.check(googleSheet, user);
        if (c && c.statusCode === 400) {
            return c;
        }

        const value: any = [
            user.id,
            user.user,
            user.firstName,
            user.lastName,
            user.email,
            user.password,
            user.birthday,
            user.gender,
            user.phone,
            user.created_at,
            user.updated_at,
            user.is_deleted,
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
    };

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
    async check (
        googleSheet: any, 
        user: User
    ): Promise<{
        message: string;
        statusCode: number;
    }> {
        const users: User[] = await this.getUsers(googleSheet);
        for (var i = 0; i < users.length; i++) {
            if (
                users[i].user === user.user 
            ) {
                return {
                    message: "User bi trung !!!",
                    statusCode: 400,
                };
            }
            if (
                users[i].email === user.email 
            ) {
                return {
                    message: "Email bi trung !!!",
                    statusCode: 400,
                };
            }
            if (
                users[i].phone === user.phone 
            ) {
                return {
                    message: "Phone bi trung !!!",
                    statusCode: 400,
                };
            }
        }
    }
}
