import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SubmissionFormData {
  journal: string;
  presentationType: string;
  researchArea: string;
  keywords: string;
  abstractTitle: string;
  abstractBody: string;
  presenterName: string;
  presenterEmail: string;
  presenterAffiliation: string;
  biography: string;
  coAuthors: Array<{
    id: string;
    name: string;
    email: string;
    affiliation: string;
  }>;
  uploadedFiles: {
    abstract?: { id: string; name: string; size: number; type: string; url: string } | null;
    consentForm?: { id: string; name: string; size: number; type: string; url: string } | null;
    supportingFile?: { id: string; name: string; size: number; type: string; url: string } | null;
  };
  consentToPublish: boolean;
  consentToDataProcessing: boolean;
  confirmAvailability: boolean;
}

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

// Manages form state for submissions
const submissionSlice = createSlice({
  name: 'submission',
  initialState,
  reducers: {
    updateField: (state, action: PayloadAction<{ field: keyof SubmissionFormData; value: string | boolean | File | null }>) => {
      const { field, value } = action.payload;
      (state.formData as any)[field] = value;
    },
    updateFields: (state, action: PayloadAction<Partial<SubmissionFormData>>) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    addCoAuthor: (state, action: PayloadAction<{ name: string; email: string; affiliation: string }>) => {
      const newCoAuthor = {
        id: Date.now().toString(),
        ...action.payload,
      };
      state.formData.coAuthors.push(newCoAuthor);
    },
    removeCoAuthor: (state, action: PayloadAction<string>) => {
      state.formData.coAuthors = state.formData.coAuthors.filter(
        (author) => author.id !== action.payload
      );
    },
    updateCoAuthor: (state, action: PayloadAction<{ id: string; field: string; value: string }>) => {
      const { id, field, value } = action.payload;
      const author = state.formData.coAuthors.find((a) => a.id === id);
      if (author) {
        if (field === 'name') author.name = value;
        if (field === 'email') author.email = value;
        if (field === 'affiliation') author.affiliation = value;
      }
    },
    updateUploadedFile: (state, action: PayloadAction<{ fileType: 'abstract' | 'consentForm' | 'supportingFile'; file: File | null }>) => {
      const { fileType, file } = action.payload;
      if (file) {
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
    removeUploadedFile: (state, action: PayloadAction<'abstract' | 'consentForm' | 'supportingFile'>) => {
      state.formData.uploadedFiles[action.payload] = null;
    },
    resetForm: (state) => {
      state.formData = initialState.formData;
      state.error = null;
      state.success = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    setSuccess: (state, action: PayloadAction<boolean>) => {
      state.success = action.payload;
    },
    setSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
    },
    setSavingDraft: (state, action: PayloadAction<boolean>) => {
      state.isSavingDraft = action.payload;
    },
  },
});

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

export default submissionSlice.reducer;
