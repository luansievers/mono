import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import MainSideBar from "../design-system/sidebar/main-sidebar";
import { TopBar } from "../design-system/topbar";

const bannerId = "banner";
const subnavId = "subnav";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="bg-dark-100">
      <div id={bannerId} />
      <div id={subnavId} />
      <div className="flex">
        <MainSideBar className="min-h-[1024px]" />
        <div className="grow">
          <div>
            <TopBar />
          </div>
          <div className="px-5">
            <div className="bg-sand-900 mx-auto min-h-full max-w-7xl pt-10">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Portals don't work properly during server-rendering, because `document` doesn't exist, so this workaround is necessary.
function ClientOnlyPortal({
  selector,
  children,
}: {
  selector: string;
  children: ReactNode;
}) {
  const [isMountedOnClient, setIsMountedOnClient] = useState(false);
  useEffect(() => {
    setIsMountedOnClient(true);
  }, []);
  return isMountedOnClient ? (
    createPortal(children, document.querySelector(selector) as Element)
  ) : (
    <>{children}</>
  );
}

export function SubnavPortal({ children }: { children: ReactNode }) {
  return (
    <ClientOnlyPortal selector={`#${subnavId}`}>{children}</ClientOnlyPortal>
  );
}

export function BannerPortal({ children }: { children: ReactNode }) {
  return (
    <ClientOnlyPortal selector={`#${bannerId}`}>{children}</ClientOnlyPortal>
  );
}
