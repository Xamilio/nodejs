import {
  IsInt,
  IsString,
  IsOptional,
  IsNotEmpty,
  Length,
  MinLength,
  MaxLength,
  Min,
  Matches,
  ValidateIf,
} from 'class-validator';

export class CategoryCreateReqDto {
  //@Length(5, 20, { message: 'Min: 5, Max: 20' })
  @MinLength(5, { message: 'Min: 5!' })
  @MaxLength(20, { message: 'Max: 20!' })
  @IsString({ message: 'Title must be string!' })
  title: string;

  @IsNotEmpty({ message: 'Value cannot be empty!' })
  @MinLength(3)
  @MaxLength(30)
  @IsString({ message: 'Slug must be string!' })
  @Matches(/^[a-zA-Z0-9_-]+$/, {
    message:
      'Slug can only contain latin letters, numbers, hyphens (-) and underscores (_)',
  })
  slug: string;

  @IsOptional() // підказує що поле не є обов'язковим
  @IsNotEmpty({ message: 'Value cannot be empty!' })
  @IsString({ message: 'Image path must be string!' })
  image?: string;

  @ValidateIf((_, value) => value !== null)
  @IsInt({ message: 'Parent ID must be an integer!' })
  @Min(1, { message: 'Parent ID must be greater than 0!' })
  parent_id: number | null;
}
