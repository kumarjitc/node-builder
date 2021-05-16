import { WorkflowStatusComponent } from './workflow-status/workflow-status.component';
import { ExecutionStatusComponent } from './execution-status/execution-status.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'execution/status', component: ExecutionStatusComponent },
  { path: 'workflow/status', component: WorkflowStatusComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuildRoutingModule { }
