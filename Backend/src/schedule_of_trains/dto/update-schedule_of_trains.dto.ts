import { PartialType } from '@nestjs/mapped-types';
import { Create_schedule_of_train_dto } from './create-schedule_of_trains.dto';

export class Update_schedule_of_train_dto extends PartialType(Create_schedule_of_train_dto) { }
