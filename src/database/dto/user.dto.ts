export class UserDto {
    // DTO example
    userName: string;
    password: string;
    fullName: string;

    // Constructor
    constructor(partial: Partial<UserDto>) {
        Object.assign(this, partial);
    }
}
