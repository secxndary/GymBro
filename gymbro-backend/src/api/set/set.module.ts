import { Module } from '@nestjs/common';
import { SetService } from './set.service';
import { SetController } from './set.controller';

@Module({
  providers: [SetService],
  controllers: [SetController]
})
export class SetModule {}
