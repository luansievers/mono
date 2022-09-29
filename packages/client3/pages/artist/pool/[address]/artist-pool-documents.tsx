import { Heading } from "@/components/design-system";
import UploadPDF from "@/components/upload-pdf/upload-pdf";

function ArtistPoolDocuments() {
  return (
    <div className="mt-9 rounded-lg border border-dark-90 p-6">
      <Heading className="text-white" level={5}>
        Documents
      </Heading>
      <UploadPDF
        className="mt-7"
        uploadedFile={{
          fileName: "Pool Contract.pdf",
          fileUrl: "/artist/dummyUrl",
        }}
        onFileUpload={(uploadedFile) =>
          console.log("File uploaded", uploadedFile)
        }
        onRemoveFile={() => console.log("File removed")}
      />
      <UploadPDF
        className="mt-4"
        uploadedFile={{
          fileName: "Term Sheeet.pdf",
          fileUrl: "/artist/dummyUrl",
        }}
        onFileUpload={(uploadedFile) =>
          console.log("File uploaded", uploadedFile)
        }
        onRemoveFile={() => console.log("File removed")}
      />
      <UploadPDF
        className="mt-4"
        uploadedFile={{
          fileName: "Proposal.pdf",
          fileUrl: "/artist/dummyUrl",
        }}
        onFileUpload={(uploadedFile) =>
          console.log("File uploaded", uploadedFile)
        }
        onRemoveFile={() => console.log("File removed")}
      />
    </div>
  );
}

export default ArtistPoolDocuments;
