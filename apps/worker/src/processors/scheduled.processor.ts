import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';

@Processor('scheduled-queue')
export class ScheduledProcessor extends WorkerHost {
  private readonly logger = new Logger(ScheduledProcessor.name);

  async process(job: Job<any, any, string>): Promise<any> {
    this.logger.log(`[Scheduled Job ${job.id}] Running cron-based trigger: "${job.name}"`);
    
    // Simulate periodic checks like engagement evaluation, node latency pings, clean up matrix
    const { taskType } = job.data;
    
    this.logger.log(`[Scheduled Job ${job.id}] Executing scheduled maintenance task: "${taskType || 'NODE_TELEMETRY_SYNC'}"`);
    
    await new Promise(resolve => setTimeout(resolve, 800));

    this.logger.log(`[Scheduled Job ${job.id}] Task finished.`);
    return {
      status: 'done',
      taskType: taskType || 'NODE_TELEMETRY_SYNC',
    };
  }
}
