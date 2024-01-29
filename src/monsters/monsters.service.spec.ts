import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MonstersService } from './monsters.service';
import { Monster } from './schemas/monster.schema';
import { CreateMonsterDto } from './dto/create-monster.dto';
import { UpdateMonsterDto } from './dto/update-monster.dto';
import { Gender } from './constants';

const mockMonster = {
  first_name: 'Wise',
  last_name: 'Dragon',
  title: 'Mr.',
  gender: 'other',
  description: 'a fat but small creature',
  nationality: ['US', 'ES'],
  image: 'https://m.media-amazon.com/images/I/51rP1azpN1L.jpg',
  gold_balance: 10,
  speed: 5.3,
};

describe('MonstersService', () => {
  let service: MonstersService;
  let model: Model<Monster>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MonstersService,
        {
          provide: getModelToken('Monster'),
          useValue: {
            find: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue([mockMonster]),
            }),
            findOne: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue(mockMonster),
            }),
            findByIdAndDelete: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue(mockMonster),
            }),
            create: jest.fn().mockResolvedValue(mockMonster),
            findOneAndUpdate: jest.fn().mockResolvedValue(mockMonster),
          },
        },
      ],
    }).compile();

    service = module.get<MonstersService>(MonstersService);
    model = module.get<Model<Monster>>(getModelToken('Monster'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should call model findAll method', () => {
      service.findAll();
      expect(model.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should call model create method with params', () => {
      const expectedParams: CreateMonsterDto = {
        firstName: 'foo',
        lastName: '',
        title: '',
        gender: Gender.Other,
        description: '',
        nationalities: [],
        image_url: '',
        speed: 0,
      };

      service.create(expectedParams);
      expect(model.create).toHaveBeenCalledTimes(1);
      expect(model.create).toHaveBeenCalledWith(expectedParams);
    });
  });

  describe('findOne', () => {
    it('should call model findOne method with ID', () => {
      const id = '123asd';

      service.findOne(id);
      expect(model.findOne).toHaveBeenCalledTimes(1);
      expect(model.findOne).toHaveBeenCalledWith({ _id: id });
    });
  });

  describe('remove', () => {
    it('should call model findByIdAndDelete method with ID', () => {
      const id = '123asd';

      service.remove(id);
      expect(model.findByIdAndDelete).toHaveBeenCalledTimes(1);
      expect(model.findByIdAndDelete).toHaveBeenCalledWith({ _id: id });
    });
  });

  describe('update', () => {
    it('should call model findOneAndUpdate method with ID and dto', () => {
      const id = '123asd';
      const expectedParams: UpdateMonsterDto = {
        speed: 3.2,
      };

      service.update(id, expectedParams);
      expect(model.findOneAndUpdate).toHaveBeenCalledTimes(1);
      expect(model.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: id },
        expectedParams,
        { new: true },
      );
    });
  });

  describe('removeGold', () => {
    // TODO: fail correctly
    xit('should fail if attempting to remove more gold than available', () => {
      test.todo;
    });
  });
});
