import { UploadedFileType } from "@/components/upload-pdf";

export interface IPool {
  walletAddress: string;
  poolAddress: string;
  poolName: string;
  goalAmount: string;
  closingDate: Date;
  projectDetail: string;
  projectCoverImage: string;
  pdfDocuments: {
    poolContractPdf: UploadedFileType;
    termSheetPdf: UploadedFileType;
    proposalPdf: UploadedFileType;
  };
  terms: {
    projectGoal: string;
    raiseTarget: string;
  };
}
