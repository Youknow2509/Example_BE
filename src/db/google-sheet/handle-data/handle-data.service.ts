import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { UserService } from './user/user.service';
import { CreateUser } from 'src/user/dto';

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
     * Get Id current
     */
    async getIdUserCurrent(googleSheet: any): Promise<any> {
        return this.userService.getIdCurrent(googleSheet);
    }

    /* 
     * Append Data User
     * @param {any} googleSheet
     * @param {CreateUser} user - Create User Object to append to google sheet
     */
    async appendDataUser(googleSheet: any, user: CreateUser): Promise<any> {
        return this.userService.appendData(googleSheet, user);
    }
}
