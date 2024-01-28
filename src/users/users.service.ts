import { Injectable } from '@nestjs/common';
import { Role } from './role.enum';

export type User = {
  userId: number;
  username: string;
  password: string;
  roles: string[];
};

@Injectable()
export class UsersService {
  // This is clearly a very bad way of storing users, but we care about functionality.
  // if we get to implementing users in the DB, we can add actual pasword hash+salting
  private readonly users = [
    {
      userId: 1,
      username: 'mike',
      password: 'bored',
      roles: [Role.Admin, Role.User],
    },
    {
      userId: 2,
      username: 'elixirCEO',
      password: 'gimme-gold',
      roles: [Role.Admin, Role.CEO],
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
