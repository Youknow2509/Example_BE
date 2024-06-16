import 'dotenv/config';
import { Injectable } from '@nestjs/common';
import { User } from '../../../../user/dto';

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
    async getAllUsers(googleSheet: any): Promise<any> {
        try {
            const res: any = await googleSheet.spreadsheets.values.get({
                spreadsheetId: this.spreadsheetId,
                range: this.range,
            });
    
            const rows: any[][] | null | undefined = res.data.values;
    
            if (rows && rows.length) {
                console.log('Name sheet and range: ' + this.range);
                rows.map(row => {
                    console.log(row);
                });
            } else {
                console.log('No data found.');
            }
    
            return rows;
        } catch (err) {
            throw new Error('The API returned an error: ' + err + ' (ERR: readData in )' + __dirname);
        }
    }
}
