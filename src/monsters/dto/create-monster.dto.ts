import { IsDecimal, IsEnum, IsString, IsUrl } from 'class-validator';
import { Gender, Nationalities } from '../constants';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMonsterDto {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsEnum(Nationalities, { each: true })
  nationalities: Nationalities[];

  @ApiProperty()
  @IsString()
  @IsUrl()
  image_url: string;

  @ApiProperty()
  @IsDecimal() // TODO: figure out if we need to cast it to another DTO
  speed: number;
}
