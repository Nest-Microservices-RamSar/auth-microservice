import { IsString, IsStrongPassword } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  public email: string;

  @IsString()
  public name: string;

  @IsString()
  @IsStrongPassword()
  public password: string;
}
