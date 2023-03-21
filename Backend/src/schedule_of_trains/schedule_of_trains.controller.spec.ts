import { Test } from '@nestjs/testing';
import { Schedule_of_trains_controller } from './schedule_of_trains.controller';
import { Schedule_of_trains_service } from './schedule_of_trains.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Schedule_of_trains_entity } from './entities/schedule_of_trains.entity';
import { Repository } from 'typeorm';
import { Create_schedule_of_train_dto } from './dto/create-schedule_of_trains.dto';

describe('Schedule_of_trains_controller', () => {
  let scheduleOfTrainController: Schedule_of_trains_controller;
  let scheduleOfTrainService: Schedule_of_trains_service;

  const mockSchedule = { id: 1, Number_of_train: 'Schedule 1', Path_of_train: 'a-b', Arrival_time: "09:00", Departure_time: '11:00', Type_of_train:'naming' };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [Schedule_of_trains_controller],
      providers: [
        Schedule_of_trains_service,
        {
          provide: getRepositoryToken(Schedule_of_trains_entity),
          useClass: Repository,
        },
      ],
    }).compile();

    scheduleOfTrainController = moduleRef.get<Schedule_of_trains_controller>(
      Schedule_of_trains_controller,
    );
    scheduleOfTrainService = moduleRef.get<Schedule_of_trains_service>(
      Schedule_of_trains_service,
    );

  });

  describe('create', () => {
    it('should return a new schedule', async () => {
      const create_schedule_dto: Create_schedule_of_train_dto = {
        Number_of_train: '1235',
        Path_of_train: 'Schedule 1',
        Arrival_time: String(new Date()),
        Departure_time: String(new Date()),
        Type_of_train:'test'
      };

      jest.spyOn(scheduleOfTrainService, 'createPath').mockResolvedValue(mockSchedule);

      const result = await scheduleOfTrainController.create(create_schedule_dto);

      expect(scheduleOfTrainService.createPath).toHaveBeenCalledWith(create_schedule_dto);
      expect(result).toBe(mockSchedule);
    });
  });

  describe('findAll', () => {
    it('should return an array of schedules', async () => {
      jest.spyOn(scheduleOfTrainService, 'findAllPaths').mockResolvedValue([mockSchedule]);

      const result = await scheduleOfTrainController.findAll();

      expect(scheduleOfTrainService.findAllPaths).toHaveBeenCalled();
      expect(result).toEqual([mockSchedule]);
    });
  });

  describe('findOne', () => {
    it('should return a single schedule', async () => {
      jest.spyOn(scheduleOfTrainService, 'findOnePath').mockResolvedValue(mockSchedule);

      const result = await scheduleOfTrainController.findOne('1');

      expect(scheduleOfTrainService.findOnePath).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockSchedule);
    });

    it('should throw an error if the schedule is not found', async () => {
      jest.spyOn(scheduleOfTrainService, 'findOnePath').mockResolvedValue(null);

      await expect(null)
    });
  });

  describe('update', () => {
    it('should update a schedule and return the updated schedule', async () => {
      const mockScheduleId = 1;
      const mockUpdatedSchedule = new Schedule_of_trains_entity();
      mockUpdatedSchedule.Arrival_time = '10:00';
      mockUpdatedSchedule.Departure_time = '11:00';

      jest.spyOn(scheduleOfTrainService, 'updatePath').mockResolvedValue(mockUpdatedSchedule);

      const result = await scheduleOfTrainController.update(mockScheduleId.toString(), mockUpdatedSchedule);

      expect(scheduleOfTrainService.updatePath).toHaveBeenCalledWith(mockScheduleId, mockUpdatedSchedule);
      expect(result).toEqual(mockUpdatedSchedule);
    });
  })
  describe('remove', () => {
    it('should remove a schedule of train with a valid ID', async () => {
      // Arrange
      const id = '1';
      const expectedResult = { message: 'Schedule of train has been deleted' };
      jest.spyOn(scheduleOfTrainService, 'removePath').mockResolvedValue(expectedResult.message);

      // Act
      const result = await scheduleOfTrainController.remove(id);

      // Assert
      expect(result).toBe(expectedResult.message);
    });

    it('should throw an error with an invalid ID', async () => {
      // Arrange
      const id = 'invalid-id';
      jest.spyOn(scheduleOfTrainService, 'removePath').mockRejectedValue(new Error('Invalid ID'));

      // Act & Assert
      await expect(scheduleOfTrainController.remove(id)).rejects.toThrow('Invalid ID');
    });
  });
})

