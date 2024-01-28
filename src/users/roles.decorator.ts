import { SetMetadata } from '@nestjs/common';
import { Role } from './role.enum';
// import { Reflector } from '@nestjs/core';

export const ROLES_KEY = 'roles';
// export const Roles = Reflector.createDecorator<Role[]>;
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
