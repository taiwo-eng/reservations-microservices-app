import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class RoleDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name?: string;
}
