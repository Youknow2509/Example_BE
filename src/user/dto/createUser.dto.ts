import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
    Length,
    IsEmail,
    IsDate,
    IsString,
    IsNotEmpty,
    IsStrongPassword,
    IsIn,
} from 'class-validator';

export class CreateUser {
  
    // user
    @IsString()
    @Length(3, 20)
    @IsNotEmpty()
    @ApiProperty({
        type:'string',
        description: 'User name',
        example: 'abc123'
    })
    user: string;

    // first name
    @IsString()
    @Length(3, 20)
    @IsNotEmpty()
    @ApiProperty({
        type:'string',
        description: 'First name',
        example: 'Your first name'
    })
    firstName: string;

    // last name
    @IsString()
    @Length(3, 20)
    @IsNotEmpty()
    @ApiProperty({
        type:'string',
        description: 'Last name',
        example: 'Your last name'
    })
    lastName: string;

    // email
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        type:'string',
        description: 'Email',
        example: 'lytranvinh.work@gmail.com'
    })
    email: string;

    // password
    @IsStrongPassword()
    @IsNotEmpty()
    @ApiProperty({
        type:'string',
        description: 'Password',
        example: 'ookLvA!pHbyDay=kwwmNNE.F0'
    })
    password: string;

    // birthday
    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    @ApiProperty({
        type: 'date',
        description: 'Birthday',
        example: '2000-01-01T00:00:00.000Z'
    })
    birthday: Date;

    // gender
    @IsIn(['male', 'female'])
    @IsNotEmpty()
    @ApiProperty({
        type: 'string',
        description: 'Gender',
        example: 'male'
    })
    gender: string;

    // phone
    @Length(10, 13)
    @IsNotEmpty()
    @ApiProperty({
        type:'string',
        description: 'Phone',
        example: '0123456789'
    })
    phone: string;

    // Constructor
    constructor(partial: Partial<CreateUser>) {
        Object.assign(this, partial);
    }
}
