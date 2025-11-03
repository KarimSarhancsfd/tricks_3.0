import {
  MinLength,
  IsString,
  IsNotEmpty,
  IsOptional,
  Length,
} from 'class-validator';

export class UpdatteUserDto {

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  @IsOptional()
  password: string;

  @IsOptional()
  @IsString()
  @Length(2, 150)
  @IsOptional()
  username: string;
}
