import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Role } from './role.enum';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('finds mike user', async () => {
      const user = service.findOne('mike');
      await expect(user).toBeDefined();
    });

    it('mikes user has admin role', async () => {
      const user = await service.findOne('mike');
      expect(user?.roles).toEqual(expect.arrayContaining([Role.Admin]));
    });

    it('finds elixirCEO user', async () => {
      const user = service.findOne('elixirCEO');
      await expect(user).toBeDefined();
    });

    it('elixirCEO user has ceo role', async () => {
      const user = await service.findOne('elixirCEO');
      expect(user?.roles).toEqual(expect.arrayContaining([Role.CEO]));
    });
  });
});
