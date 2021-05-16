import { WorkflowEditorComponent } from './workflow-editor/workflow-editor.component';
import { WorkflowListComponent } from './workflow-list/workflow-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkflowComponent } from './workflow.component';

const routes: Routes = [
  { path: '', component: WorkflowComponent },
  { path: 'list', component: WorkflowListComponent },
  { path: 'edit', component: WorkflowEditorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkflowRoutingModule { }
