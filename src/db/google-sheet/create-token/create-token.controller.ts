import { Controller, Get, Res, Req } from '@nestjs/common';
import { CreateTokenService } from './create-token.service';

@Controller('create-token')
export class CreateTokenController {

    // Constructor
    constructor(
        private readonly createTokenService: CreateTokenService
    ) {

    }

    /**
     * Redirect to URL oath2 client 
     * Method: Get
     * @param {Response} res - Response object
     * @param {Request} req - Request object
     */
    @Get()
    redirect(@Res() res) {
        return this.createTokenService.redirectToUrlOAuth2Client(res);
    }

    /** 
     * Get token after login 
     * Method: Get
     */
    @Get('/oauth2callback')
    getCodeAuth(@Res() res: any, @Req() req: any) {
        return this.createTokenService.getCodeAuth(res, req);
    }
}
