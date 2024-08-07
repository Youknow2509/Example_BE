import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/';

@Injectable()
export class DatabaseService {
    // Database template
    private dbTemplate: Array<UserDto> = new Array<UserDto>();

    // Constructor
    constructor() {
        // Initialize the database with sample data
        this.initDatabase();
    }
    // Helper function init the database
    private initDatabase(): void {
        this.dbTemplate.push(
            new UserDto({
                userName: 'user1',
                password: '1',
                fullName: 'User 1',
            }),
        );
        this.dbTemplate.push(
            new UserDto({
                userName: 'user2',
                password: '2',
                fullName: 'User 2',
            }),
        );
        this.dbTemplate.push(
            new UserDto({
                userName: 'user3',
                password: '3',
                fullName: 'User 3',
            }),
        );
        this.dbTemplate.push(
            new UserDto({
                userName: 'user4',
                password: '4',
                fullName: 'User 4',
            }),
        );
        this.dbTemplate.push(
            new UserDto({
                userName: 'user5',
                password: '5',
                fullName: 'User 5',
            }),
        );
        // v.v
    }
    // Handle get user with username
    public getUserByUsername(userName: string): UserDto | undefined {
        return this.dbTemplate.find((user) => user.userName === userName);
    }
    // Handle get all users
    public getAllUsers(): UserDto[] {
        return this.dbTemplate;
    }
    // Handle add new user
    public addUser(user: UserDto): void {
        this.dbTemplate.push(user);
    }
    // Handle update user
    public updateUser(userName: string, updatedUser: UserDto): void {
        const index = this.dbTemplate.findIndex(
            (user) => user.userName === userName,
        );
        this.dbTemplate[index] = updatedUser;
    }
    // Handle delete user
    public deleteUser(userName: string): void {
        this.dbTemplate = this.dbTemplate.filter(
            (user) => user.userName !== userName,
        );
    }
}
