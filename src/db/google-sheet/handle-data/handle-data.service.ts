import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { UserService } from './user/user.service';

@Injectable()
export class HandleDataService {
    // Var

    // Construct
    constructor(
        private readonly userService: UserService,
    ) {
        
    }
    
    /* 
     * Get All Users
     */
    async getUsers(googleSheet: any): Promise<any> {
        return this.userService.getUsers(googleSheet);
    }

    /* 
     * Get Id Cur
     */
    async getIdCur(googleSheet: any): Promise<any> {
        return this.userService.getIdCur(googleSheet);
    }
}
