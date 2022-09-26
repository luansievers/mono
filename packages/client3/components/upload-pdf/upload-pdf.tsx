import clsx from "clsx";

import { BodyText, Button, Caption, Icon, Link } from "../design-system";

type Props = {
  uploadedFile?: {
    fileName: string;
    fileUrl: string;
  };
  className?: string;
};

function UploadPDF({ className, uploadedFile }: Props) {
  if (uploadedFile) {
    return (
      <BodyText
        size="small"
        semiBold
        className={clsx("flex flex-row items-center text-light-40", className)}
      >
        <Icon name="ClipboardText" size="lg" />
        <Link className="ml-3" href={uploadedFile.fileUrl} noUnderline>
          {uploadedFile.fileName}
        </Link>
        <Icon className="ml-3" name="XCircle" size="lg" />
      </BodyText>
    );
  }
  return (
    <div className={clsx("flex flex-row items-center", className)}>
      <Button
        buttonType="custom"
        className={clsx(
          "rounded-[6px] border border-dark-80 bg-transparent text-light-10 hover:bg-dark-90 disabled:border-dark-80 disabled:text-dark-80 disabled:hover:bg-white"
        )}
        childrenClassName="py-2"
      >
        Choose File
      </Button>

      <Caption className="ml-4 text-dark-50"> No File chosen</Caption>
    </div>
  );
}

export default UploadPDF;
