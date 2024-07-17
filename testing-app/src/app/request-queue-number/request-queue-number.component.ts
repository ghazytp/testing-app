import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  queueNumber: string;
  date: string;
}

@Component({
  selector: 'app-request-queue-number',
  templateUrl: './request-queue-number.component.html',
  styleUrls: ['./request-queue-number.component.css'],
})
export class RequestQueueNumberComponent implements OnInit {
  barcodeImage =
    'https://bwipjs-api.metafloor.com/?bcid=code128&scaleX=3&scaleY=1&text=';

  constructor(
    public dialogRef: MatDialogRef<RequestQueueNumberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.barcodeImage = this.barcodeImage + this.data.queueNumber;
  }
}
