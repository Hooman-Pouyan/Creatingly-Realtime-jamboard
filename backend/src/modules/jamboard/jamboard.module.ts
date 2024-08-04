import { Module } from '@nestjs/common';
import { JamboardGateWay } from './jamboard.gateway';
import { JamboardService } from './jamboard.service';

@Module({
  providers: [JamboardGateWay, JamboardService],
})
export class JamboardModule {}
