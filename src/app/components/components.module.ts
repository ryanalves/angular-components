import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeNodeModule } from './tree-node/tree-node.module';
import { IndeterminateCheckboxComponent } from './indeterminate-checkbox/indeterminate-checkbox.component';
import { IndeterminateCheckboxModule } from './indeterminate-checkbox/indeterminate-checkbox.module';

@NgModule({
  imports: [CommonModule, TreeNodeModule, IndeterminateCheckboxModule],
  exports: [TreeNodeModule, IndeterminateCheckboxModule],
})
export class ComponentsModule {}
