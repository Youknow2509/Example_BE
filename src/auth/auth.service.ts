import { Injectable } from '@nestjs/common';
import { User } from 'src/user/dto';

@Injectable()
export class AuthService {

    // Constructor
    constructor() {
        console.log('AuthService');
    }

    // Methods

    /*
     *   Register
     *   @param user: User
     */
    register(user: User): User {
        return user;
    }

    /* 
     *   Login
     */
    login() {
        console.log('Login');
    }

    /* 
     *   Logout
     */
    logout() {
        console.log('Logout');
    }
}
