import 'dotenv/config';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { AuthService } from './auth/auth.service';

@Injectable()
export class GoogleSheetService {
    // Var
    private tokenData: any;

    private OauthClient: any;

    private readonly tokenPath: string = process.env.TOKEN_GOOGLE_SHEET_PATH;
    // Constructor
    constructor(private readonly authService: AuthService) {
        this.OauthClient = this.authService.getOauthClient();

        this.tokenData = JSON.parse(fs.readFileSync(this.tokenPath, 'utf8'));

        this.OauthClient.setCredentials(this.tokenData);

        this.refreshToken();
    }

    // Refresh token
    async refreshToken() {
        try {
            // Refresh the access token
            const tokens = await this.OauthClient.refreshAccessToken();
            const newAccessToken = tokens.credentials.access_token;
            const expiryDate = new Date(tokens.credentials.expiry_date);

            // Update the token data with the new access token and expiry date
            this.tokenData.access_token = newAccessToken;
            this.tokenData.expiry_date = tokens.credentials.expiry_date;

            // Save the updated token back to the file
            fs.writeFileSync(
                this.tokenPath,
                JSON.stringify(this.tokenData, null, 2),
                'utf8',
            );
        } catch (error) {
            console.error('Error refreshing access token:', error);
        }
    }
}
