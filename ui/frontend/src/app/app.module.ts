import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from "@angular/forms";
import {Route, RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";

import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatLineModule} from "@angular/material/core";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

import {AppComponent} from './app.component';
import {ProjectListComponent} from './project-list/project-list.component';
import {NewProjectDialogComponent} from './new-project-dialog/new-project-dialog.component';
import {MonacoEditorModule} from "ngx-monaco-editor";
import {EditorComponent} from './editor/editor.component';
import { SourceFileListComponent } from './source-file-list/source-file-list.component';
import { DeleteProjectDialogComponent } from './delete-project-dialog/delete-project-dialog.component';
import { NewSourceFileDialogComponent } from './new-source-file-dialog/new-source-file-dialog.component';
import { DeleteSourceFileDialogComponent } from './delete-source-file-dialog/delete-source-file-dialog.component';
import { RenameDialogComponent } from './rename-dialog/rename-dialog.component';

const routes: Route[] = [
  {path: 'projects', component: ProjectListComponent},
  {path: 'files', component: SourceFileListComponent},
  {path: '**', redirectTo: '/projects'}
]

@NgModule({
  declarations: [
    AppComponent,
    ProjectListComponent,
    EditorComponent,
    NewProjectDialogComponent,
    SourceFileListComponent,
    DeleteProjectDialogComponent,
    NewSourceFileDialogComponent,
    DeleteSourceFileDialogComponent,
    RenameDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(routes),
    MonacoEditorModule.forRoot(),
    HttpClientModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatLineModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
