import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as any; // Assuming user object is attached by JwtAuthGuard

    // Check if user exists and has the role 'admin'
    if (user && user.role === 'admin') {
      return true; // User is admin, allow access
    }

    // If not admin, throw ForbiddenException
    throw new ForbiddenException('User does not have sufficient permissions.');
  }
} 