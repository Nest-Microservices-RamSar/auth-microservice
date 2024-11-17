import { IsString } from 'class-validator';

export class LoginUserDto {
  @IsString()
  public email: string;

  @IsString()
  public password: string;
}
