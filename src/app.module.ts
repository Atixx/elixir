import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MonstersModule } from './monsters/monsters.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest'), MonstersModule], // TODO: add config params
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
