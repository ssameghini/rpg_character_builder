import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Size } from 'types/character';
import { AbilityModifier } from 'types/modifiers';

export type RaceDocument = HydratedDocument<Race>;

@Schema()
export class Race {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Object })
  abilityModifiers: AbilityModifier;

  @Prop()
  size: Size;

  @Prop()
  speed: number;
}

export const RaceSchema = SchemaFactory.createForClass(Race);
