import { HttpClient } from '@angular/common/http';
import { Departement } from './../../entities/departement';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartementService } from 'src/app/services/departement.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-edit',
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.css']
})
export class FormEditComponent implements OnInit {

  constructor(private fb: FormBuilder,private departementService: DepartementService, private router: Router,private httpClient:HttpClient,private route: ActivatedRoute) {}
  editForm = this.fb.group({
    id: [''],
    code: [''],
    name: [''],
  });

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.departementService.getDepartementById(id).subscribe((departement) => {
        console.log(departement);
        this.editForm.patchValue(departement);
      });
      console.log(id);
    }); 
  }
  onSubmit() {
    console.log(this.editForm.value);
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }
    
    let departement = new Departement();
    
     this.route.params.subscribe(params => {
      departement.id = params['id'];
      console.log(departement.id);
    }); 
    departement.code = this.editForm.value.code !;
    departement.name = this.editForm.value.name !;
  
    this.departementService.edit(departement).subscribe((response) => {
      console.log(departement.name);

      console.log(response);
      if(response.id!=null){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Departement updated successfully',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/gestion-departement']);
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