import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MonstersController } from './monsters.controller';
import { MonstersService } from './monsters.service';

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

describe('MonstersController', () => {
  let controller: MonstersController;
  let service: MonstersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MonstersController],
      providers: [
        {
          provide: MonstersService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([mockMonster]),
          },
        },
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

    controller = module.get<MonstersController>(MonstersController);
    service = module.get<MonstersService>(MonstersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {});
  describe('findAll', () => {
    it('should call service findAll method', () => {
      controller.findAll();
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });
  describe('findOne', () => {});
  describe('update', () => {});
  describe('remove', () => {});
});
