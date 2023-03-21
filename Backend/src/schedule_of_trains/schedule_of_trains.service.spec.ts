import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule_of_trains_entity } from './entities/schedule_of_trains.entity';
import { Schedule_of_trains_service } from './schedule_of_trains.service';
import { Create_schedule_of_train_dto } from './dto/create-schedule_of_trains.dto';
import { Update_schedule_of_train_dto } from './dto/update-schedule_of_trains.dto';

describe('Schedule_of_trains_service', () => {
  let service: Schedule_of_trains_service;
  let repository: Repository<Schedule_of_trains_entity>;
  const mockSchedule = {
    id: 1,
    Arrival_time: String(new Date()),
    Departure_time: String(new Date()),
    Number_of_train: '001',
    Path_of_train: 'A -> B',
    Type_of_train: 'name0ftrain'
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Schedule_of_trains_service,
        {
          provide: getRepositoryToken(Schedule_of_trains_entity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<Schedule_of_trains_service>(Schedule_of_trains_service);
    repository = module.get<Repository<Schedule_of_trains_entity>>(getRepositoryToken(Schedule_of_trains_entity));
  });

  describe('createPath', () => {
    it('should create and return a new Schedule_of_trains_entity object', async () => {
      const dto: Create_schedule_of_train_dto = {
        Arrival_time: '10:00',
        Departure_time: '11:00',
        Number_of_train: '123',
        Path_of_train: 'A->B',
        Type_of_train:'namedd'
      };
      const entity = new Schedule_of_trains_entity();
      entity.id = 1;
      entity.Arrival_time = dto.Arrival_time;
      entity.Departure_time = dto.Departure_time;
      entity.Number_of_train = dto.Number_of_train;
      entity.Path_of_train = dto.Path_of_train;
      entity.Type_of_train = dto.Type_of_train
      jest.spyOn(repository, 'save').mockResolvedValue(entity);

      const result = await service.createPath(dto);

      expect(result).toEqual(entity);
    });
  });

  describe('findAllPaths', () => {
    it('should return an array of Schedule_of_trains_entity objects', async () => {
      const entity1 = new Schedule_of_trains_entity();
      entity1.id = 1;
      entity1.Arrival_time = '10:00';
      entity1.Departure_time = '11:00';
      entity1.Number_of_train = '123';
      entity1.Path_of_train = 'A->B';
      entity1.Type_of_train ='name'
      const entity2 = new Schedule_of_trains_entity();
      entity2.id = 2;
      entity2.Arrival_time = '11:00';
      entity2.Departure_time = '12:00';
      entity2.Number_of_train = '456';
      entity2.Path_of_train = 'B->C';
      entity2.Type_of_train ='names'
      const entities = [entity1, entity2];
      jest.spyOn(repository, 'find').mockResolvedValue(entities);

      const result = await service.findAllPaths();

      expect(result).toEqual(entities);
    });
  });

  describe('findOnePath', () => {
    it('should return a Schedule_of_trains_entity object with the specified id', async () => {
      const entity = new Schedule_of_trains_entity();
      entity.id = 1;
      entity.Arrival_time = '10:00';
      entity.Departure_time = '11:00';
      entity.Number_of_train = '123';
      entity.Path_of_train = 'A->B';
      entity.Type_of_train ='tested'
      jest.spyOn(repository, 'findOne').mockResolvedValue(entity);

      const result = await service.findOnePath(1);

      expect(result).toEqual(entity);
    })
    describe('updatePath', () => {
      it('should update and return the updated schedule of trains', async () => {
        const updatedSchedule: Update_schedule_of_train_dto = {
          Arrival_time: String(new Date('2023-03-18T05:00:00.000Z')),
          Departure_time: String(new Date('2023-03-18T05:15:00.000Z')),
        };

        jest.spyOn(repository, 'findOne').mockResolvedValue(mockSchedule);
        jest.spyOn(repository, 'save').mockResolvedValue({ ...mockSchedule, ...updatedSchedule });

        const result = await service.updatePath(mockSchedule.id, updatedSchedule);

        expect(repository.findOne).toHaveBeenCalledWith({ where: { id: mockSchedule.id } });
        expect(repository.save).toHaveBeenCalledWith({ ...mockSchedule, ...updatedSchedule });
        expect(result).toEqual({ ...mockSchedule, ...updatedSchedule });
      });

      it('should throw an error if the schedule is not found', async () => {
        jest.spyOn(repository, 'findOne').mockResolvedValue(null);

        await expect(service.updatePath(999, { Arrival_time: String(new Date()), Departure_time: String(new Date()) }))
          .rejects.toThrow("Cannot convert undefined or null to object");
      });
    });

    describe('removePath', () => {
      it('should delete the schedule and return a success status', async () => {
        jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 1, raw: null });

        const result = await service.removePath(mockSchedule.id);

        expect(repository.delete).toHaveBeenCalledWith({ id: mockSchedule.id });
        expect(result).toEqual('Path deleted');
      });

      it('should return a failure status when unable to delete the schedule', async () => {
        jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 0, raw: null });

        const result = await service.removePath(mockSchedule.id);

        expect(repository.delete).toHaveBeenCalledWith({ id: mockSchedule.id });
        expect(result).toEqual("There is no such way");
      });
    });

  })
})    
