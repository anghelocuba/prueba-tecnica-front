import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SecurityService } from '../../sdk/seguridad.service'; 
import { ClienteService } from '../../sdk/cliente.service'; 
import { Cliente } from '../../models/cliente.model'; 
import { mayorDeEdadValidator } from '../../utils/edad.validar'; 
import { ToastrService } from 'ngx-toastr'; 
@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegisterComponent implements OnInit { 
  form: FormGroup;
  isLoadingToken = true;

  constructor(
    private fb: FormBuilder,
    private securityService: SecurityService, 
    private clienteService: ClienteService,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      
      tipoDocumento: ['', Validators.required], 
      numeroDocumento: ['', [Validators.required, Validators.pattern(/^\d+$/)]], 
      fechaNacimiento: ['', [Validators.required, mayorDeEdadValidator()]],
      
      email: ['', [Validators.required, Validators.email]],
      bono: ['', Validators.required], 
      token: ['', Validators.required],
    });
  }

  // Se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.getToken();
  }

  getToken(): void {
    this.isLoadingToken = true;
    this.securityService.getToken().subscribe({
      next: (response) => {
        console.log("response")
                console.log(response)

        this.form.get('token')?.setValue(response.token);
        this.isLoadingToken = false;
      },
      error: (err) => {
        console.error('Error al obtener el token:', err);
        this.form.get('token')?.setValue('ERROR_TOKEN'); 
        this.isLoadingToken = false;
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const clienteData: Cliente = this.form.value as Cliente;

    this.clienteService.registrarCliente(clienteData).subscribe({
      next: (response) => {
        console.log('Registro exitoso:', response);
        //alert('Cliente registrado con éxito!');
        this.toastr.success('Registro completado');
        this.form.reset(); 
      },
      error: (err) => {
        console.error('Error al registrar cliente:', err);
        //alert('Ocurrió un error durante el registro.');
         this.toastr.error('Error al registrar cliente:');

      }
    });
  }
  
}