import { IsNotEmpty, IsString } from 'class-validator';

export class EmotionTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  color: string;
}
