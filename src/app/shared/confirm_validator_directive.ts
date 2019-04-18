import { Validator, NG_VALIDATORS, AbstractControl } from "@angular/forms";
import { Directive, Input } from "@angular/core";

@Directive({
  selector: '[appConfirmEqualValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ConfirmEqualValidatorDirective,
    multi: true
  }]
})

/**
 * ConfirmEqualValidatorDirective
 */
export class ConfirmEqualValidatorDirective implements Validator {
  @Input() appConfirmEqualValidator: string
  validate(control: AbstractControl): { [key: string]: any } | null {
    const controlToCompare = control.parent.get(this.appConfirmEqualValidator);
    console.log('Ramakrishna--->' + controlToCompare.value + '-->' + control.value)
    if (controlToCompare && controlToCompare.value !== control.value) {
      return { 'notEqual': true }
    }
    return null;
  }
}
