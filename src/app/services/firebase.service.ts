import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { UploadStatus, UploadStatuses } from '../models/upload';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private readonly storage: AngularFireStorage) {}

  uploadFile(path: string, file: File): Observable<UploadStatus> {
    const obs = new BehaviorSubject<UploadStatus>({
      status: UploadStatuses.Uploading,
      percentage: 0,
    });

    this.deleteFile(path).subscribe({
      complete: () => this.upload(path, file, obs),
      error: () => this.upload(path, file, obs),
    });

    return obs;
  }

  deleteFile(path: string): Observable<any> {
    const storageRef = this.storage.ref(path);
    return storageRef.delete();
  }

  private upload(path: string, file: File, obs: BehaviorSubject<UploadStatus>) {
    const storageRef = this.storage.ref(path);
    const uploadTask = this.storage.upload(path, file);
    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((downloadURL) => {
            obs.next({
              status: UploadStatuses.Complete,
              percentage: 100,
              fileUrl: downloadURL,
            });
          });
        })
      )
      .subscribe();

    uploadTask.percentageChanges().subscribe((value) => {
      if (value) {
        obs.next({
          status: UploadStatuses.Uploading,
          percentage: value,
        });
      }
    });
  }
}
