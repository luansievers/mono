export interface FileUploadProps {
  id: string;
  label: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}
