import { IsNotEmpty, IsInt, IsOptional, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateEmotionTrackerDto {
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  userId: number;

  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  emotionId: number;

  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  intensity: number;

  @IsString()
  @IsOptional()
  note?: string;

  @IsNotEmpty()
  @Transform(({ value }) => {
    if (typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return new Date(`${value}T00:00:00.000Z`);
    }
    return new Date(value);
  })
  date: Date;
}