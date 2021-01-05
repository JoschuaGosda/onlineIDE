import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProjectListComponent } from './project-list/project-list.component';
import {FormsModule} from "@angular/forms";
import {Route, RouterModule} from "@angular/router";
import { EditorComponent } from './editor/editor.component';
import {MonacoEditorModule} from "ngx-monaco-editor";

const routes: Route[] = [
  {path: 'projects', component: ProjectListComponent},
  {path: 'editor', component: EditorComponent},
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
    MonacoEditorModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
