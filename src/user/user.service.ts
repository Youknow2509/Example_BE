import { Injectable } from '@nestjs/common';
import { CreateUser, User } from './dto';
import { GoogleSheetService } from '../db/google-sheet/google-sheet.service';

@Injectable()
export class UserService {
    // Var
    private users: User[] = [];

    // constructor
    constructor(
        private readonly googleSheetService: GoogleSheetService,
    ) {
        // this.users.push({
        //     id: 1,
        //     user: 'admin',
        //     firstName: 'admin',
        //     lastName: 'admin',
        //     email: 'admin',
        //     password: '123',
        //     birthday: new Date(),
        //     gender:'male',
        //     phone: '0123456789',
        //     created_at: new Date(),
        //     updated_at: new Date(),
        //     is_deleted: false
        // });
    }

    // get all user from db
    getUsers(): any {
        return this.googleSheetService.getUsers();
    }

    // add user to db
    appendDataUser(user: CreateUser): any {
        return this.googleSheetService.appendDataUser(user);
    }

    /**
     * Upgrade User
     * @param {User} user 
     * @returns 
     */
    upgradeUser(user: User): any {
        return this.googleSheetService.upgradeUser(user);
    }

    /** 
     * Find User
     * @param {number} id - Id User
     * @return {User | undefined} 
     */
    async findUser(id: number) {        
        return this.googleSheetService.findUser(id);;
    }

    /** 
     * Find User with user name
     * @param {string} userName - User name
     * @return {User | undefined}
     */
    async findUserByUserName(userName: string) {
        return this.googleSheetService.findUserByUserName(userName);
    }

    /**
     * Delete User with id
     * @param {number} id - Id User
     * @return {Promise<any>}
     */
    async deleteUser(id: number) {
        return this.googleSheetService.deleteUser(id);
    }

    /**
     * Restore User with id
     * @param {number} id - Id User
     * @return {Promise<any>}
     */
    async restoreUser(id: number) {
        return this.googleSheetService.restoreUser(id);
    }
}
