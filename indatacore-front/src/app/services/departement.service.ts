import { Departement } from './../entities/departement';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {
 
  
  
 
 
  
  constructor(private httpClient: HttpClient) { }

  private baseUrl='http://localhost:8888/api/departements';

  getAllDepartement() :Observable<Departement[]> {
    const url = `${this.baseUrl}`;
    return this.httpClient.get<Departement[]>(url)
      .pipe(
        catchError((error) => {
          console.log(error);
          throw error;
        })
      );
  }
  private deleteUrl='http://localhost:8888/api/deleteDepartement';

  deleteDepartement(id: string): Observable<any> {
    const url = `${this.deleteUrl}/${id}`;
    return this.httpClient.delete(url, { responseType: 'text' });
  }

  
  private addUrl='http://localhost:8888/api/addDepartement';
  add(client: Departement): Observable<Departement> {
    const url = `${this.addUrl}`;
    return this.httpClient.post<Departement>(url, client);
  }

  private updateUrl='http://localhost:8888/api/update-departement';
  edit(departement: Departement): Observable<Departement> {
    const url = `${this.updateUrl}/${departement.id}`;
    return this.httpClient.patch<Departement>(url, departement);
  }
  private departementUrl='http://localhost:8888/api/departement-by-id';

  getDepartementById(id: any):Observable<Departement>{
    const url = `${this.departementUrl}/${id}`;
    return this.httpClient.get<Departement>(url);
      
  }
}
