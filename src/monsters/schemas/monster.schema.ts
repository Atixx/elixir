import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MonsterDocument = HydratedDocument<Monster>;

@Schema()
export class Monster {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  title: string;

  @Prop()
  gender: string; // TODO: add enum/reference/limit options

  @Prop()
  description: string;

  @Prop([String])
  nationality: string[]; // TODO: add enum/reference/limit options

  @Prop()
  image: string;

  @Prop()
  goldBalance: number;

  @Prop()
  speed: number; // TODO: make sure this floating point works well, use https://mongoosejs.com/docs/api/mongoose.html#Mongoose.prototype.Decimal128

  @Prop()
  secretNotes: string; // TODO: what does secret mean?

  @Prop()
  monsterPassword: string; // TODO: how do we salt+hash this?
}

export const MonsterSchema = SchemaFactory.createForClass(Monster);
