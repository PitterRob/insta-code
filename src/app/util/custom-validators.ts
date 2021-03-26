import { AbstractControl } from "@angular/forms";


export class CustomValidators {
  static passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('senha').value !== c.get('confirmarSenha').value) {
      return { invalid: true };
    }
  }
}
