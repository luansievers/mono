export interface IAccount {
  accountMetadata: IAccountMetadata;
  isAccountCorrectState: boolean;
}

export interface IAccountMetadata {
  wallet: string;
  role: AccountRole;
}

export enum AccountRole {
  BACKER = "Backer",
  ARTIST = "Artist",
}
