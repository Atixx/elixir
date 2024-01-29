import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MonstersModule } from './monsters/monsters.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { KnownErrorFilter } from './errors/filters/known-errors.filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    MonstersModule,
    AuthModule,
    UsersModule,
  ], // TODO: add config params
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: KnownErrorFilter,
    },
  ],
})
export class AppModule {}
