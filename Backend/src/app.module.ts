import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule_of_trains_module } from './schedule_of_trains/schedule_of_trains.module';
import { Schedule_of_trains_entity } from './schedule_of_trains/entities/schedule_of_trains.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Schedule_of_trains_entity],
      synchronize: true,
    }),
    Schedule_of_trains_module],
  controllers: [],
  providers: [],
})
export class AppModule { }
