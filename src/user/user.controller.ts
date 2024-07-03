import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    ParseIntPipe,
    UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User, CreateUser } from './dto';
import { AuthGuardRole } from '../auth/auth.guard.role';
import { Roles } from 'src/decorator';
import { Role } from '../enum/';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('user')
export class UserController {
    // Constructor
    constructor(private readonly userService: UserService) {}

    // Get all user
    @Roles(Role.VIEW)
    @UseGuards(AuthGuardRole)
    @ApiBearerAuth()
    @Get()
    getAll(): any {
        return this.userService.getUsers();
    }

    // Add user
    @Roles('user')
    @UseGuards(AuthGuardRole)
    @ApiBearerAuth()
    @Post()
    create(@Body() user: CreateUser): any {
        return this.userService.appendDataUser(user);
    }
    
    // Upgrade user
    @Roles('admin')
    @UseGuards(AuthGuardRole)
    @ApiBearerAuth()
    @Put('/upgrade')
    upgrade(@Body() user: User): any {
        user.updated_at = new Date();
        return this.userService.upgradeUser(user);
    }

    // Find user
    @Roles('admin')
    @UseGuards(AuthGuardRole)
    @ApiBearerAuth()
    @Get(':id')
    find(@Param('id', ParseIntPipe) id: number): any {
        return this.userService.findUser(id);
    }

    // Delete user
    @Roles('admin')
    @UseGuards(AuthGuardRole)
    @ApiBearerAuth()
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number): any {
        return this.userService.deleteUser(id);
    }

    // Restore user
    @Roles('admin')
    @UseGuards(AuthGuardRole)
    @ApiBearerAuth()
    @Put(':id/restore')
    restore(@Param('id', ParseIntPipe) id: number): any {
        return this.userService.restoreUser(id);
    }
}
