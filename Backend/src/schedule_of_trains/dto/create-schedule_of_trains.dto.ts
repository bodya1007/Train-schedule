import { IsString, Length } from "class-validator";

export class Create_schedule_of_train_dto {

    @IsString({ message: 'must be string' })
    @Length(4, 10)
    Number_of_train: string;

    @IsString({ message: 'must be string' })
    @Length(4, 25)
    Path_of_train: string;

    @IsString({ message: 'must be string' })
    @Length(4, 20)
    Type_of_train: string;

    @IsString({ message: 'must be string' })
    @Length(4, 16)
    Arrival_time: string;

    @IsString({ message: 'must be string' })
    @Length(4, 16)
    Departure_time: string;
}
