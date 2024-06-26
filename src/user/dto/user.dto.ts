import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
    Length,
    IsEmail,
    IsDate,
    Min,
    IsBoolean,
    IsString,
    IsNumber,
    IsNotEmpty,
    IsStrongPassword,
    IsIn,
    IsArray,
} from 'class-validator';

export class User {
    // id
    @IsNumber()
    @Min(1)
    @IsNotEmpty()
    @ApiProperty({
        type: 'number',
        description: 'Id',
        example: '1'
    })
    id: number;

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
        type:'string',
        description: 'Gender',
        example:'male'
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

    // created at
    @IsDate()
    @Type(() => Date)
    @IsNotEmpty()
    @ApiProperty({
        type: 'date',
        description: 'Created at',
        example: '2000-01-01T00:00:00.000Z'
    })
    created_at: Date;

    // updated at
    @IsDate()
    @Type(() => Date)
    @IsNotEmpty()
    @ApiProperty({
        type: 'date',
        description: 'Updated at',
        example: '2000-01-01T00:00:00.000Z'
    })
    updated_at: Date;

    // Role
    @IsNotEmpty()
    @IsArray()
    @ApiProperty({
        type: 'array',
        description: 'Role',
        example: ['admin', 'user']
    })
    roles: string[];

    // is deleted
    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({
        type: 'boolean',
        description: 'Is deleted',
        example: true
    })
    is_deleted: boolean;

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }
}
