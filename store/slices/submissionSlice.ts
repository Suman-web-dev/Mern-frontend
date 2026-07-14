import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// • Defines submission form data structure
// • Helps TypeScript understand field types
interface SubmissionFormData {
  // • Abstract information
  journal: string;
  presentationType: string;
  researchArea: string;
  keywords: string;
  abstractTitle: string;
  abstractBody: string;
  
  // • Presenter information
  presenterName: string;
  presenterEmail: string;
  presenterAffiliation: string;
  biography: string;
  
  // • Co-authors list
  coAuthors: Array<{
    id: string;
    name: string;
    email: string;
    affiliation: string;
  }>;
  
  // • Uploaded files metadata (not actual files)
  // • Stores only name, size, type, url for Redux compatibility
  uploadedFiles: {
    abstract?: { id: string; name: string; size: number; type: string; url: string } | null;
    consentForm?: { id: string; name: string; size: number; type: string; url: string } | null;
    supportingFile?: { id: string; name: string; size: number; type: string; url: string } | null;
  };
  
  // • Consent checkboxes
  consentToPublish: boolean;
  consentToDataProcessing: boolean;
  confirmAvailability: boolean;
}

// • Initial empty form state
// • Used as starting point and for form reset
const initialState: {
  formData: SubmissionFormData;
  isSubmitting: boolean;
  isSavingDraft: boolean;
  error: string | null;
  success: boolean;
} = {
  formData: {
    journal: '',
    presentationType: '',
    researchArea: '',
    keywords: '',
    abstractTitle: '',
    abstractBody: '',
    presenterName: '',
    presenterEmail: '',
    presenterAffiliation: '',
    biography: '',
    coAuthors: [],
    uploadedFiles: {
      abstract: null,
      consentForm: null,
      supportingFile: null,
    },
    consentToPublish: false,
    consentToDataProcessing: false,
    confirmAvailability: false,
  },
  isSubmitting: false,
  isSavingDraft: false,
  error: null,
  success: false,
};

// • Manages form state for submissions
// • Acts as browser-based mini-database
const submissionSlice = createSlice({
  name: 'submission',
  initialState,
  reducers: {
    // • Update single form field value
    updateField: (state, action: PayloadAction<{ field: keyof SubmissionFormData; value: string | boolean | File | null }>) => {
      const { field, value } = action.payload;
      (state.formData as any)[field] = value;
    },
    
    // • Update multiple form fields at once
    updateFields: (state, action: PayloadAction<Partial<SubmissionFormData>>) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    
    // • Add new co-author to list
    addCoAuthor: (state, action: PayloadAction<{ name: string; email: string; affiliation: string }>) => {
      const newCoAuthor = {
        id: Date.now().toString(), // • Timestamp as unique ID
        ...action.payload,
      };
      state.formData.coAuthors.push(newCoAuthor);
    },
    
    // • Remove co-author by ID
    removeCoAuthor: (state, action: PayloadAction<string>) => {
      state.formData.coAuthors = state.formData.coAuthors.filter(
        (author) => author.id !== action.payload
      );
    },
    
    // • Update specific co-author field
    updateCoAuthor: (state, action: PayloadAction<{ id: string; field: string; value: string }>) => {
      const { id, field, value } = action.payload;
      const author = state.formData.coAuthors.find((a) => a.id === id);
      if (author) {
        if (field === 'name') author.name = value;
        if (field === 'email') author.email = value;
        if (field === 'affiliation') author.affiliation = value;
      }
    },
    
    // • Save file metadata (not actual file)
    // • Redux can't store File objects directly
    updateUploadedFile: (state, action: PayloadAction<{ fileType: 'abstract' | 'consentForm' | 'supportingFile'; file: File | null }>) => {
      const { fileType, file } = action.payload;
      if (file) {
        // • Store only needed information
        (state.formData.uploadedFiles as any)[fileType] = {
          id: Date.now().toString(),
          name: file.name,
          size: file.size,
          type: file.type,
          url: URL.createObjectURL(file),
        };
      } else {
        (state.formData.uploadedFiles as any)[fileType] = null;
      }
    },
    
    // • Remove file from uploaded files list
    removeUploadedFile: (state, action: PayloadAction<'abstract' | 'consentForm' | 'supportingFile'>) => {
      state.formData.uploadedFiles[action.payload] = null;
    },
    
    // • Clear form to initial empty state
    resetForm: (state) => {
      state.formData = initialState.formData;
      state.error = null;
      state.success = false;
    },
    
    // • Remove error message
    clearError: (state) => {
      state.error = null;
    },
    
    // • Set submission success status
    setSuccess: (state, action: PayloadAction<boolean>) => {
      state.success = action.payload;
    },
    
    // • Set submitting loading state
    setSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
    },
    
    // • Set save draft loading state
    setSavingDraft: (state, action: PayloadAction<boolean>) => {
      state.isSavingDraft = action.payload;
    },
  },
});

// • Exported actions for component use
// • Each action updates state when called
export const {
  updateField,
  updateFields,
  addCoAuthor,
  removeCoAuthor,
  updateCoAuthor,
  updateUploadedFile,
  removeUploadedFile,
  resetForm,
  clearError,
  setSuccess,
  setSubmitting,
  setSavingDraft,
} = submissionSlice.actions;

// • Reducer updates state when actions are called
export default submissionSlice.reducer;
