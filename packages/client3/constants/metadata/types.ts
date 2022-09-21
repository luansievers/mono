export interface PoolMetadata {
  artistName: string;
  name: string;
  category: string;
  icon: string;
  dataroom?: string;
  description: string;
  highlights?: string[];
  agreement?: string;
  launchTime?: number;
  borrower: string;
  lateFeeApr?: number;
}
