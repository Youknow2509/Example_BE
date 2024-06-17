import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User, CreateUser } from './dto';
import { unescape } from 'querystring';

@Controller('user')
export class UserController {
    // Constructor
    constructor(private readonly userService: UserService) {}

    // // Get all users
    // @Get()
    // getAll(): User[] {
    //     return this.userService.getAll();
    // }

    @Get()
    getAll(): any {
        return this.userService.getAllUser();
    }

    // Get user by id
    @Get(':id')
    getById(@Param('id', ParseIntPipe) id: number): User {
        return this.userService.getById(id);
    }

    // Add new user
    @Post()
    create(@Body() user: CreateUser): User {
        const user_creat = new User({
            ...user,
            created_at: new Date(),
            updated_at: new Date(),
            is_deleted: false,
        });
        
        return this.userService.create(user_creat);
    }
}
