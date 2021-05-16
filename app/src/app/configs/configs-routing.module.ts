import { ConfigsEditorComponent } from './configs-editor/configs-editor.component';
import { ConfigsListComponent } from './configs-list/configs-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'list', component: ConfigsListComponent },
  { path: 'edit', component: ConfigsEditorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigsRoutingModule { }
