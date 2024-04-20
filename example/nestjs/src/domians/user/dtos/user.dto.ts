import { ApiResponseProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/entities/user.entity';

export class UserDto {
  @ApiResponseProperty({ type: Number })
  id: number;

  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: Date })
  createdAt: Date;

  @ApiResponseProperty({ type: Date })
  updatedAt: Date;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.name = user.name;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }

  public static of(user: UserEntity) {
    return new UserDto(user);
  }
}
