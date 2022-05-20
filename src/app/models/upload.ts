import { Observable } from 'rxjs';

export enum UploadStatuses {
  Complete,
  Error,
  Uploading,
}

export interface UploadStatus {
  percentage?: number;
  status: UploadStatuses;
  fileUrl?: string;
}

export interface UploadInterface {
  upload(file: File, data: { [key: string]: any }): Observable<UploadStatus>;
}
