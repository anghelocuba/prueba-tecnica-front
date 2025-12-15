import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  private apiUrl = 'http://0.0.0.0:3000/api/security'; // Reemplaza con la URL de tu microservicio Hapi

  constructor(private http: HttpClient) {}

  /**
   * Obtiene un token de seguridad de 8 dígitos al cargar el formulario.
   * @returns 
   */
  getToken(): Observable<{ token: string }> {
    return this.http.get<{ token: string }>(`${this.apiUrl}/generate-token`); 
  }
}