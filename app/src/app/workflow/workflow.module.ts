import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { WorkflowRoutingModule } from './workflow-routing.module';
import { WorkflowComponent } from './workflow.component';
import { WorkflowListComponent } from './workflow-list/workflow-list.component';
import { WorkflowEditorComponent } from './workflow-editor/workflow-editor.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: '', component: WorkflowComponent }
];

@NgModule({
  declarations: [
    WorkflowComponent,
    WorkflowListComponent,
    WorkflowEditorComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    WorkflowRoutingModule
  ]
})
export class WorkflowModule { }
