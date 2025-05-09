import { Injectable } from '@nestjs/common';
import * as client from 'prom-client';

@Injectable()
export class MetricsService {
  private errorCounter: client.Counter<string>;

  constructor() {
    const existing = client.register.getSingleMetric('batch_server_errors_total') as client.Counter<string>;

    this.errorCounter =
      existing ??
      new client.Counter({
        name: 'batch_server_errors_total',
        help: 'Total number of errors in batch server',
      });

    // ⚠️ 기본 메트릭 중복 등록 방지
    if (!client.register.getSingleMetric('process_cpu_user_seconds_total')) {
      client.collectDefaultMetrics();
    }
  }

  incError() {
    this.errorCounter.inc();
  }

  async getMetrics(): Promise<string> {
    return await client.register.metrics();
  }
}
