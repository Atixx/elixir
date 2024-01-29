import { IsNumber, IsString } from 'class-validator';

export class AddGoldDto {
  @IsString()
  id: string;

  @IsNumber()
  increaseAmount: number;
}
