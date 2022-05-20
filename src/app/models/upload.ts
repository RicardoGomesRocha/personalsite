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
