import { IsString, IsNotEmpty, IsInt, IsBoolean, IsArray } from 'class-validator';

export class CreateInformationDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;

  @IsArray()
  @IsInt({ each: true })
  @IsNotEmpty()
  categoryIds: number[];
}