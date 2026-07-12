export interface GenerateUploadUrlRequest {
    objectKey: string;
    contentType: string;
  }
  
  export interface GenerateUploadUrlResponse {
    success: boolean;
    uploadUrl: string;
    publicUrl: string;
    key: string;
  }