export interface Cliente {
  nombres: string;
  apellidos: string;
  tipoDocumento: 'DNI' | 'CE'; // O un string genérico si hay más tipos
  numeroDocumento: string;
  fechaNacimiento: string; // ISO Date string (YYYY-MM-DD)
  bono: '10' | '20'; // O number
  token: string;
}