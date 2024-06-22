import 'dotenv/config';
import { Injectable, Res, Req } from '@nestjs/common';
import { google } from 'googleapis';

@Injectable()
export class CreateTokenService {
    // Var
    SHEETS_CLIENT_ID: string;
    SHEETS_CLIENT_SECRET: string;
    SHEETS_REDIRECT_URL: string;
    SCOPES: string;
    oAuth2Client: any;
    generateAuthUrl: any;

    // Constructor
    constructor() {
        this.SHEETS_CLIENT_ID = process.env.SHEETS_CLIENT_ID;
        this.SHEETS_CLIENT_SECRET = process.env.SHEETS_CLIENT_SECRET;
        this.SHEETS_REDIRECT_URL = process.env.SHEETS_REDIRECT_URL;
        this.SCOPES =  process.env.SHEETS_SCOPES;

        this.oAuth2Client = this.createOAuth2Client();
        google.options({auth: this.oAuth2Client});
        this.generateAuthUrl = this.createGenerateAuthUrl();

    }

    // Methods

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

    /**
     * Redirect url to oauth2 client
     * @param {Response} res 
     * @returns {} redirect url 
     */
    redirectToUrlOAuth2Client(@Res() res: any) : any {
        return res.redirect(this.generateAuthUrl);
    }

    /**
     * Get code after login
     * @param {Response} res 
     * @param {Request} req 
     * @returns {} code 
     */
    getCodeAuth(@Res() res: any, @Req() req: any) : any {
        const code : string = req.query.code as string;
        console.log(code);
        return code;
    }
}
