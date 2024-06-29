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

    /** 
     * Find User with id
     * @param {any} googleSheet 
     * @param {number} id - Id User
     * @return {User | undefined} 
     */
    async findUser(googleSheet: any, id: number): Promise<User> {
        return this.userService.findUser(googleSheet, id);
    }

    /**
     * Find User with username
     * @param {any} googleSheet 
     * @param {string} username - Username User
     * @return {User | undefined}
     */
    async findUserWithUserName(googleSheet: any, username: string): Promise<User> {
        return this.userService.findOne(googleSheet, username);
    }

    /** 
     * Delete User with id
     * @param {any} googleSheet 
     * @param {number} id - Id User
     * @return {User | undefined} 
     */
    async deleteUser(googleSheet: any, id: number): Promise<any> {
        return this.userService.deleteUser(googleSheet, id);
    }

    /** 
     * Restore User with id
     * @param {any} googleSheet 
     * @param {number} id - Id User
     * @return {User | undefined} 
     */
    async restoreUser(googleSheet: any, id: number): Promise<any> {
        return this.userService.restoreUser(googleSheet, id);
    }

}
