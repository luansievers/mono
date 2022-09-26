import {
  Heading,
  BodyText,
  Caption,
  Icon,
  Link,
} from "@/components/design-system";
import UploadPDF from "@/components/upload-pdf/upload-pdf";

function CreatePoolDocumentUpload() {
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
      <UploadPDF className="col-span-3" />
      <div>
        <BodyText className="text-white" size="normal">
          Term Sheet
        </BodyText>
        <Link className="text-dark-50" href="/artist/dummyUrl">
          <Caption className="text-dark-50">Download template</Caption>
        </Link>
      </div>
      <UploadPDF
        className="col-span-3"
        uploadedFile={{
          fileName: "Pool Contract.pdf",
          fileUrl: "/artist/dummyUrl",
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
      <UploadPDF className="col-span-3" />

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
