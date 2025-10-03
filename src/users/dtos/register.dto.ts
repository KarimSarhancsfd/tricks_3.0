import { IsEmail, MaxLength, MinLength, IsString } from "class-validator";

export class Register {
  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password: string;

  @IsString()
  @MaxLength(50)
  username: string;
}