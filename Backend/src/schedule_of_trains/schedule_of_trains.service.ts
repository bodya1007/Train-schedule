import { Injectable } from '@nestjs/common';
import { Create_schedule_of_train_dto } from './dto/create-schedule_of_trains.dto';
import { Update_schedule_of_train_dto } from './dto/update-schedule_of_trains.dto';
import { Schedule_of_trains_entity } from './entities/schedule_of_trains.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

@Injectable()
export class Schedule_of_trains_service {
  constructor(
    @InjectRepository(Schedule_of_trains_entity)
    private Schedule_of_trains_repository: Repository<Schedule_of_trains_entity>
  ) { }

  async createPath(Create_schedule_of_train_dto: Create_schedule_of_train_dto): Promise<Schedule_of_trains_entity> {
    const { Arrival_time, Departure_time, Number_of_train, Path_of_train, Type_of_train } = Create_schedule_of_train_dto;
    let path = new Schedule_of_trains_entity();
    path.Arrival_time = Arrival_time
    path.Departure_time = Departure_time
    path.Number_of_train = Number_of_train
    path.Path_of_train = Path_of_train
    path.Type_of_train = Type_of_train
    const saved_path = await this.Schedule_of_trains_repository.save(path);

    return saved_path;
  }
  async findAllPaths(): Promise<Schedule_of_trains_entity[]> {
    return await this.Schedule_of_trains_repository.find();
  }
  async findOnePath(id: number): Promise<Schedule_of_trains_entity> {
    const path = await this.Schedule_of_trains_repository.findOne({ where: { id } });

    if (!path) {
      const errors = { path: ' not found' };
      throw new HttpException({ errors }, 401);
    }
    return path
  }
  async updatePath(id: number, Update_schedule_of_train_dto: Update_schedule_of_train_dto): Promise<Schedule_of_trains_entity> {
    let path_to_update = await this.Schedule_of_trains_repository.findOne({ where: { id } });
    let updated_path = Object.assign(path_to_update, Update_schedule_of_train_dto);

    return await this.Schedule_of_trains_repository.save(updated_path);
  }
  async removePath(id: number): Promise<string> {
    const Path_deleted = "Path deleted"
    const Path_was_not_find = 'There is no such way'
    const result = await this.Schedule_of_trains_repository.delete({ id });

    if (result.affected) {
      return Path_deleted
    } else {
      return Path_was_not_find
    }
  }
}
