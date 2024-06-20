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

    // get all users
    getAll(): User[] {
        return this.users.filter(user => user.is_deleted === false);
    }

    // get user by id
    getById(id: number): User {
        return this.users.find(user => user.id === id);
    }

    // get user by email
    getByEmail(email: string): User {
        return this.users.find(user => user.email === email);
    }

    // get user by phone
    getByPhone(phone: string): User {
        return this.users.find(user => user.phone === phone);
    }

    // create user
    create(user: User): User {
        this.users.push(user);
        return user;
    }

    // update user
    update(user: User): User {
        const index = this.users.findIndex(u => u.id === user.id);
        this.users[index] = user;
        return user;
    }

    // delete user
    delete(id: number): User {
        const index = this.users.findIndex(u => u.id === id);
        const user = this.users[index];
        user.is_deleted = true;
        return user;
    }

    // restore user
    restore(id: number): User {
        const index = this.users.findIndex(u => u.id === id);
        const user = this.users[index];
        user.is_deleted = false;
        return user;
    }
}
