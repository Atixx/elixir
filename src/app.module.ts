import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MonstersModule } from './monsters/monsters.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { KnownErrorFilter } from './errors/filters/known-errors.filter';
import { APP_FILTER } from '@nestjs/core';
import { HealthController } from './health/health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DB_URI'),
        user: configService.get<string>('DB_USER'),
        pass: configService.get<string>('DB_PASS'),
        dbName: configService.get<string>('DB_NAME'),
      }),
      inject: [ConfigService],
    }),
    MonstersModule,
    AuthModule,
    UsersModule,
    TerminusModule,
    ConfigModule.forRoot(),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
  controllers: [HealthController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: KnownErrorFilter,
    },
  ],
})
export class AppModule {}
