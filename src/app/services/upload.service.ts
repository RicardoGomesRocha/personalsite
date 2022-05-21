import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadStatus } from '../models/upload';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private readonly firebaseService: FirebaseService) {}

  upload(path: string, file: File, name?: string): Observable<UploadStatus> {
    if (!name) {
      name = file.name;
    } else {
      const index = file.name.lastIndexOf('.');
      const type = file.name.substring(index, file.name.length);
      name = `${name}${type}`;
    }

    const type: string = file.type;
    return this.firebaseService.uploadFile(`${path}/${name}`, file);
  }

  deleteFile(path: string): Observable<any> {
    return this.firebaseService.deleteFile(path);
  }
}
