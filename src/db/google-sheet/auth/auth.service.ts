import 'dotenv/config'
import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';

@Injectable()
export class AuthService {
    // Var
    private SHEETS_ID: string;
    private SHEETS_CLIENT_ID: string;
    private SHEETS_CLIENT_SECRET: string;
    private SHEETS_SCOPES: string;
    private SHEETS_REDIRECT_URL: string;
    //
    private oAuth2Client: any;
    private authorizeUrl: any;
    // Constructor 
    constructor(
        
    ) {
        this.SHEETS_ID = process.env.SHEETS_ID;
        this.SHEETS_CLIENT_ID = process.env.SHEETS_CLIENT_ID;
        this.SHEETS_CLIENT_SECRET = process.env.SHEETS_CLIENT_SECRET;
        this.SHEETS_SCOPES = process.env.SHEETS_SCOPES;
        this.SHEETS_REDIRECT_URL = process.env.SHEETS_REDIRECT_URL;

        this.oAuth2Client = new google.auth.OAuth2(
            this.SHEETS_CLIENT_ID, 
            this.SHEETS_CLIENT_SECRET,
            this.SHEETS_REDIRECT_URL
        );

        google.options({auth: this.oAuth2Client});

        this.authorizeUrl = this.oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: this.SHEETS_SCOPES,
        });

        console.log(this.oAuth2Client);
        console.log(this.authorizeUrl);
    }

    /* 
     * Get oAuth2Client
     * return {any} oAuth2Client
    */
    getOauthClient(): any {
        return this.oAuth2Client;
    }

    /* 
     * Get authorizeUrl
     * return {any} authorizeUrl
    */
    getAuthorizeUrl(): any {
        return this.authorizeUrl;
    }
}


