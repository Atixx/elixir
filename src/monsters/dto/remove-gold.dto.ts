import { IsNumber, IsString } from 'class-validator';

export class RemoveGoldDto {
  @IsString()
  id: string;

  @IsNumber()
  decreaseAmount: string;
}
