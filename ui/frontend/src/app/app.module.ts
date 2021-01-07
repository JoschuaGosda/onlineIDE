import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ProjectListComponent} from './project-list/project-list.component';
import {FormsModule} from "@angular/forms";
import {Route, RouterModule} from "@angular/router";
import {EditorComponent} from './editor/editor.component';
import {MonacoEditorModule} from "ngx-monaco-editor";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

const routes: Route[] = [
  {path: 'projects', component: ProjectListComponent},
  {path: 'editor', component: EditorComponent},
  {path: '**', redirectTo: '/'}
]

@NgModule({
  declarations: [
    AppComponent,
    ProjectListComponent,
    EditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    MonacoEditorModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
