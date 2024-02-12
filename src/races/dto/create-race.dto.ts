import { IsInt, IsOptional, IsString } from 'class-validator';
import { AbilityModifier } from 'types/modifiers';

export class CreateRaceDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly size: string;

  @IsInt()
  readonly speed: number;

  @IsOptional()
  readonly abilityModifiers: AbilityModifier;
}
