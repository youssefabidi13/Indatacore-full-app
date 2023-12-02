import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formRegister!: FormGroup;

  constructor(private formBuilder: FormBuilder,private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.formRegister = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      roles: ['USER'] // assuming you want to set a default role during registration
    });
  }

  handleRegistration(): void {
    // Handle registration logic here
    if (this.formRegister.valid) {
      const registrationData = this.formRegister.value;
      console.log('Registration data:', registrationData);
      this.authService.register(registrationData).subscribe(
        {
            next:(data: any) => {
              console.log("success "+data);
              this.router.navigateByUrl("/login"); 
            },
            error:(err: any) => {console.log(err)},
            })
      }
      
    }
  }

