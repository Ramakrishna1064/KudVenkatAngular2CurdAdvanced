import { Validator, NG_VALIDATORS, AbstractControl } from "@angular/forms";
import { Directive } from "@angular/core";

@Directive({
  selector: '[appConfirmGroupEqualValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ConfirmGroupEqualValidatorDirective,
    multi: true
  }]
})

/**
 * ConfirmEqualValidatorDirective
 */
export class ConfirmGroupEqualValidatorDirective implements Validator {
  validate(passwordGroup: AbstractControl): { [key: string]: any } | null {
    const password = passwordGroup.get("password");
    const confirmPassword = passwordGroup.get("confirmPassword");
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'notEqual': true }
    }
    return null;
  }
}
