import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AwsService {
  awsIp: string;
  private ip: string;

  constructor(private http: HttpClient) {
    this.ip = environment.awsIp;
  }

  downloadImagesFromSite(body) {
    console.log('send form');
    console.log(body);
    return this.http.post<any>(this.ip + '/sec', body);
  }

  block(url) {
    console.log(url)
    console.log(url)
    const formData = new FormData();
    formData.append('url', url);
    formData.append('block', 'block');
    return this.http.post<any>(this.ip + '/sec/block', formData);
  }

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
        //'Access-Control-Allow-Origin': '*'
      })
    };
  }
}
