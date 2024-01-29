import { IsDecimal, IsEnum, IsString, IsUrl } from 'class-validator';
import { Gender, Nationalities } from '../constants';

export class CreateMonsterDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  title: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsString()
  description: string;

  @IsEnum(Nationalities, { each: true })
  nationalities: Nationalities[];

  @IsString()
  @IsUrl()
  image_url: string;

  @IsDecimal() // TODO: figure out if we need to cast it to another DTO
  speed: number;
}
