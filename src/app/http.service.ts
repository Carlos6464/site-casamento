import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Isso garante que o serviço seja singleton
})
export class HttpService {
  private apiUrl = 'https://casamento-api-qj7i.vercel.app/'; // URL base da API

  constructor(private http: HttpClient) {}

  // Método GET
  get<T>(endpoint: string): Observable<T> {
    const headers = new HttpHeaders({
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
    });
  
    const url = `${this.apiUrl}${endpoint}?timestamp=${new Date().getTime()}`;
    return this.http.get<T>(url, { headers });
  }

  getSearch<T>(endpoint: string): Observable<T> {
    const headers = new HttpHeaders({
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
    });
  
    const url = `${this.apiUrl}${endpoint}`;
    return this.http.get<T>(url, { headers });
  }

  // Método POST
  post<T>(endpoint: string, body: any): Observable<T> {
    const headers = new HttpHeaders({
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
    });
    return this.http.post<T>(`${this.apiUrl}${endpoint}`, body, { headers });
  }

  // Método PUT
  put<T>(endpoint: string, body: any): Observable<T> {
    const headers = new HttpHeaders({
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
    });
    return this.http.put<T>(`${this.apiUrl}${endpoint}`, body, { headers });
  }

  // Método PATCH
  patch<T>(endpoint: string, body: any): Observable<T> {
    const headers = new HttpHeaders({
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
    });
    return this.http.patch<T>(`${this.apiUrl}${endpoint}`, body, { headers });
  }

  // Método DELETE
  delete<T>(endpoint: string): Observable<T> {
    const headers = new HttpHeaders({
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
    });
    return this.http.delete<T>(`${this.apiUrl}${endpoint}`, { headers });
  }
}
