import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

/**
 * Validador personalizado que verifica si el usuario es mayor de 18 años.
 */
export function mayorDeEdadValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const fechaNacimiento = control.value;
    if (!fechaNacimiento) {
      return null; 
    }

    const fechaNac = new Date(fechaNacimiento);
    const fechaActual = new Date();
    const edad = fechaActual.getFullYear() - fechaNac.getFullYear();
    const mes = fechaActual.getMonth() - fechaNac.getMonth();
    const dia = fechaActual.getDate() - fechaNac.getDate();

    // Ajusta la edad si el cumpleaños aún no ha pasado este año
    const esMenorDeEdad = edad < 18 || (edad === 18 && (mes < 0 || (mes === 0 && dia < 0)));

    return esMenorDeEdad ? { menorEdad: true } : null;
  };
}