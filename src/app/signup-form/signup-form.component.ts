import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { FormGroup, FormControl, Validators } from '@angular/forms'
// import { FormBuilder } from '@angular/forms'
@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {
  contactForm;
  constructor(private router: Router,
    // private formBuilder: FormBuilder
    ) { }

  ngOnInit() {
    // this.contactForm = this.formBuilder.group({
    //   name: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(15), Validators.pattern("^[a-zA-Z]+$")]],
    //   email: ['', [Validators.required, Validators.email]],
    //   number: ['', [Validators.required]],
    //   address: this.formBuilder.group({
    //     state: ['', [Validators.required]],
    //     pincode: ['', [Validators.required]],
    //   })
    // });
  }

  // get name() {
  //   return this.contactForm.get('name');
  // }
 
  // get email() {
  //   return this.contactForm.get('email');
  // }
 
  // get number() {
  //   return this.contactForm.get('number');
  // }
 
  // get city() {
  //   return this.contactForm.get("address").get('city');
  // }
 
  // get street() {
  //   return this.contactForm.get("address").get('street');
  // }
 
  // get pincode() {
  //   return this.contactForm.get("address").get('pincode');
  // }

  login() {
    this.router.navigate(['/login']);
  }

}
