import { Control, Controller } from "react-hook-form";

import {
  Heading,
  BodyText,
  Caption,
  Icon,
  Link,
} from "@/components/design-system";
import UploadPDF, {
  UploadedFileType,
} from "@/components/upload-pdf/upload-pdf";
import { toBase64 } from "@/lib/file-utils";

import { FormFields } from "./create-pool-form";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<FormFields, any>;
};

function CreatePoolDocumentUpload({ control }: Props) {
  const onFileUpload = async (
    file: File,
    onComplete: (base64File: UploadedFileType) => void
  ) => {
    const base64String = await toBase64(file);
    onComplete({
      fileName: file.name,
      fileUrl: base64String,
    });
  };

  return (
    <>
      <Heading className="text-white" level={4}>
        Documents
      </Heading>
      <BodyText className="col-span-3 my-auto text-white" size="normal">
        Upload relevant documents
      </BodyText>

      <div>
        <BodyText className="text-white" size="normal">
          Pool Contract
        </BodyText>
        <Link className="text-dark-50" href="/artist/dummyUrl">
          <Caption className="text-dark-50">Download template</Caption>
        </Link>
      </div>
      <Controller
        name={"pdfDocuments.poolContractPdf"}
        control={control}
        render={({ field: { onChange, value } }) => {
          return (
            <UploadPDF
              className="col-span-3"
              onFileUpload={(file) => {
                onFileUpload(file, onChange);
              }}
              onRemoveFile={() => {
                onChange(undefined);
              }}
              uploadedFile={value}
            />
          );
        }}
      />
      <div>
        <BodyText className="text-white" size="normal">
          Term Sheet
        </BodyText>
        <Link className="text-dark-50" href="/artist/dummyUrl">
          <Caption className="text-dark-50">Download template</Caption>
        </Link>
      </div>
      <Controller
        name={"pdfDocuments.termSheetPdf"}
        control={control}
        render={({ field: { onChange, value } }) => {
          return (
            <UploadPDF
              className="col-span-3"
              onFileUpload={(file) => {
                onFileUpload(file, onChange);
              }}
              onRemoveFile={() => {
                onChange(undefined);
              }}
              uploadedFile={value}
            />
          );
        }}
      />

      <div>
        <BodyText className="text-white" size="normal">
          Proposal
        </BodyText>
        <Link className="text-dark-50" href="/artist/dummyUrl">
          <Caption className="text-dark-50">Download template</Caption>
        </Link>
      </div>
      <Controller
        name={"pdfDocuments.proposalPdf"}
        control={control}
        render={({ field: { onChange, value } }) => {
          return (
            <UploadPDF
              className="col-span-3"
              onFileUpload={(file) => {
                onFileUpload(file, onChange);
              }}
              onRemoveFile={() => {
                onChange(undefined);
              }}
              uploadedFile={value}
            />
          );
        }}
      />
      <BodyText className="my-auto text-white" size="normal">
        Other Documents (Optional)
      </BodyText>
      <div className="col-span-3 flex flex-col">
        <BodyText className="text-light-40" size="normal">
          If you have any other documents you would like to share with backers,
          upload more. Please name the file properly.
        </BodyText>
        <BodyText
          size="normal"
          className="mt-2 flex items-center gap-x-2 text-accent-1"
        >
          <Icon size="lg" name="PlusCircle" />
          Add more documents
        </BodyText>
      </div>
    </>
  );
}

export default CreatePoolDocumentUpload;
