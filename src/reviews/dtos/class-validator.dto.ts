import { IsInt, Min } from 'class-validator';

export class GetReviewsDto {
  @IsInt()
  @Min(1)
  pageNumber: number;

  @IsInt()
  @Min(1)
  reviewPerPage: number;
}
