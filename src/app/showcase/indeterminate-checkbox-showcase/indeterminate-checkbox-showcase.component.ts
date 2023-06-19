import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

const childrenNumber = 5;

@Component({
  selector: 'app-indeterminate-checkbox-showcase',
  templateUrl: './indeterminate-checkbox-showcase.component.html',
  styleUrls: ['./indeterminate-checkbox-showcase.component.scss'],
})
export class IndeterminateCheckboxShowcaseComponent implements OnInit {
  formGroup = new FormGroup({
    parent: new FormControl<boolean | null>(false),
    children: new FormArray(
      Array(childrenNumber)
        .fill(null)
        .map(() => new FormControl<boolean | null>(false))
    ),
  });

  ngOnInit(): void {
    let parent = this.formGroup.get('parent') as FormControl;
    let children = this.formGroup.get('children') as FormArray;

    parent.valueChanges.subscribe((parent) => {
      for (let i = 0; i < children.length; i++) {
        children.get(`${i}`)?.setValue(parent, { emitEvent: false });
      }
    });
    
    children.valueChanges.subscribe((children) => {
      let value: any;
      children.forEach((child: any) => {
        if (value === undefined) value = child;
        if (child !== value) {
          value = null;
        }
      });
      this.formGroup.get('parent')?.setValue(value, { emitEvent: false });
    });
  }

  get children() {
    let children = this.formGroup.get('children') as FormArray;
    return Array(children.length).fill(null);
  }
}
