import { ContractReceipt } from "ethers";
import { Result } from "ethers/lib/utils";

export function getLastEventArgs(result: ContractReceipt): Result {
  const events = result.events;
  if (events) {
    const lastEvent = events[events.length - 1];
    if (lastEvent) {
      return lastEvent.args as Result;
    }
  }
  return {} as Result;
}
