import { QrCode } from './../interface/qr-code';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl: string = 'http://localhost:3000/codes-alphaaio/';

  constructor(private http: HttpClient) {}

  public getAll(): Observable<QrCode> {
    return this.http.get<QrCode>(this.apiUrl).pipe(
      (res) => res,
      (error) => error
    );
  }

  postQr(value: string): Observable<QrCode> {
    return this.http.post<QrCode>(this.apiUrl, { url: value }).pipe(
      (res) => res,
      (error) => error
    );
  }
}
