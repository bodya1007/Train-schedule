import { Module } from '@nestjs/common';
import { Schedule_of_trains_service } from './schedule_of_trains.service';
import { Schedule_of_trains_controller } from './schedule_of_trains.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule_of_trains_entity } from './entities/schedule_of_trains.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Schedule_of_trains_entity])],
  controllers: [Schedule_of_trains_controller],
  providers: [Schedule_of_trains_service]
})
export class Schedule_of_trains_module { }
