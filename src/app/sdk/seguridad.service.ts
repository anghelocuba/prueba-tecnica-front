import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
private apiUrl = `${environment.apiUrlSeguridad}/seguridad`;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene un token de seguridad de 8 dígitos al cargar el formulario.
   * @returns 
   */
  getToken(): Observable<{ 
    token: string 
  }> {
    return this.http.get<{ 
      token: string 
    }>(`${this.apiUrl}/generar-token`); 
  }
}