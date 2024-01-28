import { IsArray, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateMonsterDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  title: string;

  @IsString()
  gender: string;

  @IsString()
  description: string;

  @IsArray()
  nationalities: string[];

  @IsString()
  image_url: string;

  @IsNumber()
  @IsPositive()
  speed: number;
}
