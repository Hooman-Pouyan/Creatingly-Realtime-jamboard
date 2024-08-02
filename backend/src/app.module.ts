import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GateWayModule } from './gateway/gateway.module';

@Module({
  imports: [GateWayModule],
  controllers: [AppController],
  providers: [AppService, GateWayModule],
})
export class AppModule {}
