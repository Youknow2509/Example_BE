import 'dotenv/config';
import { Injectable, Res, Req, HttpStatus } from '@nestjs/common';
import * as fs from 'fs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class CreateTokenService {
    // Var
    code: string;
    tokenPath: string;
    oAuth2Client: any;
    generateAuthUrl: string;
    tokenData: any;
    // Constructor
    constructor(
        private readonly authService: AuthService
    ) {
        this.oAuth2Client = authService.getOAuth2Client();
        this.generateAuthUrl = authService.getGenerateAuthUrl();
        this.tokenPath = process.env.TOKEN_GOOGLE_SHEET_PATH;

    }

    // Methods

    
    /**
     * Redirect url to oauth2 client
     * @param {Response} res 
     * @returns {} redirect url 
     */
    redirectToUrlOAuth2Client(@Res() res: any) : any {
        this.readTokenFromFile();
        if (this.tokenData) {
            return res.status(HttpStatus.OK)
                .json({
                statusCode: HttpStatus.OK,
                message: 'You have token, token save in path:'+ this.tokenPath,
            });
        } 
        return res.redirect(this.generateAuthUrl);
    }

    /**
     * Get code after login
     * @param {Response} res 
     * @param {Request} req 
     * @returns {} code 
     */
    getCodeAuth(@Res() res: any, @Req() req: any) : any {
        this.code = req.query.code as string;
        this.createToken();
        return res.send('Create token success, token save in path: ' + this.tokenPath);
    }

    /** 
     * Create token after have code auth
     */
    async createToken() : Promise<void> {
        const { tokens } = await this.oAuth2Client.getToken(this.code);
        this.tokenData = tokens;
        await this.writeTokenToFile(tokens);
        console.log('Token saved ok, refesh sever');
    }

    /**
     * Write token to file
     */
    writeTokenToFile(token: any) : void {
        try {
            fs.writeFileSync(
                this.tokenPath,
                JSON.stringify(token, null, 2),
                'utf8',
            );
        } catch (error) {
            console.error('Error writing file:', error);
        }
    }

    /** 
     * Read token in file
     */
    readTokenFromFile() : void {
        try {
            this.tokenData = JSON.parse(fs.readFileSync(this.tokenPath, 'utf8'));
        } catch (error) {
            this.tokenData = undefined;
            console.log('File not found or dont have token');
        }
    }
}
