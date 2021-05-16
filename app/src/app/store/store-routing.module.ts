import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreComponent } from './store.component';
import { StoreEditorComponent } from './store-editor/store-editor.component';

const routes: Routes = [
  { path: '', component: StoreComponent },
  { path: 'edit', component: StoreEditorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
