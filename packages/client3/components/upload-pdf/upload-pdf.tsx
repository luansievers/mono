import clsx from "clsx";
import { ChangeEventHandler, MouseEventHandler, useRef } from "react";

import { BodyText, Button, Caption, Icon, Link } from "../design-system";

export type UploadedFileType = {
  fileName: string;
  fileUrl: string;
};

type Props = {
  uploadedFile?: UploadedFileType;
  className?: string;
  onFileUpload: (file: File) => void;
  onRemoveFile: () => void;
};

function UploadPDF({
  className,
  uploadedFile,
  onFileUpload,
  onRemoveFile,
}: Props) {
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    hiddenFileInput?.current?.click();
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    event.stopPropagation();
    if (event.target?.files?.[0]) {
      const chosenFile = event.target.files[0];
      onFileUpload(chosenFile);
    }
  };

  if (uploadedFile) {
    return (
      <BodyText
        size="small"
        semiBold
        className={clsx("flex flex-row items-center text-light-40", className)}
      >
        <Icon name="ClipboardText" size="lg" />
        <Link className="ml-3" href={"#"} noUnderline>
          {uploadedFile.fileName}
        </Link>
        <span
          className="cursor-pointer"
          onClick={() => {
            onRemoveFile();
          }}
        >
          <Icon className="ml-3" name="XCircle" size="lg" />
        </span>
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
        onClick={handleClick}
      >
        Choose File
      </Button>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        className="hidden"
        accept="application/pdf"
      />

      <Caption className="ml-4 text-dark-50"> No File chosen</Caption>
    </div>
  );
}

export default UploadPDF;
