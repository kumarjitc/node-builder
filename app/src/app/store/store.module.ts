import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { StoreRoutingModule } from './store-routing.module';
import { StoreComponent } from './store.component';
import { SharedModule } from '../shared/shared.module';
import { StoreEditorComponent } from './store-editor/store-editor.component';

const routes: Routes = [
  { path: '', component: StoreComponent }
];

@NgModule({
  declarations: [StoreComponent,
    StoreEditorComponent
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class StoreModule { }
