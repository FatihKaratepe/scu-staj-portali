import { AbstractControl } from "@angular/forms";

export function ControlValid(control: AbstractControl) {
    if (control.touched || control.dirty) {
        if (control.invalid) {
            return 'is-invalid'
        } else {
            return ''
        }
    } else {
        return ''
    }
}