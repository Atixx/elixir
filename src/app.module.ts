import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MonstersModule } from './monsters/monsters.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    MonstersModule,
    AuthModule,
    UsersModule,
  ], // TODO: add config params
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
