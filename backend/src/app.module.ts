import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JamboardModule } from './modules/jamboard/jamboard.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [JamboardModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, JamboardModule, UsersModule],
})
export class AppModule {}
