import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuildRoutingModule } from './build-routing.module';
import { ExecutionStatusComponent } from './execution-status/execution-status.component';
import { WorkflowStatusComponent } from './workflow-status/workflow-status.component';


@NgModule({
  declarations: [ExecutionStatusComponent, WorkflowStatusComponent],
  imports: [
    CommonModule,
    BuildRoutingModule,
    SharedModule
  ]
})
export class BuildModule { }
