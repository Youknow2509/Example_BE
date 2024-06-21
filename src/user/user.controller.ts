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

    // Get all user
    @Get()
    getAll(): any {
        return this.userService.getUsers();
    }

    // Add user
    @Post()
    create(@Body() user: CreateUser): any {
        return this.userService.appendDataUser(user);
    }
    
    // Upgrade user
    @Put('/upgrade')
    upgrade(@Body() user: User): any {
        user.updated_at = new Date();
        return this.userService.upgradeUser(user);
    }

    // Find user
    @Get(':id')
    find(@Param('id', ParseIntPipe) id: number): any {
        return this.userService.findUser(id);
    }

    // Delete user
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number): any {
        return this.userService.deleteUser(id);
    }

    // Restore user
    @Put(':id/restore')
    restore(@Param('id', ParseIntPipe) id: number): any {
        return this.userService.restoreUser(id);
    }
}
