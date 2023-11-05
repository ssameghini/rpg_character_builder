import { PartialType } from '@nestjs/mapped-types';
import { CreateRaceDto } from './create-race.dto';
import { AbilityModifier } from 'types/modifiers';
import { IsOptional, IsString } from 'class-validator';

export class UpdateRaceDto extends PartialType(CreateRaceDto) {
  @IsOptional()
  @IsString()
  size: string;

  @IsOptional()
  @IsString()
  speed: number;

  @IsOptional()
  abilityModifiers: AbilityModifier;
}
