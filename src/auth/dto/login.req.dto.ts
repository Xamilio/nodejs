import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginReqDto {
  @IsEmail({}, { message: 'Це не email' })
  email: string;

  @IsString()
  @MinLength(1, { message: 'Пароль обов’язковий' })
  password: string;
}
