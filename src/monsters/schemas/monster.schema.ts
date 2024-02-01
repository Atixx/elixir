import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Gender, Nationalities } from '../constants';
import { HydratedDocument, Types, Document } from 'mongoose';
import { AutoMap } from '@automapper/classes';

export type MonsterDocument = HydratedDocument<Monster>;

@Schema()
export class Monster extends Document {
  @AutoMap()
  id: string;

  @AutoMap()
  @Prop({ required: true })
  firstName: string;

  @AutoMap()
  @Prop({ required: true })
  lastName: string;

  @AutoMap()
  @Prop({ required: true })
  title: string;

  @AutoMap()
  @Prop({ type: String, enum: Gender, required: true })
  gender: string;

  @AutoMap()
  @Prop()
  description: string;

  @AutoMap()
  @Prop([{ type: String, enum: Nationalities, required: true }])
  nationalities: Nationalities[];

  @AutoMap()
  @Prop()
  image_url: string;

  @Prop({
    type: Types.Decimal128,
    required: true,
    default: new Types.Decimal128((0).toFixed(4)),
    validate: (val: number) => {
      return val >= 0;
    },
  })
  goldBalance: Types.Decimal128;

  @Prop({
    type: Types.Decimal128,
    required: true,
    transform: (n: string) => {
      return new Types.Decimal128(n);
    },
  })
  speed: Types.Decimal128;

  @Prop()
  secretNotes: string; // TODO: what does secret mean?

  @Prop()
  monsterPassword: string; // TODO: how do we salt+hash this?
}

export const MonsterSchema = SchemaFactory.createForClass(Monster);
