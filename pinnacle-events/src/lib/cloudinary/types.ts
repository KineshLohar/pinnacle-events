export interface CloudinaryUploadResult {
    url: string;
    publicId: string;
  }
  
  export interface CloudinaryDeleteResult {
    publicId: string;
    success: boolean;
  }