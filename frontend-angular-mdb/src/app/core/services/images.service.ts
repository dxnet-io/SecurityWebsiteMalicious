import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  private serverData: JSON;
  private ip: string;

  constructor(private httpClient: HttpClient) {
    this.ip = environment.backendIp;
  }

  sendDirToAnalise(body) {
    return this.httpClient.post<any>(this.ip + '/analise', body);
  }
}
