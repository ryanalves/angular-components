import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TreeNodeShowcaseComponent } from './showcase/tree-node-showcase/tree-node-showcase.component';
import { IndeterminateCheckboxShowcaseComponent } from './showcase/indeterminate-checkbox-showcase/indeterminate-checkbox-showcase.component';
import { ComponentListComponent } from './component-list/component-list.component';

const routes: Routes = [
  {
    path: '',
    component: ComponentListComponent,
  },
  {
    path: 'treenode',
    component: TreeNodeShowcaseComponent,
  },
  {
    path: 'indeterminate-checkbox',
    component: IndeterminateCheckboxShowcaseComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
