import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://0.0.0.0:3000/api/clientes'; 

  constructor(private http: HttpClient) {}

  /**
   * Registra un nuevo cliente.
   * @param cliente
   */
  registrarCliente(cliente: Cliente): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, cliente);
  }
}