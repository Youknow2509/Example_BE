import 'dotenv/config';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { AuthService } from './auth/auth.service';
import { google } from 'googleapis';
import { HandleDataService } from './handle-data/handle-data.service';
import { CreateUser, User } from'src/user/dto';

@Injectable()
export class GoogleSheetService {
    // Var
    private tokenData: any;

    private OauthClient: any;

    private googleSheet: any;

    private readonly tokenPath: string = process.env.TOKEN_GOOGLE_SHEET_PATH;
    // Constructor
    constructor(
        private readonly authService: AuthService,
        private readonly handleDataService: HandleDataService
    ) {
        this.OauthClient = this.authService.getOauthClient();

        this.tokenData = JSON.parse(fs.readFileSync(this.tokenPath, 'utf8'));

        this.OauthClient.setCredentials(this.tokenData);

        this.refreshToken();
        
        this.googleSheet = google.sheets({
                    version: 'v4',
                    auth: this.OauthClient,
        });
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

    /** 
     * Get all User
     * @return {any} All information user in google sheet
    */
    async getUsers() {
        return this.handleDataService.getUsers(this.googleSheet);
    }

    /** 
     * Get Id current
     * @return {int} Id current
     */
    async getIdUserCurrent() {
        return this.handleDataService.getIdUserCurrent(this.googleSheet);
    }

    /** 
     * Append Data User
     * @param {CreateUser} user - Create User Object to append to google sheet
     */
    async appendDataUser(user: CreateUser) {
        return this.handleDataService.appendDataUser(this.googleSheet, user);
    }

    /**
     * Upgrade User
     * @param {User} user 
     * @returns
     */
    async upgradeUser(user: User) {
        return this.handleDataService.upgradeUser(this.googleSheet, user);
    }

    /** 
     * Find User with id
     * @param {number} id - Id User
     * @return {User | undefined} 
     */
    async findUser(id: number) {
        return this.handleDataService.findUser(this.googleSheet, id);
    }

    /**
     * Delete User with id
     * @param { number } id - Id User
     * @return {}
     */
    async deleteUser(id: number) {
        return this.handleDataService.deleteUser(this.googleSheet, id);
    }

    /**
     * Restore User with id
     * @param { number } id - Id User
     * @return {}
     */
    async restoreUser(id: number) {
        return this.handleDataService.restoreUser(this.googleSheet, id);
    }
}
