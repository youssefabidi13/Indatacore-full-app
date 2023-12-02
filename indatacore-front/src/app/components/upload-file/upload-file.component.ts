import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { NgxFileDropEntry } from 'ngx-file-drop';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent  {

  public files: NgxFileDropEntry[] = [];
  public uploading: boolean = false;
  public uploadProgress: number = 0;
  public formData = new FormData();

  constructor(private http: HttpClient,private router:Router) { }
  

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
  }

  public fileOver(event: any) {
    // Handle file over event if needed
  }

  public fileLeave(event: any) {
    // Handle file leave event if needed
  }

  public uploadFiles() {
    this.uploading = true;
    this.uploadProgress = 0;
    this.formData = new FormData(); // Reset FormData for each upload

    for (const droppedFile of this.files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath, file);

          // You could upload it like this:
          this.formData.append('file', file, droppedFile.relativePath);

          // Upload with progress tracking
          this.http.post('http://localhost:8888/api/upload', this.formData, {
            reportProgress: true,
            observe: 'events'
          }).subscribe(event => {
            if (event.type === HttpEventType.UploadProgress) {
              this.uploadProgress = Math.round((event.loaded / event.total!) * 100);
            } else if (event.type === HttpEventType.Response) {
              this.uploading = false;
              // Sanitized logo returned from backend
              console.log("Upload completed:", event.body);
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'File uploade successfully',
                showConfirmButton: false,
                timer: 1500
              })
              this.router.navigate(['/gestion-student']);
            }
          });
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

}
