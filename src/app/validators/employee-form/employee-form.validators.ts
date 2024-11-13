import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function naturalNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    
    const isNaturalNumber = Number.isInteger(value) && value > 0;
    
    return isNaturalNumber ? null : { notNaturalNumber: true };
  };
}
