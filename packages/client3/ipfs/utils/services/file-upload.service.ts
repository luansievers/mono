import { ipfs } from "..";

/**

 *
 * IPFS Docs: https://docs.ipfs.tech/
 * @param fileToUpload - anything that you want to upload to IPFS
 * @returns - the IPFS hash of the uploaded file
 */
// export const addFileToIPFS = (fileToUpload: any): Promise<string> => {
export const addFileToIPFS = (fileToUpload: any): Promise<string> => {
  let ipfsHash;
  const fileReader = new FileReader();

  return new Promise((resolve, reject) => {
    fileReader.readAsArrayBuffer(fileToUpload);

    fileReader.onloadend = async () => {
      const buffer = Buffer.from(fileReader.result as ArrayBuffer);
      try {
        const result = await ipfs.add(buffer);
        ipfsHash = result.path;
        await ipfs.pin.add(ipfsHash);
        console.log(
          "content is availabe at:",
          "http://localhost:8081/ipfs/" + ipfsHash
          // TODO future Sacha problem, but add external pinning - tested with cloudflare-ipfs (50GB/month free) and works
        );
        resolve(ipfsHash);
      } catch (error) {
        reject(error);
      }
    };
  });
};

/**
 * IPFS Docs: https://docs.ipfs.tech/
 * @param CID - Content Identifier (CID), pinning it locally so garbage collection doesn't remove it
 * @returns - the IPFS hash of the uploaded file
 */
export const pinFilesToIPFS = async (CID: string) => {
  return await ipfs.pin.add(CID);
};
