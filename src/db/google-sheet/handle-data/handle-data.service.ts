import { Injectable } from '@nestjs/common';
import { UserService } from './user/user.service';
import { CreateUser, User } from 'src/user/dto';

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

    /**
     * Upgrade User
     * @param {any} googleSheet 
     * @param {User} user 
     * @returns 
     */
    async upgradeUser(googleSheet: any, user: User): Promise<any> {
        return this.userService.upgradeUser(googleSheet, user);
    }
}
