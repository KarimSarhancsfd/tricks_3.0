import {IsString,IsNumber,IsNotEmpty,Min,MinLength,MaxLength, Length, IsOptional} from 'class-validator';

export class UpdateProductDto {
  @IsString({message: 'Title must be a string'})
    @IsNotEmpty({message: 'Title is required'})
    // @MinLength(3,{message: 'Title must be at least 3 characters long'})
    // @MaxLength(100,{message: 'Title must not exceed 100 characters'})
    @Length(3, 100)
    @IsOptional() // This decorator indicates that the field is optional
    title?:string;

    // ? this mark refer that it is optional as we know in the update

      @IsString({message: 'Description must be a string'})
    @IsNotEmpty({message: 'Description is required'})
    @MinLength(5,{message: 'Description must be at least 10 characters long'})
      description?:string;


    @IsNumber()
    @IsNotEmpty()
    @Min(0,{message: 'Price must be greater than or equal to 0'})
    @IsOptional() // This decorator indicates that the field is optional
    price?:number;
}