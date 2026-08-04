import { IsOptional, IsString } from 'class-validator';

export class RecommendationDto {
  @IsOptional()
  @IsString()
  preference?: string;

  @IsOptional()
  @IsString()
  mood?: string;

  @IsOptional()
  @IsString()
  flavorNotes?: string;

  @IsOptional()
  @IsString()
  milkType?: string;

  @IsOptional()
  @IsString()
  temperature?: string;
}
