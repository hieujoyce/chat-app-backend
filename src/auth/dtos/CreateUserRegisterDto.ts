import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsStrongPassword,
  MinLength,
  MaxLength,
} from 'class-validator';

import { Expose } from 'class-transformer';

export class CreateUserRegisterDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string;

  @Expose()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(32)
  firstName: string;

  @Expose()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(32)
  lastName: string;
}
