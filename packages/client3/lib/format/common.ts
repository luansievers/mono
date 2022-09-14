export const handleAddressFormat = (account: string) => {
  return `${account.substring(0, 4)}...${account.substring(
    account.length - 4
  )}`;
};
