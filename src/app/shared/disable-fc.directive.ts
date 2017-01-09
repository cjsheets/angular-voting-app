import { Directive, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Directive({
    selector: '[formControl][disableCond]'
})
export class DisableFormControlDirective {
    @Input() formControl: FormControl;

    constructor() { }

    get disableCond(): boolean { // getter, not needed, but here only to completude
        return !!this.formControl && this.formControl.disabled;
    }

    @Input('disableCond') set disableCond(s: boolean) {
        if (!this.formControl) return;
        else if (s) this.formControl.disable();
        else this.formControl.enable();
    }
}

//<input type="text" [formControl]="textFC" [disableCond]="anotherElement.value < 10" />