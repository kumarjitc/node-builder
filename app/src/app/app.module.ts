import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { WebsocketService } from './shared/services/websocket.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forRoot([
      { path: 'configs', loadChildren: './configs/configs.module#ConfigsModule' },
      { path: 'build', loadChildren: './build/build.module#BuildModule' },
      { path: 'store', loadChildren: () => import('./store/store.module').then(m => m.StoreModule) },
      { path: 'workflow', loadChildren: () => import('./workflow/workflow.module').then(m => m.WorkflowModule) },
      { path: 'workflow', loadChildren: () => import('./workflow/workflow.module').then(m => m.WorkflowModule) }
    ])
  ],
  providers: [
    WebsocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
