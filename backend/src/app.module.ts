import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JamboardModule } from './modules/jamboard/jamboard.module';

@Module({
  imports: [JamboardModule],
  controllers: [AppController],
  providers: [AppService, JamboardModule],
})
export class AppModule {}
