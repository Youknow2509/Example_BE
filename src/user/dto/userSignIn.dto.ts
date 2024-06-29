import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
    Length,
    IsString,
    IsNotEmpty,
    IsStrongPassword,
} from 'class-validator';

export class userSignIn {
  
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

    // password
    @IsNotEmpty()
    @ApiProperty({
        type:'string',
        description: 'Password',
        example: 'ookLvA!pHbyDay=kwwmNNE.F0'
    })
    password: string; 

    // Constructor
    constructor(partial: Partial<userSignIn>) {
        Object.assign(this, partial);
    }
}
