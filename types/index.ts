export interface Presenter {
  name: string;
  email: string;
  phone: string;
  institution: string;
  department: string;
  country: string;
  orcid: string;
}

export interface CoAuthor {
  id: string;
  name: string;
  email: string;
  institution: string;
  country: string;
  orcid: string;
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
}

export interface SubmissionFormData {
  // Abstract Information
  journal: string;
  presentationType: string;
  researchArea: string;
  keywords: string;
  year: string;
  duration: string;
  
  // Presenter Details
  presenter: Presenter;
  
  // Co Authors
  coAuthors: CoAuthor[];
  
  // Abstract
  abstract: string;
  biography: string;
  
  // Uploads
  files: UploadedFile[];
  
  // Declaration
  consentToPublish: boolean;
  consentToDataProcessing: boolean;
  confirmAvailability: boolean;
}
