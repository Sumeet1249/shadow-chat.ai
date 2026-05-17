import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';
import { WorkflowProcessor } from './processors/workflow.processor';
import { ScheduledProcessor } from './processors/scheduled.processor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        connection: {
          host: config.get<string>('REDIS_HOST', 'localhost'),
          port: config.get<number>('REDIS_PORT', 6379),
          password: config.get<string>('REDIS_PASSWORD', undefined),
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: 'workflow-queue',
    }),
  ],
  providers: [
    WorkflowProcessor,
    ScheduledProcessor,
  ],
})
export class WorkerModule {}
