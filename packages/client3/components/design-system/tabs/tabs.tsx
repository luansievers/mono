import { Tab } from "@headlessui/react";
import clsx from "clsx";
import { Fragment } from "react";
import type { ReactNode } from "react";

interface TabProps {
  children: ReactNode;
  className?: string;
}

export function TabButton({ children }: TabProps) {
  return (
    <Tab as={Fragment}>
      {({ selected }) => (
        <button
          className={clsx(
            "mr-5 border-transparent",
            selected
              ? "mb-2 border-b border-b-accent-1 text-accent-1"
              : "text-green-50"
          )}
        >
          {children}
        </button>
      )}
    </Tab>
  );
}

export function TabContent({ children, className }: TabProps) {
  return (
    <Tab.Panel>
      <div className={className}>{children}</div>
    </Tab.Panel>
  );
}

export function TabGroup({ children }: TabProps) {
  return <Tab.Group>{children}</Tab.Group>;
}

export function TabList({ children }: TabProps) {
  return (
    <Tab.List>
      <div>{children}</div>
    </Tab.List>
  );
}

export function TabPanels({ children }: TabProps) {
  return <Tab.Panels>{children}</Tab.Panels>;
}
