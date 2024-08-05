import { Module } from '@nestjs/common';
import { UsersGateWay } from './users.gateway';
import { UsersService } from './users.service';

@Module({
  providers: [UsersGateWay, UsersService],
})
export class UsersModule {}
