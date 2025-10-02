import {
  IsString,
  IsNumber,
  IsNotEmpty,
  Min,
  MinLength,
  MaxLength,
  Max,
  Length,
} from 'class-validator';

export class UpdateReviewDto {
  @IsString({ message: 'Products must be a string' })
  @IsNotEmpty({ message: 'Products is required' })
  @Length(3, 100)
  products?: string;
  @IsNumber({}, { message: 'Rating must be a number' })
  @IsNotEmpty({ message: 'Rating is required' })
  @Min(1, { message: 'Rating must be at least 1' })
  @Max(5, { message: 'Rating must not exceed 5' })
  rating?: number;
  @IsString({ message: 'Products must be a string' })
  @Length(3, 100)
  review?: string;
}
