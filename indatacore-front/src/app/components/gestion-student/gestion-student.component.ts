import { Student } from './../../entities/student';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Departement } from 'src/app/entities/departement';
import { DepartementService } from 'src/app/services/departement.service';
import { StudentService } from 'src/app/services/student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-student',
  templateUrl: './gestion-student.component.html',
  styleUrls: ['./gestion-student.component.css']
})
export class GestionStudentComponent implements OnInit {

  departements?: Departement[];
  students?: Student[];
  showEditForm: boolean = false;
  selectedId?: string;
  constructor(private fb: FormBuilder,private departementService: DepartementService, private studentService: StudentService,private router: Router,private httpClient:HttpClient) {}
  editForm = this.fb.group({
    id: [''],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    age: ['', Validators.required],
    departement: ['', Validators.required],
  });
  ngOnInit(): void {
    this.getAllDepartement();
    this.getAllStudent();
  }
  getAllStudent(): void{
    this.studentService.getAllStudent().subscribe(
      (students) => {
        this.students = students;
        console.log(this.students);
        setTimeout(() => {
          $('#datatableexample').DataTable({
            pagingType: 'full_numbers',
            pageLength: 5,
            processing: true,
            lengthMenu: [5, 10, 25],
          });
        }, 1);
      },
      (error) => {
        console.error(error);
      }
    );
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
  
  onDelete(id: string) {
    this.studentService.deleteStudent(id).subscribe((response) => {
      console.log(response);
      if(response!=null){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Student deleted successfully',
          showConfirmButton: false,
          timer: 1500
        })
      }
      
      this.getAllStudent();
      window.location.reload();
    });
  }
  onEdit(id: string) {
    this.studentService.deleteStudent(id).subscribe((response) => {
      console.log(response);
      this.getAllStudent();
      window.location.reload();
    });
  }
  
  onSubmit() {
    //console.log(this.editForm.value);
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }
  
    const firstName = this.editForm.value.firstName!;
    const lastName = this.editForm.value.lastName!;
    const email = this.editForm.value.email!;
    const age = +this.editForm.value.age!
    const departementId = this.editForm.value.departement!;   
    const selectedDepartement = this.departements?.find(departement => departement.id == departementId);

  if (!selectedDepartement) {
    console.error(`Department with ID ${departementId} not found.`);
    return;
  }
    console.log(departementId); 
    let student = new Student();
    student.firstName = firstName;
    student.lastName = lastName;
    student.email = email;
    student.age = age;
    student.departement = selectedDepartement;

  
            this.studentService.add(student).pipe(
              
              catchError((error: HttpErrorResponse) => {
                console.error('HTTP Error:', error.status, error.statusText);
                if (error.status === 500) {
                  Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Internal server error',
                    showConfirmButton: false,
                    timer: 1500
                  });
                  window.location.reload();
                }
               
                if(error.status === 404){
                  Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Not found',
                    showConfirmButton: false,
                    timer: 1500
                  });
                  window.location.reload();
                }
               
                
                console.log(error);
                return throwError('Something went wrong. Please try again later.');
              })
            )
            .subscribe((response) => {
              console.log(response);
              this.getAllDepartement();
             
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Student added successfully',
                  showConfirmButton: false,
                  timer: 1500
                });
              
              window.location.reload();
            });


}

toggleEditForm() {
  this.showEditForm = true;
}
}

