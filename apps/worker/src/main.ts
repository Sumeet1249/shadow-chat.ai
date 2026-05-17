import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { WorkerModule } from './worker.module';

async function bootstrap() {
  const logger = new Logger('WorkerBootstrap');
  logger.log('Initializing Standalone Production Queue Worker Context...');
  
  // NestJS Standalone Application (does not bind to an HTTP port)
  const app = await NestFactory.createApplicationContext(WorkerModule);
  
  logger.log('Shadow Node Queue Worker successfully booted. Awaiting BullMQ jobs...');
  
  // Graceful shutdown hooks handling
  app.enableShutdownHooks();
}

bootstrap().catch(err => {
  console.error('Fatal error during worker bootstrap:', err);
  process.exit(1);
});
