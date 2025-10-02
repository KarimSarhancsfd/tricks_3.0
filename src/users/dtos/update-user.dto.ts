import {IsString,IsNumber,IsNotEmpty,Min,MinLength,MaxLength, Length, IsOptional} from 'class-validator';


export class UpdateUserDto {
     @IsNotEmpty({ message: 'Name is required' })
     @IsString({ message: 'Name must be a string ' })
     @MinLength(3, { message: 'Name must be at least 3 characters long' })
     @MaxLength(50, { message: 'Name must not exceed 50 characters'})
     @Length(3, 50)
     name?: string | number;

     @IsString({ message: 'Email must be a string' })
     @IsNotEmpty({ message: 'Email is required' })
     email?: string | number;
}