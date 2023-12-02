import { StudentService } from 'src/app/services/student.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Departement } from 'src/app/entities/departement';
import { DepartementService } from 'src/app/services/departement.service';
import Swal from 'sweetalert2';
import { Student } from 'src/app/entities/student';

@Component({
  selector: 'app-form-edit-student',
  templateUrl: './form-edit-student.component.html',
  styleUrls: ['./form-edit-student.component.css']
})
export class FormEditStudentComponent implements OnInit {

  constructor(private fb: FormBuilder,private studentService:StudentService,private departementService: DepartementService, private router: Router,private httpClient:HttpClient,private route: ActivatedRoute) {}
  editForm = this.fb.group({
    id: [''],
    firstName: [''],
    lastName: [''],
    email: [''],
    age: 0,
    departement: undefined,
  });
  departements?: Departement[];

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.studentService.getStudentById(id).subscribe((student) => {
        console.log(student);
        this.editForm.patchValue(student);
      });
      console.log(id);
    }); 
    this.getAllDepartement();
  }
  getAllDepartement(): void {
    this.departementService.getAllDepartement().subscribe(
      (departements) => {
        this.departements = departements;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  onSubmit() {
    console.log(this.editForm.value);
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }
    let student = new Student();
    let departement = new Departement();
    
     this.route.params.subscribe(params => {
      student.id = params['id'];
      console.log(student.id);
    }); 
    student.firstName = this.editForm.value.firstName !;
    student.lastName = this.editForm.value.lastName !;
    student.email = this.editForm.value.email !;
    student.age = +this.editForm.value.age!;
    const departementId = this.editForm.value.departement!;   
    const selectedDepartement = this.departements?.find(departement => departement.id == departementId);
    student.departement = selectedDepartement!;
   
  
    this.studentService.edit(student).subscribe((response) => {
      console.log(response);
      if(response.id!=null){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Student updated successfully',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/gestion-student']);
      }
    });
    

  }
  
  
  get code() {
    return this.editForm.get('code');
  }
  get name() {
    return this.editForm.get('name');
  }

}
