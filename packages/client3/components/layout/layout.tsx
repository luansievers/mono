import { createContext, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import MainSideBar from "../design-system/sidebar/main-sidebar";
import { TopBar } from "../design-system/topbar";

const bannerId = "banner";
const subnavId = "subnav";

interface LayoutProps {
  children: ReactNode;
}
type LayoutItems = {
  title?: string;
  selectedSidebarItem?: string;
};
export const LayoutContext = createContext<
  LayoutItems & { setLayoutItems?: (layout: LayoutItems) => void }
>({});

export const ApplicationContext = createContext<{
  isState1Selected?: boolean;
  setApplicationState?: (isState1Selected: boolean) => void;
}>({});

export function Layout({ children }: LayoutProps) {
  const [layout, setLayout] = useState<LayoutItems>({});
  const onSetLayout = (layout: LayoutItems) => {
    setLayout((currentLayout) => ({
      ...currentLayout,
      ...layout,
    }));
  };
  const [isState1Selected, setApplicationState] = useState<boolean | undefined>(
    undefined
  );

  return (
    <div className="bg-dark-100">
      <div id={bannerId} />
      <div id={subnavId} />
      <div className="flex">
        <LayoutContext.Provider
          value={{ ...layout, setLayoutItems: onSetLayout }}
        >
          <ApplicationContext.Provider
            value={{ isState1Selected, setApplicationState }}
          >
            <MainSideBar className="min-h-[1024px]" />
            <div className="grow">
              <div>
                <TopBar topBarTitle={layout.title} />
              </div>
              <div className="px-5">
                <div className="bg-sand-900 mx-auto min-h-full max-w-7xl pt-10">
                  {children}
                </div>
              </div>
            </div>
          </ApplicationContext.Provider>
        </LayoutContext.Provider>
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
