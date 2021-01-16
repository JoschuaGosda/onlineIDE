import {Component, OnInit} from '@angular/core';
import {Project} from "../project";
import {HttpService} from "../service/http.service";
import {NewProjectDialogComponent} from "../new-project-dialog/new-project-dialog.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DeleteProjectDialogComponent} from "../delete-project-dialog/delete-project-dialog.component";
import {Router} from "@angular/router";
import {RenameDialogComponent} from "../rename-dialog/rename-dialog.component";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  public projects: Project[];

  constructor(private httpService: HttpService, private dialog: MatDialog,
              private router: Router) {
    this.httpService.getAllProjects().subscribe(
      response => {
        this.projects = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {}

  public createNewProjectViaDialog(): void {
    let newProjectName = '';
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; // disable closing by clicking next to dialog
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(NewProjectDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      response => {
        // executed as soon as dialog is closed via any button
        newProjectName = response;
        if (newProjectName && newProjectName.length > 0) {
          this.createProject(newProjectName);
        }
      });
  }

  public deleteProjectViaDialog(projectToDelete: Project): void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; // disable closing by clicking next to dialog
    dialogConfig.autoFocus = true;
    // pass data to the dialog component
    dialogConfig.data = {
      projectToDeleteName: projectToDelete.name
    };

    const dialogRef = this.dialog.open(DeleteProjectDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (response: boolean) => { // response === true if project should be deleted
        if (response) {
          this.deleteProject(projectToDelete.id);
        }
      }
    );
  }

  public renameProjectViaDialog(projectToRename: Project): void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; // disable closing by clicking next to dialog
    dialogConfig.autoFocus = true;
    // pass data to the dialog component
    dialogConfig.data = {
      oldName: projectToRename.name
    };

    const dialogRef = this.dialog.open(RenameDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (response: string) => {
        if (response && response.length > 0) { // string not empty -> should be renamed
          this.renameProject(projectToRename, response);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  public navigateToSourceFileList(project: Project): void {
    // state can be accessed by the SourceFileListComponent
    this.router.navigateByUrl('/files', {state: { project: project} });
  }

  private createProject(newProjectName: string): void {
    this.httpService.createProject(newProjectName).subscribe(
      response => {
        this.projects.push(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  private deleteProject(deleteProjectId: string): void {
    this.httpService.deleteProject(deleteProjectId).subscribe();
    let indexToRemove = this.projects.indexOf(this.projects.find(p => p.id === deleteProjectId));
    this.projects.splice(indexToRemove, 1);
  }

  private renameProject(projectToRename: Project, newProjectName: string): void {
    this.httpService.updateProjectName(projectToRename.id, newProjectName).subscribe(
      response => {
        if (response.name && response.id) {
          let indexToRename = this.projects.indexOf(this.projects.find(p => p.id === projectToRename.id));
          this.projects[indexToRename].name = response.name;
          this.projects[indexToRename].id = response.id;
        }
      },
      error => {
        console.log(error);
      }
    )
  }
}
