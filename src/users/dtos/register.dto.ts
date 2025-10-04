import {
  IsEmail,
  MaxLength,
  MinLength,
  IsString,
  IsNotEmpty,
  IsOptional,
  Length,
} from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsString()
  @Length(2, 150)
  username: string;
}
