import { Validation_pipe } from './validation.pipe';
import { ArgumentMetadata } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Validation_exception } from '../exceptions/validation.exception';

jest.mock('class-validator');
jest.mock('class-transformer');

describe('Validation_pipe', () => {
    let validationPipe: Validation_pipe;

    beforeEach(() => {
        validationPipe = new Validation_pipe();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('transform', () => {
        it('should transform the value and return it if validation passes', async () => {
            const value = {
                name: 'John',
                age: 25,
            };
            const metadata: ArgumentMetadata = {
                type: 'body',
                metatype: jest.fn(),
            };
            const dto = plainToClass(metadata.metatype, value);
            (validate as jest.Mock).mockResolvedValue([]);
            (plainToClass as jest.Mock).mockReturnValue(dto);

            const result = await validationPipe.transform(value, metadata);

            expect(plainToClass).toHaveBeenCalledWith(metadata.metatype, value);
            expect(validate).toHaveBeenCalledWith(dto);
            expect(result).toEqual(value);
        });

        it('should throw a BadRequestException if validation fails', async () => {
            const value = {
                name: 'John',
                age: '25',
            };
            const metadata: ArgumentMetadata = {
                type: 'body',
                metatype: jest.fn(),
            };
            const dto = plainToClass(metadata.metatype, value);
            const errors = [
                {
                    property: 'age',
                    constraints: {
                        isNumber: 'age must be a number',
                    },
                },
            ];
            (validate as jest.Mock).mockResolvedValue(errors);
            (plainToClass as jest.Mock).mockReturnValue(dto);

            await expect(validationPipe.transform(value, metadata)).rejects.toThrow(
                new Validation_exception(['age - age must be a number']),
            );
        });
    });
});

