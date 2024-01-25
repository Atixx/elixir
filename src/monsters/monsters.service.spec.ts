import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MonstersService } from './monsters.service';
import { Monster } from './schemas/monster.schema';

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
            new: jest.fn().mockResolvedValue(mockMonster),
            constructor: jest.fn().mockResolvedValue(mockMonster),
            find: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
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
});
