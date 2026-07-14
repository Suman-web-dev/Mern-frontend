"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { FileText, User, Users, Upload, CheckCircle, User2 } from "lucide-react";
import { submissionSchema, SubmissionFormData } from "@/validations/submissionSchema";
import { CoAuthor, UploadedFile } from "@/types";

import FormCard from "@/components/ui/FormCard";
import Timeline from "@/components/ui/Timeline";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import Label from "@/components/ui/Label";
import Button from "@/components/ui/Button";
import UploadCard from "@/components/ui/UploadCard";
import RichTextEditor from "@/components/ui/RichTextEditor";
import CoAuthorTable from "@/components/ui/CoAuthorTable";

import PublishCard from "@/components/sidebar/PublishCard";
import ChecklistCard from "@/components/sidebar/ChecklistCard";
import FeaturedEventCard from "@/components/sidebar/FeaturedEventCard";
import HelpCard from "@/components/sidebar/HelpCard";

// Redux hooks and API integration
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useSubmitAbstractMutation, useSaveDraftMutation } from "@/store/api/submissionApi";
import {
  
  addCoAuthor,
  removeCoAuthor,
  updateCoAuthor,
  updateUploadedFile,
  removeUploadedFile,
  resetForm,
  clearError,
  setSubmitting,
  setSavingDraft,
  setSuccess,
} from "@/store/slices/submissionSlice";

const journalOptions = [
  { value: "journal-of-architecture", label: "Journal of Architecture" },
  { value: "architectural-research-quarterly", label: "Architectural Research Quarterly" },
  { value: "building-and-environment", label: "Building and Environment" },
];

const presentationTypeOptions = [
  { value: "oral", label: "Oral Presentation" },
  { value: "poster", label: "Poster Presentation" },
  { value: "workshop", label: "Workshop" },
];

const researchAreaOptions = [
  { value: "sustainable-design", label: "Sustainable Design" },
  { value: "urban-planning", label: "Urban Planning" },
  { value: "building-technology", label: "Building Technology" },
  { value: "architectural-history", label: "Architectural History" },
  { value: "digital-architecture", label: "Digital Architecture" },
];

const yearOptions = [
  { value: "2024", label: "2024" },
  { value: "2025", label: "2025" },
  { value: "2026", label: "2026" },
];

const durationOptions = [
  { value: "15", label: "15 minutes" },
  { value: "20", label: "20 minutes" },
  { value: "30", label: "30 minutes" },
];

const countryOptions = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
  { value: "cn", label: "China" },
  { value: "in", label: "India" },
  { value: "other", label: "Other" },
];

const checklistItems = [
  { id: "1", text: "Complete all required fields", completed: false },
  { id: "2", text: "Upload abstract document", completed: false },
  { id: "3", text: "Add presenter information", completed: false },
  { id: "4", text: "Review and confirm declaration", completed: false },
];

