import { Module } from '@nestjs/common';
import { DesignGateWay } from './design.gateway';
@Module({
  providers: [DesignGateWay],
})
export class GateWayModule {}
