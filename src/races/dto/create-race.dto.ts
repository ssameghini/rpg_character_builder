import { IsInt, IsOptional, IsString } from 'class-validator';
import { AbilityModifier } from 'types/modifiers';

export class CreateRaceDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  size: string;

  @IsOptional()
  @IsInt()
  speed: number;

  @IsOptional()
  abilityModifiers: AbilityModifier;
}
