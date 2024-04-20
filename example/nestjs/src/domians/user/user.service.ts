import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dtos/user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getAll() {
    const users = await this.userRepository.find();

    return users.map(UserDto.of);
  }

  async getById(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (user === null) {
      throw new NotFoundException('not found user');
    }

    return UserDto.of(user);
  }

  async create(body: CreateUserDto) {
    const user = await this.userRepository.save({ name: body.name });

    return UserDto.of(user);
  }

  async updateById(id: number, body: UpdateUserDto) {
    const userExist = await this.userRepository.existsBy({ id });

    if (userExist === false) {
      throw new NotFoundException('not found user');
    }

    const user = await this.userRepository.save({ id, name: body.name });

    return UserDto.of(user);
  }

  async deleteById(id: number) {
    const userExist = await this.userRepository.existsBy({ id });

    if (userExist === false) {
      throw new NotFoundException('not found user');
    }

    await this.userRepository.delete(id);
  }
}
