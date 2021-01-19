import {Component, Input, OnInit} from '@angular/core';
import {HttpService} from "../service/http.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {SourceFile} from "../sourceFile";
import {Project} from "../project";
import {NewDialogComponent} from "../new-dialog/new-dialog.component";
import {DeleteDialogComponent} from "../delete-dialog/delete-dialog.component";
import {Router} from "@angular/router";
import {RenameDialogComponent} from "../rename-dialog/rename-dialog.component";

@Component({
  selector: 'app-source-file-list',
  templateUrl: './source-file-list.component.html',
  styleUrls: ['./source-file-list.component.css']
})
export class SourceFileListComponent implements OnInit {

  public project: Project;
  public sourceFiles: SourceFile[];

  constructor(private httpService: HttpService, private dialog: MatDialog,
              private router: Router) {

    // passed by ProjectListComponent via router.navigateByUrl
    this.project = this.router.getCurrentNavigation().extras.state.project;

    this.httpService.getAllSourceFilesOfProject(this.project.id).subscribe(
      response => {
        this.sourceFiles = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {}

  public createNewSourceFileViaDialog(): void {
    let newSourceFileName = '';
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; // disable closing by clicking next to dialog
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      typeName: 'File',
    };

    const dialogRef = this.dialog.open(NewDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      response => {
        // executed as soon as dialog is closed via any button
        newSourceFileName = response;
        if (newSourceFileName && newSourceFileName.length > 0) {
          this.createSourceFile(newSourceFileName);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  public deleteSourceFileViaDialog(sourceFileToDelete: SourceFile): void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; // disable closing by clicking next to dialog
    dialogConfig.autoFocus = true;
    // pass data to the dialog component
    dialogConfig.data = {
      typeName: 'File',
      itemToDeleteName: sourceFileToDelete.name
    };

    const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (response: boolean) => { // response === true if file should be deleted
        if (response) {
          this.deleteSourceFile(sourceFileToDelete.id);
        }
      }
    );
  }

  public renameSourceFileViaDialog(sourceFileToRename: SourceFile): void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; // disable closing by clicking next to dialog
    dialogConfig.autoFocus = true;
    // pass data to the dialog component
    dialogConfig.data = {
      oldName: sourceFileToRename.name
    };

    const dialogRef = this.dialog.open(RenameDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (response: string) => {
        if (response && response.length > 0) {// string not empty -> should be renamed
          this.renameSourceFile(sourceFileToRename, response);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  public navigateToEditor(sourceFile: SourceFile): void {
    // state can be accessed by the editor
    this.router.navigateByUrl('/editor', {state: { sourceFile: sourceFile }});
  }

  private createSourceFile(newSourceFileName: string): void {
    this.httpService.createSourceFile(newSourceFileName, this.project).subscribe(
      response => {
        this.sourceFiles.push(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  private deleteSourceFile(deleteSourceFileId): void {
    this.httpService.deleteSourceFile(deleteSourceFileId).subscribe();
    let indexToRemove = this.sourceFiles.indexOf(this.sourceFiles.find(f => f.id === deleteSourceFileId));
    this.sourceFiles.splice(indexToRemove, 1);
  }

  private renameSourceFile(sourceFileToRename: SourceFile, newSourceFileName: string): void {
    this.httpService.updateSourceFileName(sourceFileToRename.id, newSourceFileName).subscribe(
      response => {
        if (response.name && response.id) {
          let indexToRename = this.sourceFiles.indexOf(this.sourceFiles.find(f => f.id === sourceFileToRename.id));
          this.sourceFiles[indexToRename].name = response.name;
          this.sourceFiles[indexToRename].id = response.id;
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
