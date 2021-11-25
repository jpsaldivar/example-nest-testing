import { HttpException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { CatsController } from './controller/cats.controller';
import { Cat, CatSchema } from './schemas/cat.schema';
import { CatsService } from './services/cats.service';

describe('CatsController', () => {
  let catsController: CatsController;
  let catsService: CatsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [
        CatsService,
        {
          provide: 'CAT_MODEL',
          useValue: Cat,
        },
      ],
    }).compile();

    catsService = moduleRef.get<CatsService>(CatsService);
    catsController = moduleRef.get<CatsController>(CatsController);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result: Cat[] = [
        { name: 'simba', age: 1, breed: 'ginger' },
      ] as Cat[];
      jest.spyOn(catsService, 'findAll').mockResolvedValue(result);

      expect(await catsController.findAll()).toBe(result);
    });

    it('should throw an exception if not found the cat ', async () => {
      const foundedId = 'not-exist-id';

      jest.spyOn(catsService, 'findOne').mockResolvedValue(null);
      try {
        await catsController.findOne(foundedId);
      } catch (err) {
        expect(err).toBeInstanceOf(HttpException);
      }
    });

    it('should call create function with the same valor of the request', async () => {
      const request = { name: 'testing-cat', breed: 'test', age: 1 };

      const spyOnCreate = jest
        .spyOn(catsService, 'create')
        .mockResolvedValue(null);
      await catsController.create(request);
      expect(spyOnCreate).toBeCalledWith(request);
    });
  });
});
