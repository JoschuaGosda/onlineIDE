import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-new-project-dialog',
  templateUrl: './new-project-dialog.component.html',
  styleUrls: ['./new-project-dialog.component.css']
})
export class NewProjectDialogComponent implements OnInit {
  public newProjectName: string;

  // dialogRef: allows this component to close the dialog
  constructor(private dialogRef: MatDialogRef<NewProjectDialogComponent>) {}

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onOk(): void {
    this.dialogRef.close(this.newProjectName);
  }
}
