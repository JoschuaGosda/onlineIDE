import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-new-source-file-dialog',
  templateUrl: './new-source-file-dialog.component.html',
  styleUrls: ['./new-source-file-dialog.component.css']
})
export class NewSourceFileDialogComponent implements OnInit {
  public newSourceFileName: string;

  // dialogRef: allows this component to close the dialog
  constructor(private dialogRef: MatDialogRef<NewSourceFileDialogComponent>) {}

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onOk(): void {
    this.dialogRef.close(this.newSourceFileName);
  }
}
