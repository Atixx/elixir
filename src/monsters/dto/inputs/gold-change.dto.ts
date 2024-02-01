import { ApiProperty } from '@nestjs/swagger';
import { Matches } from 'class-validator';

export class GoldChangeDto {
  @ApiProperty()
  @Matches(/^(\d+\.\d{0,4}|\d+|\.\d{0,4})$/, {
    message: 'amount must be positive number up to precision 4',
  })
  amount: string;
}
