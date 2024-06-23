import 'dotenv/config'
import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';

@Injectable()
export class AuthService {
    // Var
    SHEETS_CLIENT_ID: string;
    SHEETS_CLIENT_SECRET: string;
    SHEETS_REDIRECT_URL: string;
    SCOPES: string;
    oAuth2Client: any;
    generateAuthUrl: any;
    tokenPath: string;
    // Constructor
    constructor() {
        this.readEnv();

        this.oAuth2Client = this.createOAuth2Client();
        google.options({auth: this.oAuth2Client});
        this.generateAuthUrl = this.createGenerateAuthUrl();

    }

    // Methods

    /** 
     * Read file envaironment
     */
    private readEnv() : void {
        this.SHEETS_CLIENT_ID = process.env.SHEETS_CLIENT_ID;
        this.SHEETS_CLIENT_SECRET = process.env.SHEETS_CLIENT_SECRET;
        this.SHEETS_REDIRECT_URL = process.env.SHEETS_REDIRECT_URL;
        this.SCOPES = process.env.SHEETS_SCOPES;
        this.tokenPath = process.env.TOKEN_GOOGLE_SHEET_PATH;
    }

    /**
     * Create a new OAuth2 client with the configured keys.
     * @return {google.auth.OAuth2} The OAuth2 client.
     */
    private createOAuth2Client() : any {
        return new google.auth.OAuth2(
            this.SHEETS_CLIENT_ID,
            this.SHEETS_CLIENT_SECRET,
            this.SHEETS_REDIRECT_URL
        );
    }

    /**
     * Generate a url that can be used to create an OAuth2 authorization url.
     * @return {string} The authorization url.
     */
    private createGenerateAuthUrl() : string {
        return this.oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: this.SCOPES,
        });
    }

    /**
     * Get oAuth2Client
     * @return {google.auth.OAuth2} The OAuth2 client.
     */
    getOAuth2Client() : any {
        return this.oAuth2Client;
    }

    /**
     * Get generateAuthUrl
     * @return {string} The authorization url.
     */
    getGenerateAuthUrl() : string {
        return this.generateAuthUrl;
    }

}


