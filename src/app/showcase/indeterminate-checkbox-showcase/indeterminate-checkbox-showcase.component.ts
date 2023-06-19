import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-indeterminate-checkbox-showcase',
  templateUrl: './indeterminate-checkbox-showcase.component.html',
  styleUrls: ['./indeterminate-checkbox-showcase.component.scss'],
})
export class IndeterminateCheckboxShowcaseComponent implements OnInit {
  formGroup = new FormGroup({
    parent: new FormControl<boolean | null>(null),
    child1: new FormControl<boolean | null>(true),
    child2: new FormControl<boolean | null>(false),
  });

  ngOnInit(): void {
    let parent = this.formGroup.get('parent') as FormControl;
    let child1 = this.formGroup.get('child1') as FormControl;
    let child2 = this.formGroup.get('child2') as FormControl;

    parent.valueChanges.subscribe((parent) => {
      child1.setValue(parent, {emitEvent: false});
      child2.setValue(parent, {emitEvent: false});
    });
    combineLatest([child1.valueChanges, child2.valueChanges]).subscribe(
      ([child1, child2]) => {
        if (child1 && child2) {
          this.formGroup.get('parent')?.setValue(true, {emitEvent: false});
        } else if (!child1 && !child2) {
          this.formGroup.get('parent')?.setValue(false, {emitEvent: false});
        } else {
          this.formGroup.get('parent')?.setValue(null, {emitEvent: false});
        }
      }
    );
  }
}
