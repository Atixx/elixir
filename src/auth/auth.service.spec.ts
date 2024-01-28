import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { User, UsersService } from '../users/users.service';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UsersService;
  let jwtService: JwtService;
  let result: User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '60m' },
        }),
      ],
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);

    result = {
      userId: 10,
      username: 'test_user',
      password: 'secret_pass',
      roles: ['some_role'],
    };

    jest
      .spyOn(userService, 'findOne')
      .mockImplementation(() => Promise.resolve(result));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('returns the user without password if the passwords match', async () => {
      const validatedUser = await service.validateUser(
        'test_user',
        'secret_pass',
      );

      expect(validatedUser).toBeDefined();
      expect(validatedUser).not.toHaveProperty('password');
    });

    it('returns null if passwords do not match', async () => {
      const validatedUser = await service.validateUser('test_user', 'bad_pass');

      expect(validatedUser).toBeNull();
    });
  });

  describe('signIn', () => {
    it('returns a signed payload if successful', async () => {
      const decoded = jwtService.decode(
        (await service.signIn('test_user', 'secret_pass')).access_token,
      );

      const expectedPayload = {
        sub: result.userId,
        username: result.username,
        roles: result.roles,
      };

      expect(expectedPayload.sub).toEqual(decoded.sub);
      expect(expectedPayload.username).toEqual(decoded.username);
      expect(expectedPayload.roles).toEqual(decoded.roles);
    });

    it('throws UnauthorizedException if passwords do not match', async () => {
      expect(() => service.signIn('test_user', 'bad_pass')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
