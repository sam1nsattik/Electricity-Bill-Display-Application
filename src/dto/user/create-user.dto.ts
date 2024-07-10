import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly userName: string;
  @IsString()
  @IsNotEmpty()
  readonly email: string;
  @IsString()
  @IsNotEmpty()
  readonly phone_number: string;
  @IsString()
  @IsNotEmpty()
  readonly cardNumber: string;
  @IsString()
  readonly address: string;
  @IsString()
  readonly other: string;
  @IsString()
  readonly naturality: string;
  @IsString()
  readonly family: string;
  @IsBoolean()
  readonly isActiveProfile: boolean;
}
