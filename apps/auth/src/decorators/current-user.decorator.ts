import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@app/common';

function getCurrentUserByContext(context: ExecutionContext): User {
  return context.switchToHttp().getRequest().user;
}

export const CurrentUser = createParamDecorator(
  (_data: unknown, executionContext: ExecutionContext) =>
    getCurrentUserByContext(executionContext),
);
