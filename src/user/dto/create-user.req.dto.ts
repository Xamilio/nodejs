import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserReqDto {
  @IsEmail(
    {},
    {
      message: 'Це не email',
    },
  )
  email: string;

  @IsString()
  @MinLength(5, { message: 'Пароль мінімум 5 символів' })
  password: string;

  @IsString()
  @MinLength(2, { message: 'Ім’я мінімум 2 символи' })
  fullname: string;

  @IsOptional()
  @IsBoolean()
  is_block?: boolean;
}
