import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigsRoutingModule } from './configs-routing.module';
import { ConfigsListComponent } from './configs-list/configs-list.component';
import { ConfigsEditorComponent } from './configs-editor/configs-editor.component';


@NgModule({
  declarations: [
    ConfigsListComponent,
    ConfigsEditorComponent
  ],
  imports: [
    CommonModule,
    ConfigsRoutingModule,
    SharedModule
  ]
})
export class ConfigsModule { }
