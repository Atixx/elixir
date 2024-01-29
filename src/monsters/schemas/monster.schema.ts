import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Gender, Nationalities } from '../constants';
import { HydratedDocument, Types, Document } from 'mongoose';

export type MonsterDocument = HydratedDocument<Monster>;

@Schema()
export class Monster extends Document {
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

  @Prop({
    type: Types.Decimal128,
    required: true,
    default: new Types.Decimal128('0'),
    validate: (val: number) => {
      return val >= 0;
    },
  })
  goldBalance: number;

  @Prop({
    type: Types.Decimal128,
    required: true,
    transform: (n: string) => {
      return new Types.Decimal128(n);
    },
  })
  speed: number; // TODO: make sure this floating point works well, use https://mongoosejs.com/docs/api/mongoose.html#Mongoose.prototype.Decimal128

  @Prop()
  secretNotes: string; // TODO: what does secret mean?

  @Prop()
  monsterPassword: string; // TODO: how do we salt+hash this?
}

export const MonsterSchema = SchemaFactory.createForClass(Monster);
