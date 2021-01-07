import {Component, OnInit} from '@angular/core';
import {Project} from "../project";
import {HttpService} from "../service/http.service";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  public projects: Project[];
  public newProjectName: string;
  public deleteProjectId: string;

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.httpService.getAllProjects().subscribe
    (
      (response) =>  { this.projects = response; },
      (error) => { console.log(error); }
    )
  }

  createProject(): void {
    this.httpService.createProject(this.newProjectName).subscribe
    (
      (response) => { this.projects.push(response); },
      (error) => { console.log(error); }
    )
    this.newProjectName = '';
  }

  deleteProject(): void {
    this.httpService.deleteProject(this.deleteProjectId).subscribe();
    this.deleteProjectId = '';
  }

}
