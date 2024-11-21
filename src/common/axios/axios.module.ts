import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosService } from './axios.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        baseURL:
          configService.get<string>('LLM_API_URL') || 'http://localhost:5001',
        timeout: 0,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AxiosService],
  exports: [AxiosService, HttpModule],
})
export class AxiosModule {}
