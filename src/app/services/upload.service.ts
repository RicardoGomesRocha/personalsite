import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadStatus } from '../models/upload';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private readonly firebaseService: FirebaseService) {}

  upload(path: string, file: File): Observable<UploadStatus> {
    return this.firebaseService.uploadFile(path, file);
  }
}
