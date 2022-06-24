import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SuccessMessageComponent } from '../success-message/success-message.component';
@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss']
})
export class ShippingFormComponent implements OnInit {

  constructor(private router: Router,
    public dialog: MatDialog,) { }

  ngOnInit() {
  }
  confirmOrder() {
    // this.router.navigate(['/success']);
    const dialogRef = this.dialog.open(SuccessMessageComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
