import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dtos/user.dto';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { GetUsersQueryDto } from './dtos/get-users-query.dto';

@ApiTags('UserController')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'get all users' })
  @ApiResponse({ type: [UserDto] })
  async getAll(@Query() query: GetUsersQueryDto) {
    return this.userService.getAll(query);
  }

  @Get(':id(\\d+)')
  @ApiOperation({ summary: 'get user by id' })
  @ApiResponse({ type: UserDto })
  async getById(@Param('id') id: number) {
    return this.userService.getById(id);
  }

  @Post()
  @ApiOperation({ summary: 'create user' })
  @ApiCreatedResponse({ type: UserDto })
  async create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Patch(':id(\\d+)')
  @ApiOperation({ summary: 'update user by id' })
  @ApiResponse({ type: UserDto })
  async updateById(@Param('id') id: number, @Body() body: UpdateUserDto) {
    return this.userService.updateById(id, body);
  }

  @Delete(':id(\\d+)')
  @ApiOperation({ summary: 'delete user by id' })
  @ApiResponse({ type: null })
  async deleteById(@Param('id') id: number) {
    return this.userService.deleteById(id);
  }
}
