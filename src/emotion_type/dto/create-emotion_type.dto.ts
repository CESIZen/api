import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEmotionTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  color: string;
}
