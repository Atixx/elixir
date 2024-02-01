import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MonstersService } from './monsters.service';
import { MonstersController } from './monsters.controller';
import { Monster, MonsterSchema } from './schemas/monster.schema';
import { MonsterProfile } from './profile/monster.profile';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Monster.name, schema: MonsterSchema }]),
  ],
  controllers: [MonstersController],
  providers: [MonstersService, MonsterProfile],
})
export class MonstersModule {}
