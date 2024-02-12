import { PartialType } from '@nestjs/mapped-types';
import { CreateRaceDto } from './create-race.dto';
import { AbilityModifier } from 'types/modifiers';
import { IsOptional, IsString } from 'class-validator';

export class UpdateRaceDto extends PartialType(CreateRaceDto) {
  @IsOptional()
  @IsString()
  readonly size: string;

  @IsOptional()
  @IsString()
  readonly speed: number;

  @IsOptional()
  readonly abilityModifiers: AbilityModifier;
}
