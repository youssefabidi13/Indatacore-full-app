import { FormBuilder, Validators } from '@angular/forms';
import { Departement } from './../../entities/departement';
import { Component, OnInit } from '@angular/core';
import { DepartementService } from 'src/app/services/departement.service';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-gestion-departement',
  templateUrl: './gestion-departement.component.html',
  styleUrls: ['./gestion-departement.component.css']
})
export class GestionDepartementComponent implements OnInit {

  departements?: Departement[];
  showEditForm: boolean = false;
  selectedId?: string;
  constructor(private fb: FormBuilder,private departementService: DepartementService, private router: Router,private httpClient:HttpClient) {}
  editForm = this.fb.group({
    id: [''],
    code: ['', Validators.required],
    name: ['', Validators.required],
  });
  ngOnInit(): void {
    this.getAllDepartement();
  }
 
  getAllDepartement(): void {
    this.departementService.getAllDepartement().subscribe(
      (departements) => {
        this.departements = departements;
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
  
  onDelete(id: string) {
    this.departementService.deleteDepartement(id).subscribe((response) => {
      console.log(response);
      if(response!=null){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Departement deleted successfully',
          showConfirmButton: false,
          timer: 1500
        })
      }
      
      this.getAllDepartement();
      window.location.reload();
    });
  }
  onEdit(id: string) {
    this.departementService.deleteDepartement(id).subscribe((response) => {
      console.log(response);
      this.getAllDepartement();
      window.location.reload();
    });
  }
  
  onSubmit() {
    console.log(this.editForm.value);
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }
  
    const code = this.editForm.value.code!;
    const name = this.editForm.value.name!;
  
    let departement = new Departement();
            departement.code = code;
            departement.name = name;
            
            
  
            this.departementService.add(departement).pipe(
              
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
                  title: 'Departement added successfully',
                  showConfirmButton: false,
                  timer: 1500
                });
              
              window.location.reload();
            });


}
get code() {
  return this.editForm.get('code');
}
get name() {
  return this.editForm.get('name');
}
toggleEditForm() {
  this.showEditForm = true;
}
}

