import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://127.0.0.1:3002/api/clientes'; 

  constructor(private http: HttpClient) {}

  /**
   * Registra un nuevo cliente.
   * @param cliente
   */
  registrarCliente(cliente: Cliente): Observable<any> {
    console.log("cliente")
    console.log(cliente)

    return this.http.post(`${this.apiUrl}/registrar`, cliente);
  }
}