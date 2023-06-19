import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeNodeComponent } from './tree-node.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IndeterminateCheckboxModule } from '../indeterminate-checkbox/indeterminate-checkbox.module';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, IndeterminateCheckboxModule],
  declarations: [TreeNodeComponent],
  exports: [TreeNodeComponent],
})
export class TreeNodeModule {}
