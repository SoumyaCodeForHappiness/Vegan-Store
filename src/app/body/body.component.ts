import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  routeProductList(category) {
    this.router.navigate(['/productList'], { queryParams: { category: category, value: true } });
  }

}
