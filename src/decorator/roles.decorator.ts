import { SetMetadata } from '@nestjs/common';

/**
 * Add meta data 'Roles'
 */

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);