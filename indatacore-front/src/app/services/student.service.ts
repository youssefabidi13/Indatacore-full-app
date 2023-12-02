import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Student } from '../entities/student';
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClient: HttpClient) { }

  private baseUrl='http://localhost:8888/api/students';

  getAllStudent() :Observable<Student[]> {
    const url = `${this.baseUrl}`;
    return this.httpClient.get<Student[]>(url)
      .pipe(
        catchError((error) => {
          console.log(error);
          throw error;
        })
      );
  }
  private deleteUrl='http://localhost:8888/api/deleteStudent';

  deleteStudent(id: string): Observable<any> {
    const url = `${this.deleteUrl}/${id}`;
    return this.httpClient.delete(url, { responseType: 'text' });
  }

  
  private addUrl='http://localhost:8888/api/addStudent';
  add(client: Student): Observable<Student> {
    const url = `${this.addUrl}`;
    return this.httpClient.post<Student>(url, client);
  }

  private updateUrl='http://localhost:8888/api/updateStudent';
  edit(Student: Student): Observable<Student> {
    const url = `${this.updateUrl}/${Student.id}`;
    return this.httpClient.patch<Student>(url, Student);
  }
  private StudentUrl='http://localhost:8888/api/student-by-id';

  getStudentById(id: any):Observable<Student>{
    const url = `${this.StudentUrl}/${id}`;
    return this.httpClient.get<Student>(url);
      
  }
}
