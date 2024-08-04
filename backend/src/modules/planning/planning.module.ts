import { Module } from '@nestjs/common';
import { PlanningGateWay } from './planning.gateway';
@Module({
  providers: [PlanningGateWay],
})
export class GateWayModule {}
