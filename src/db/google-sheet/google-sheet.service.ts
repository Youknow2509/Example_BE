import 'dotenv/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleSheetService {
    // Var
    private SHEETS_ID: string;
    private SHEETS_CLIENT_ID: string;
    private SHEETS_CLIENT_SECRET: string;
    private SHEETS_SCOPES: string;
    private SHEETS_REDIRECT_URL: string;

    private token: any;
    // Constructor 
    constructor(

    ) {
        this.SHEETS_ID = process.env.SHEETS_ID;
        this.SHEETS_CLIENT_ID = process.env.SHEETS_CLIENT_ID;
        this.SHEETS_CLIENT_SECRET = process.env.SHEETS_CLIENT_SECRET;
        this.SHEETS_SCOPES = process.env.SHEETS_SCOPES;
        this.SHEETS_REDIRECT_URL = process.env.SHEETS_REDIRECT_URL;
    }


}
