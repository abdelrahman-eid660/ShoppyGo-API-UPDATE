import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PermissionEnum, RoleEnum } from '../enum';
import { PermissionName, RoleName } from '../decorator';
import { IS_PUBLIC_KEY } from '../decorator/public.decorator';
import { HUserDocument } from 'src/DB/models';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const roles = this.reflector.getAllAndOverride<RoleEnum[]>(RoleName, [
      context.getHandler(),
      context.getClass(),
    ]);

    const permissions = this.reflector.getAllAndOverride<PermissionEnum[]>(
      PermissionName,
      [context.getHandler(), context.getClass()]
    );

    let user: HUserDocument | undefined;

    switch (context.getType<'http' | 'graphql' | 'ws'>()) {
      case 'graphql':
        user = GqlExecutionContext.create(context).getContext().req?.user;
        break;
      case 'ws':
        user = context.switchToWs().getClient()?.user;
        break;
      default:
        user = context.switchToHttp().getRequest()?.user;
    }

    if (isPublic && !user) {
      return true;
    }

    if (!roles?.length && !permissions?.length) {
      return true;
    }

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    if (user.role === RoleEnum.SUPERADMIN) {
      return true;
    }

    if (roles?.length) {
      const hasRole = roles.includes(user.role);

      if (!hasRole) {
        throw new ForbiddenException('Role denied');
      }
    }

    if (permissions?.length) {
      const hasPermissions = permissions.every((permission) =>
        user.permissions?.includes(permission)
      );

      if (!hasPermissions) {
        throw new ForbiddenException('Permission denied');
      }
    }

    return true;
  }
}