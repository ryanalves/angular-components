import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeNodeShowcaseComponent } from './tree-node-showcase/tree-node-showcase.component';
import { ComponentsModule } from '../components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IndeterminateCheckboxShowcaseComponent } from './indeterminate-checkbox-showcase/indeterminate-checkbox-showcase.component';

@NgModule({
  declarations: [TreeNodeShowcaseComponent, IndeterminateCheckboxShowcaseComponent],
  imports: [CommonModule, ComponentsModule, ReactiveFormsModule],
})
export class ShowcaseModule {}
