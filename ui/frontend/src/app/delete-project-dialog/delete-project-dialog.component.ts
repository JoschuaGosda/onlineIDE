import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-delete-project-dialog',
  templateUrl: './delete-project-dialog.component.html',
  styleUrls: ['./delete-project-dialog.component.css']
})
export class DeleteProjectDialogComponent implements OnInit {
  public projectToDeleteName: string;

  // dialogRef: allows this component to close the dialog
  constructor(
    private dialogRef: MatDialogRef<DeleteProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.projectToDeleteName = data.projectToDeleteName;
  }

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close(false); // project should not be deleted
  }

  onOk(): void {
    this.dialogRef.close(true); // project should be deleted
  }
}
