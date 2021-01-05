import { Component, OnInit } from '@angular/core';
import {Project} from "../project";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [
    {id: 1, name: 'Great Project'},
    {id: 2, name: 'Great Project 2'}
  ];
  newProjectName: string;

  constructor() { }

  ngOnInit(): void {
  }

  createProject(): void {
    const project = new Project();
    project.name = this.newProjectName;
    project.id = this.projects[this.projects.length - 1].id + 1;
    this.projects.push(project);
    this.newProjectName = '';
  }
}
