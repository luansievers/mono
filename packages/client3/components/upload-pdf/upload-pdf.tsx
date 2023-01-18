import { initializeApp } from "@firebase/app";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "@firebase/storage";
import detectEthereumProvider from "@metamask/detect-provider";
import clsx from "clsx";
import * as ethers from "ethers";
import { ChangeEventHandler, MouseEventHandler, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

import { BodyText, Button, Caption, Icon, Link } from "../design-system";

//).config({path: './.env.local'})

// const fbConfig = {
//   apiKey: process.env.API_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   projectId: "free-artists",
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: "325416997457",
//   appId: "1:325416997457:web:775e2c8d7478eb4c49de70",
//   measurementId: "G-7QL28G2VX2"
// };

const fbConfig = {
  apiKey: "AIzaSyAU9JVLd_MxxpkaVgfmp9RhUd0-5cHu9Hc",
  authDomain: "free-artists.firebaseapp.com",
  projectId: "free-artists",
  storageBucket: "free-artists.appspot.com",
  messagingSenderId: "325416997457",
  appId: "1:325416997457:web:775e2c8d7478eb4c49de70",
  measurementId: "G-7QL28G2VX2",
};

export type UploadedFileType = {
  fileName: string;
  fileUrl: string;
};

type Props = {
  uploadedFile?: UploadedFileType;
  className?: string;
  onFileUpload?: (file: File) => void;
  onRemoveFile?: () => void;
};
const getAddr = async () => {
  const provider = await detectEthereumProvider();
  if (provider) {
    const ethprovider = new ethers.providers.Web3Provider(provider, "any");
    // Prompt user for account connections
    await ethprovider.send("eth_requestAccounts", []);
    const signer = ethprovider.getSigner();
    const addr = await signer.getAddress();
    console.log(`address: ${addr}`);
    return addr;
  } else {
    alert("no eth provider detected - sign into your wallet");
  }
};

function UploadPDF({
  className,
  uploadedFile,
  onFileUpload,
  onRemoveFile,
}: Props) {
  const dURL = "";
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    hiddenFileInput?.current?.click();
  };
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target?.files?.[0]) {
      const chosenFile = event.target.files[0];
      onFileUpload && onFileUpload(chosenFile);

      // TODO: upload file, show percentage, only store in fb storage if submit button clicked successfully

      const app = initializeApp(fbConfig);
      const storage = getStorage(app);
      const storageRef = ref(storage, `/docs/${uuidv4()}/${chosenFile.name}`);
      console.log(storageRef);

      const uploadTask = uploadBytesResumable(storageRef, chosenFile);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log(`url:` + downloadURL);
          });
        }
      );
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
        <Link className="ml-3" href={uploadedFile.fileUrl} noUnderline>
          {uploadedFile.fileName}
        </Link>
        {onRemoveFile ? (
          <span
            className="cursor-pointer"
            onClick={() => {
              onRemoveFile();
            }}
          >
            <Icon className="ml-3 stroke-dark-50" name="XCircle" size="lg" />
          </span>
        ) : null}
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
