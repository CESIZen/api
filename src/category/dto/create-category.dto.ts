import {IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString} from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  color?: string;

  @IsBoolean()
  isActive: boolean;
}
