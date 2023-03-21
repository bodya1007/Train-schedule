import { Controller, Get, Post, Body, Put, Param, Delete, UsePipes} from '@nestjs/common';
import { Schedule_of_trains_service } from './schedule_of_trains.service';
import { Create_schedule_of_train_dto } from './dto/create-schedule_of_trains.dto';
import { Update_schedule_of_train_dto } from './dto/update-schedule_of_trains.dto';
import { Validation_pipe } from '../pipes/validation.pipe'

@Controller('schedule-of-trains')
export class Schedule_of_trains_controller {
  constructor(private readonly scheduleOfTrainService: Schedule_of_trains_service) { }

  @UsePipes(Validation_pipe)
  @Post()
  create(@Body() Create_schedule_of_train_dto: Create_schedule_of_train_dto) {
    return this.scheduleOfTrainService.createPath(Create_schedule_of_train_dto);
  }

  @Get()
  findAll() {
    return this.scheduleOfTrainService.findAllPaths();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scheduleOfTrainService.findOnePath(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateScheduleOfTrainDto: Update_schedule_of_train_dto) {
    return this.scheduleOfTrainService.updatePath(+id, updateScheduleOfTrainDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scheduleOfTrainService.removePath(+id);
  }
}
