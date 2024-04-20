import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetUsersQueryDto {
  @ApiPropertyOptional({ type: String, enum: ['0', '1'] })
  withSlowQuery?: '0' | '1';
}
