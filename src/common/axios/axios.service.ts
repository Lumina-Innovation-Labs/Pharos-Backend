import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AxiosService {
  constructor(private readonly httpService: HttpService) {}

  async testApi(prompt: string): Promise<AxiosResponse<{ message: string }>> {
    const response = this.httpService.post('/ollama/', { prompt });

    const resolvedResponse = await firstValueFrom(response);

    return resolvedResponse.data;
  }

  async post<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    const response = this.httpService.post<T>(url, data, config);
    return firstValueFrom(response);
  }
}