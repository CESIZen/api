import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateEmotionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsInt()
  emotionTypeId: number;
}