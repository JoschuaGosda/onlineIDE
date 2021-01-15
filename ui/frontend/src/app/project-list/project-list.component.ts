import {Component, OnInit} from '@angular/core';
import {Project} from "../project";
import {HttpService} from "../service/http.service";
import {NewProjectDialogComponent} from "../new-project-dialog/new-project-dialog.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  public projects: Project[];

  constructor(private httpService: HttpService, private dialog: MatDialog) {
    this.httpService.getAllProjects().subscribe(
      response =>  { this.projects = response; },
      error => { console.log(error); }
    )
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

  public deleteProject(deleteProjectId): void {
    this.httpService.deleteProject(deleteProjectId).subscribe();
    let indexToRemove = this.projects.indexOf(this.projects.find(p => p.id === deleteProjectId));
    this.projects.splice(indexToRemove, 1);
  }

  private createProject(newProjectName: string): void {
    this.httpService.createProject(newProjectName).subscribe(
      response => { this.projects.push(response); },
      error => { console.log(error); }
    )
  }
}
