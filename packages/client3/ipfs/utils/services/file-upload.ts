import { ipfs } from "..";

export const ipfsBaseUrl = "http://localhost:8080/ipfs/";

/**

 *
 * IPFS Docs: https://docs.ipfs.tech/
 * @param fileToUpload - anything that you want to upload to IPFS
 * @returns - the IPFS hash of the uploaded file
 */
export const addFileToIPFS = async (fileToUpload: any): Promise<void> => {
  const fileReader = new FileReader();
  fileReader.readAsArrayBuffer(fileToUpload);

  fileReader.onloadend = async () => {
    const binaryStr = fileReader.result;
    if (binaryStr) {
      return await ipfs.add(binaryStr).then((file) => {
        pinFilesToIPFS(file.path);
        console.log(
          "content is availabe at:",
          ipfsBaseUrl + file.cid
          // future Sacha problem, but add external pinning - tested with cloudflare-ipfs (50GB/month free) and works
        );
      });
    }
    return await fileReader.readAsArrayBuffer(fileToUpload);
  };
};

/**
 *
 * IPFS Docs: https://docs.ipfs.tech/
 * @param CID - Content Identifier, pinning it locally so garbage collection doesn't remove it
 * @returns - the IPFS hash of the uploaded file
 */
export const pinFilesToIPFS = async (CID: string) => {
  return await ipfs.pin.add(CID);
};
