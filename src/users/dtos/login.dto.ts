import {
  IsEmail,
  MaxLength,
  MinLength,
  IsString,
  IsNotEmpty,

} from 'class-validator';

export class LoginDto {
  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;


}
