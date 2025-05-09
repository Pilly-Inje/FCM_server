import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as client from 'prom-client';
import axios from 'axios';

@Injectable()
export class MetricsService {
  private errorCounter: client.Counter<string>;

  constructor(
    private readonly configService : ConfigService,
  ) {
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

  async notifyError(message: string) {
    const webhookUrl = this.configService.get<string>('DISCORD_WEBHOOK_URL');
    if (!webhookUrl) {
      console.error('❌ DISCORD_WEBHOOK_URL not set!');
      return;
    }

    try {
      await axios.post(webhookUrl, {
        content: `🚨 **Error 발생 알림**\n\`\`\`\n${message}\n\`\`\``,
      });
    } catch (err) {
      console.error('❌ Discord 알림 실패:', err.message);
    }
  }
}