export default function SubmissionForm() {
  const router = useRouter();
  
  const dispatch = useAppDispatch();
  const isSubmittingRedux = useAppSelector((state) => state.submission.isSubmitting);
  const isSavingDraftRedux = useAppSelector((state) => state.submission.isSavingDraft);

  const [submitAbstract, { isLoading: isSubmittingApi }] = useSubmitAbstractMutation();
  const [saveDraft, { isLoading: isSavingDraftApi }] = useSaveDraftMutation();

  const [coAuthors, setCoAuthors] = useState<CoAuthor[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<{
    abstract?: UploadedFile;
    fullPaper?: UploadedFile;
    supplementary?: UploadedFile;
  }>({});

  const [uploadErrors, setUploadErrors] = useState<{
    abstract?: string;
    fullPaper?: string;
  }>({});

  const uploadedFileIds = useRef<Set<string>>(new Set());

  const validateFiles = () => {
    const errors: { abstract?: string; fullPaper?: string } = {};
    if (!uploadedFiles.abstract) errors.abstract = "Abstract file is required";
    if (!uploadedFiles.fullPaper) errors.fullPaper = "Consent form is required";
    setUploadErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting: isSubmittingForm },
    watch,
    setValue,
  } = useForm<SubmissionFormData>({
    resolver: zodResolver(submissionSchema),
    defaultValues: {
      journal: "",
      presentationType: "",
      researchArea: "",
      keywords: "",
      year: "",
      duration: "",
      presenter: {
        name: "",
        email: "",
        phone: "",
        institution: "",
        department: "",
        country: "",
        orcid: "",
      },
      abstract: "",
      biography: "",
      consentToPublish: false,
      consentToDataProcessing: false,
      confirmAvailability: false,
    },
  });

  const abstractValue = watch("abstract", "");


  const getWordCount = (text: string) => {
    const cleanText = text.replace(/<[^>]*>/g, " ").trim();
    return cleanText ? cleanText.split(/\s+/).length : 0;
  };

  const handleAddCoAuthor = () => {
    const newCoAuthor: CoAuthor = {
      id: Date.now().toString(),
      name: "",
      email: "",
      institution: "",
      country: "",
      orcid: "",
    };
    setCoAuthors([...coAuthors, newCoAuthor]);
    // Sync with Redux state
    dispatch(addCoAuthor({ name: "", email: "", affiliation: "" }));
  };

  const handleRemoveCoAuthor = (id: string) => {
    setCoAuthors(coAuthors.filter((author) => author.id !== id));
    // Sync with Redux state
    dispatch(removeCoAuthor(id));
  };

  const handleUpdateCoAuthor = (id: string, field: keyof CoAuthor, value: string) => {
    setCoAuthors(
      coAuthors.map((author) =>
        author.id === id ? { ...author, [field]: value } : author
      )
    );
    // Sync with Redux state
    dispatch(updateCoAuthor({ id, field, value }));
  };

  const handleFileUpload = (type: keyof typeof uploadedFiles, file: File) => {
    const uploadedFile: UploadedFile = {
      id: Date.now().toString(),
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file),
    };
    setUploadedFiles({ ...uploadedFiles, [type]: uploadedFile });
    dispatch(updateUploadedFile({ 
      fileType: type as 'abstract' | 'consentForm' | 'supportingFile', 
      file: null
    }));
    if (!uploadedFileIds.current.has(uploadedFile.id)) {
      uploadedFileIds.current.add(uploadedFile.id);
    }
  };

  const handleFileRemove = (type: keyof typeof uploadedFiles) => {
    setUploadedFiles({ ...uploadedFiles, [type]: undefined });
    dispatch(removeUploadedFile(type as 'abstract' | 'consentForm' | 'supportingFile'));
  };

  const handleNumericKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowed = [
      "Backspace", "Delete", "Tab", "Escape", "Enter",
      "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown",
      "Home", "End", "+", "-",
    ];
    if (allowed.includes(e.key)) return;
    if (/^[0-9]$/.test(e.key)) return;
    e.preventDefault();
  };

  const onSubmit = async (data: SubmissionFormData) => {
    if (!validateFiles()) {
      toast.error("Please upload all required documents");
      const uploadSection = document.getElementById("upload-section");
      uploadSection?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    try {
      dispatch(setSubmitting(true));

      const submissionData = {
        journal: data.journal || '',
        presentationType: data.presentationType || '',
        researchArea: data.researchArea || '',
        keywords: data.keywords || '',
        year: data.year || '2026',
        duration: data.duration || '15',
        abstract: data.abstract || '',
        biography: data.biography || '',
        consentToPublish: data.consentToPublish || false,
        consentToDataProcessing: data.consentToDataProcessing || false,
        confirmAvailability: data.confirmAvailability || false,
        status: 'submitted',
        
        // Structure presenter as nested object
        presenter: {
          name: data.presenter?.name || '',
          email: data.presenter?.email || '',
          phone: data.presenter?.phone || '',
          institution: data.presenter?.institution || '',
          department: data.presenter?.department || '',
          country: data.presenter?.country || '',
          orcid: data.presenter?.orcid || '',
        },
        
        // Add co-authors
        coAuthors: coAuthors.map(author => ({
          id: author.id,
          name: author.name || '',
          email: author.email || '',
          institution: author.institution || '',
          country: author.country || '',
          orcid: author.orcid || '',
        })),
        
        // Add files if they exist
        files: {
          abstract: uploadedFiles.abstract ? {
            id: uploadedFiles.abstract.id,
            name: uploadedFiles.abstract.name,
            size: uploadedFiles.abstract.size,
            type: uploadedFiles.abstract.type,
            url: uploadedFiles.abstract.url,
          } : undefined,
          fullPaper: uploadedFiles.fullPaper ? {
            id: uploadedFiles.fullPaper.id,
            name: uploadedFiles.fullPaper.name,
            size: uploadedFiles.fullPaper.size,
            type: uploadedFiles.fullPaper.type,
            url: uploadedFiles.fullPaper.url,
          } : undefined,
          supplementary: uploadedFiles.supplementary ? {
            id: uploadedFiles.supplementary.id,
            name: uploadedFiles.supplementary.name,
            size: uploadedFiles.supplementary.size,
            type: uploadedFiles.supplementary.type,
            url: uploadedFiles.supplementary.url,
          } : undefined,
        },
      };

      const result = await submitAbstract(submissionData).unwrap();

      dispatch(setSuccess(true));
      toast.success(result?.message || "Abstract submitted successfully!");

      dispatch(resetForm());
      setCoAuthors([]);
      setUploadedFiles({});
      
      router.push('/submissions');

    } catch (error: any) {
      dispatch(setSuccess(false));
      const errorMessage = error?.data?.error || error?.data?.message || error?.message || "Failed to submit abstract. Please try again.";
      toast.error(errorMessage);
    } finally {
      dispatch(setSubmitting(false));
    }
  };

  const handleSaveDraft = async () => {
    try {
      dispatch(setSavingDraft(true));
      
      const currentValues = {
        journal: watch('journal'),
        presentationType: watch('presentationType'),
        researchArea: watch('researchArea'),
        keywords: watch('keywords'),
        year: watch('year'),
        duration: watch('duration'),
        abstract: watch('abstract'),
        biography: watch('biography'),
        consentToPublish: watch('consentToPublish'),
        consentToDataProcessing: watch('consentToDataProcessing'),
        confirmAvailability: watch('confirmAvailability'),
      };

      // Prepare submission data as JSON object - matching backend schema
      const draftData = {
        journal: currentValues.journal || '',
        presentationType: currentValues.presentationType || '',
        researchArea: currentValues.researchArea || '',
        keywords: currentValues.keywords || '',
        year: currentValues.year || '2026',
        duration: currentValues.duration || '15',
        abstract: currentValues.abstract || '',
        biography: currentValues.biography || '',
        consentToPublish: currentValues.consentToPublish || false,
        consentToDataProcessing: currentValues.consentToDataProcessing || false,
        confirmAvailability: currentValues.confirmAvailability || false,
        
        // Structure presenter as nested object
        presenter: {
          name: watch('presenter.name') || '',
          email: watch('presenter.email') || '',
          phone: watch('presenter.phone') || '',
          institution: watch('presenter.institution') || '',
          department: watch('presenter.department') || '',
          country: watch('presenter.country') || '',
          orcid: watch('presenter.orcid') || '',
        },
        
        // Add co-authors
        coAuthors: coAuthors.map(author => ({
          id: author.id,
          name: author.name,
          email: author.email,
          institution: author.institution,
          country: author.country,
          orcid: author.orcid || '',
        })),
        
        // Add files if they exist
        files: {
          abstract: uploadedFiles.abstract ? {
            id: uploadedFiles.abstract.id,
            name: uploadedFiles.abstract.name,
            size: uploadedFiles.abstract.size,
            type: uploadedFiles.abstract.type,
            url: uploadedFiles.abstract.url,
          } : undefined,
          fullPaper: uploadedFiles.fullPaper ? {
            id: uploadedFiles.fullPaper.id,
            name: uploadedFiles.fullPaper.name,
            size: uploadedFiles.fullPaper.size,
            type: uploadedFiles.fullPaper.type,
            url: uploadedFiles.fullPaper.url,
          } : undefined,
          supplementary: uploadedFiles.supplementary ? {
            id: uploadedFiles.supplementary.id,
            name: uploadedFiles.supplementary.name,
            size: uploadedFiles.supplementary.size,
            type: uploadedFiles.supplementary.type,
            url: uploadedFiles.supplementary.url,
          } : undefined,
        },
      };

      const result = await saveDraft(draftData).unwrap();

      toast.success(result?.message || "Draft saved successfully!");

      router.push('/submissions');
      
    } catch (error: any) {
      const errorMessage = error?.data?.error || error?.data?.message || error?.message || "Failed to save draft. Please try again.";
      toast.error(errorMessage);
    } finally {
      dispatch(setSavingDraft(false));
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3 min-w-0">
          <Timeline />
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            {/* Abstract Information */}
            <FormCard title="Abstract Information" stepIcon={<FileText className="w-5 h-5" />}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <Label required>Journal</Label>
                  <Select
                    {...register("journal")}
                    options={journalOptions}
                    error={errors.journal?.message}
                  />
                </div>

                <div>
                  <Label required>Presentation Type</Label>
                  <Select
                    {...register("presentationType")}
                    options={presentationTypeOptions}
                    error={errors.presentationType?.message}
                  />
                </div>

                <div>
                  <Label required>Research Area</Label>
                  <Select
                    {...register("researchArea")}
                    options={researchAreaOptions}
                    error={errors.researchArea?.message}
                  />
                </div>

                <div>
                  <Label required>Keywords</Label>
                  <Input
                    {...register("keywords")}
                    placeholder="Enter keywords separated by commas"
                    error={errors.keywords?.message}
                  />
                </div>

                <div>
                  <Label required>Year</Label>
                  <Select
                    {...register("year")}
                    options={yearOptions}
                    error={errors.year?.message}
                  />
                </div>

                <div>
                  <Label required>Duration</Label>
                  <Select
                    {...register("duration")}
                    options={durationOptions}
                    error={errors.duration?.message}
                  />
                </div>
              </div>
            </FormCard>

            {/* Presenter Details */}
            <FormCard title="Presenter Details" stepIcon={<User2 className="w-5 h-5" />}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="md:col-span-2">
                  <Label required>Full Name</Label>
                  <Input
                    {...register("presenter.name")}
                    placeholder="Dr. John Doe"
                    error={errors.presenter?.name?.message}
                  />
                </div>

                <div>
                  <Label required>Email Address</Label>
                  <Input
                    {...register("presenter.email")}
                    type="email"
                    placeholder="john.doe@example.com"
                    error={errors.presenter?.email?.message}
                  />
                </div>

                <div>
                  <Label required>Phone Number</Label>
                  <Input
                    {...register("presenter.phone")}
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    onKeyDown={handleNumericKeyDown}
                    inputMode="numeric"
                    error={errors.presenter?.phone?.message}
                  />
                </div>

                <div>
                  <Label required>Institution</Label>
                  <Input
                    {...register("presenter.institution")}
                    placeholder="University of Architecture"
                    error={errors.presenter?.institution?.message}
                  />
                </div>

                <div>
                  <Label required>Department</Label>
                  <Input
                    {...register("presenter.department")}
                    placeholder="Department of Design"
                    error={errors.presenter?.department?.message}
                  />
                </div>

                <div>
                  <Label required>Country</Label>
                  <Select
                    {...register("presenter.country")}
                    options={countryOptions}
                    error={errors.presenter?.country?.message}
                  />
                </div>

                <div className="md:col-span-2">
                  <Label>ORCID (Optional)</Label>
                  <Input
                    {...register("presenter.orcid")}
                    placeholder="XXXX-XXXX-XXXX-XXXX"
                    error={errors.presenter?.orcid?.message}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Format: 0000-0000-0000-0000
                  </p>
                </div>
              </div>
            </FormCard>

            {/* Co-Authors */}
            <FormCard title="Co-Authors" stepIcon={<Users className="w-5 h-5" />}>
              <CoAuthorTable
                coAuthors={coAuthors}
                onAdd={handleAddCoAuthor}
                onRemove={handleRemoveCoAuthor}
                onUpdate={handleUpdateCoAuthor}
              />
            </FormCard>

            {/* Abstract */}
            <FormCard title="Abstract" stepIcon={<FileText className="w-5 h-5" />}>
              <div className="mb-6">
                <Label required>Abstract Content</Label>
                <RichTextEditor
                  value={abstractValue}
                  onChange={(value) => setValue("abstract", value)}
                  placeholder="Write your abstract here..."
                  wordCount={getWordCount(abstractValue)}
                  maxWords={500}
                />
                {errors.abstract && (
                  <p className="mt-1 text-sm text-red-500">{errors.abstract.message}</p>
                )}
              </div>

              <div>
                <Label required>Presenter Biography</Label>
                <Textarea
                  {...register("biography")}
                  placeholder="Brief biography of the presenter..."
                  error={errors.biography?.message}
                />
              </div>
            </FormCard>

            {/* File Uploads */}
            <FormCard title="Upload Documents" stepIcon={<Upload className="w-5 h-5" />}>
              <div id="upload-section" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Abstract File — required */}
                <div>
                  <UploadCard
                    title="Abstract File *"
                    description="Upload abstract document"
                    acceptedFormats={[".pdf", ".doc", ".docx"]}
                    maxSize={10}
                    uploadedFile={uploadedFiles.abstract}
                    onUpload={(file) => {
                      handleFileUpload("abstract", file);
                      setUploadErrors((prev) => ({ ...prev, abstract: undefined }));
                    }}
                    onRemove={() => handleFileRemove("abstract")}
                    hasError={!!uploadErrors.abstract}
                  />
                  {uploadErrors.abstract && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                      <span className="inline-block w-3.5 h-3.5 rounded-full bg-red-500 text-white text-[9px] flex items-center justify-center font-bold">!</span>
                      {uploadErrors.abstract}
                    </p>
                  )}
                </div>

                {/* Consent / Copyright Form — required */}
                <div>
                  <UploadCard
                    title="Consent / Copyright Form *"
                    description="Upload signed consent form"
                    acceptedFormats={[".pdf", ".doc", ".docx"]}
                    maxSize={10}
                    uploadedFile={uploadedFiles.fullPaper}
                    onUpload={(file) => {
                      handleFileUpload("fullPaper", file);
                      setUploadErrors((prev) => ({ ...prev, fullPaper: undefined }));
                    }}
                    onRemove={() => handleFileRemove("fullPaper")}
                    hasError={!!uploadErrors.fullPaper}
                  />
                  {uploadErrors.fullPaper && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                      <span className="inline-block w-3.5 h-3.5 rounded-full bg-red-500 text-white text-[9px] flex items-center justify-center font-bold">!</span>
                      {uploadErrors.fullPaper}
                    </p>
                  )}
                </div>

                {/* Supporting Files — optional */}
                <UploadCard
                  title="Supporting Files (Optional)"
                  description="Upload supplementary materials"
                  acceptedFormats={[".pdf", ".doc", ".docx", ".zip"]}
                  maxSize={10}
                  uploadedFile={uploadedFiles.supplementary}
                  onUpload={(file) => handleFileUpload("supplementary", file)}
                  onRemove={() => handleFileRemove("supplementary")}
                />
              </div>
            </FormCard>

            {/* Declaration & Consent */}
            <FormCard title="Declaration & Consent" stepIcon={<CheckCircle className="w-5 h-5" />}>
              <div className="space-y-4">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    {...register("consentToPublish")}
                    className="mt-1 mr-3 w-5 h-5 text-primary-700 rounded border-gray-300 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">
                    I consent to the publication of my abstract in the conference proceedings
                    {errors.consentToPublish && (
                      <span className="text-red-500 ml-2">*</span>
                    )}
                  </span>
                </label>

                <label className="flex items-start">
                  <input
                    type="checkbox"
                    {...register("consentToDataProcessing")}
                    className="mt-1 mr-3 w-5 h-5 text-primary-700 rounded border-gray-300 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">
                    I consent to the processing of my personal data for conference purposes
                    {errors.consentToDataProcessing && (
                      <span className="text-red-500 ml-2">*</span>
                    )}
                  </span>
                </label>

                <label className="flex items-start">
                  <input
                    type="checkbox"
                    {...register("confirmAvailability")}
                    className="mt-1 mr-3 w-5 h-5 text-primary-700 rounded border-gray-300 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">
                    I confirm my availability to present at the conference
                    {errors.confirmAvailability && (
                      <span className="text-red-500 ml-2">*</span>
                    )}
                  </span>
                </label>
              </div>

              {(errors.consentToPublish || errors.consentToDataProcessing || errors.confirmAvailability) && (
                <p className="mt-2 text-sm text-red-500">
                  Please accept all required declarations
                </p>
              )}
            </FormCard>

            {/* Submit Button */}
            <div className="flex justify-center gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleSaveDraft}
                disabled={isSavingDraftRedux || isSavingDraftApi}
              >
                {isSavingDraftRedux || isSavingDraftApi ? "Saving..." : "Save Draft"}
              </Button>
              <Button
                type="submit"
                disabled={isSubmittingRedux || isSubmittingApi || isSubmittingForm}
              >
                {isSubmittingRedux || isSubmittingApi || isSubmittingForm ? "Submitting..." : "Submit Abstract"}
              </Button>
            </div>
          </form>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 min-w-0">
          <div className="lg:sticky lg:top-24 space-y-6 w-full">
            <PublishCard />
            <ChecklistCard items={checklistItems} />
            <FeaturedEventCard
              title="ARCC 2024 Conference"
              date="March 15-18, 2024"
              location="San Francisco, CA"
              time="9:00 AM - 5:00 PM"
            />
            <HelpCard />
          </div>
        </div>
      </div>
    </div>
  );
}
