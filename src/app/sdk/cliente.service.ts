import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = `${environment.apiUrlClientes}/clientes`;

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