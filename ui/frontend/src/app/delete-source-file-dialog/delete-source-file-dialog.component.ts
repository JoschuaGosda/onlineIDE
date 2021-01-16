import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-delete-source-file-dialog',
  templateUrl: './delete-source-file-dialog.component.html',
  styleUrls: ['./delete-source-file-dialog.component.css']
})
export class DeleteSourceFileDialogComponent implements OnInit {
  public sourceFileToDeleteName: string;

  // dialogRef: allows this component to close the dialog
  constructor(
    private dialogRef: MatDialogRef<DeleteSourceFileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.sourceFileToDeleteName = data.sourceFileToDeleteName;
  }

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close(false); // file should not be deleted
  }

  onOk(): void {
    this.dialogRef.close(true); // file should be deleted
  }
}
