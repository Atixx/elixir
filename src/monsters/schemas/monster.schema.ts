import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Gender, Nationalities } from '../constants';
import { HydratedDocument, Types } from 'mongoose';

export type MonsterDocument = HydratedDocument<Monster>;

@Schema()
export class Monster {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  title: string;

  @Prop({ type: String, enum: Gender, required: true })
  gender: string;

  @Prop()
  description: string;

  @Prop([{ type: String, enum: Nationalities, required: true }])
  nationalities: Nationalities[];

  @Prop()
  image_url: string;

  @Prop({ default: 0 })
  goldBalance: number;

  @Prop({ type: Types.Decimal128, required: true })
  speed: number; // TODO: make sure this floating point works well, use https://mongoosejs.com/docs/api/mongoose.html#Mongoose.prototype.Decimal128

  @Prop()
  secretNotes: string; // TODO: what does secret mean?

  @Prop()
  monsterPassword: string; // TODO: how do we salt+hash this?
}

export const MonsterSchema = SchemaFactory.createForClass(Monster);
