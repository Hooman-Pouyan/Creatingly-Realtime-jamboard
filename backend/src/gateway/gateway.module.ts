import { Module } from '@nestjs/common';
import { GateWay } from './gateway';

@Module({
  providers: [GateWay],
})
export class GateWayModule {}
