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
    async getAllUsers(googleSheet: any): Promise<any> {
        return this.userService.getAllUsers(googleSheet);
    }
}
