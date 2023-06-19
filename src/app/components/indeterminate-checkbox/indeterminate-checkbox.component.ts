import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-indeterminate-checkbox',
  templateUrl: './indeterminate-checkbox.component.html',
  styleUrls: ['./indeterminate-checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IndeterminateCheckboxComponent),
      multi: true,
    },
  ],
})
export class IndeterminateCheckboxComponent implements ControlValueAccessor {
  state: 'unchecked' | 'indeterminate' | 'checked' = 'unchecked';

  onClick() {
    if (this.state === 'unchecked') {
      this.state = 'checked';
    } else {
      this.state = 'unchecked';
    }
    this.onChange(this.state === 'checked');
  }

  onChange: any;
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}

  setDisabledState(isDisabled: boolean): void {}

  writeValue(obj: any): void {
    if (obj === true) {
      this.state = 'checked';
    } else if (obj === false) {
      this.state = 'unchecked';
    } else {
      this.state = 'indeterminate';
    }
  }
}
