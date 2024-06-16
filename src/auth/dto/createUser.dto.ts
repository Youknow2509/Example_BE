import { Type } from 'class-transformer';
import {
    Length,
    IsEmail,
    IsDate,
    Min,
    IsString,
    IsNumber,
    IsNotEmpty,
    IsStrongPassword,
    IsIn,
} from 'class-validator';

export class CreateUser {
    // id
    @IsNumber()
    @Min(1)
    @IsNotEmpty()
    id: number;

    // user
    @IsString()
    @Length(3, 20)
    @IsNotEmpty()
    user: string;

    // first name
    @IsString()
    @Length(3, 20)
    @IsNotEmpty()
    firstName: string;

    // last name
    @IsString()
    @Length(3, 20)
    @IsNotEmpty()
    lastName: string;

    // email
    @IsEmail()
    @IsNotEmpty()
    email: string;

    // password
    @IsStrongPassword()
    @IsNotEmpty()
    password: string;

    // birthday
    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    birthday: Date;

    // gender
    @IsIn(['male', 'female'])
    @IsNotEmpty()
    gender: string;

    // phone
    @Length(10, 13)
    @IsNotEmpty()
    phone: string;

    // Constructor
    constructor(partial: Partial<CreateUser>) {
        Object.assign(this, partial);
    }
}
