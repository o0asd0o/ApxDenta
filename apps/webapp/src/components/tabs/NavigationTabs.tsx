import { cn } from '@repo/ui/lib/utils';
import { produce } from 'immer';
import * as motion from 'motion/react-client';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import { createContext, useContextSelector } from 'use-context-selector';
type TabType = {
  value: string;
  label: React.ReactNode | null;
  width: number;
  left: number;
};

const NavigationTabsContext = createContext<{
  tabs: TabType[];
  selectedTab: string | null;
  setSelectedTab: (tab: string) => void;
  registerTab: (tab: TabType) => void;
} | null>(null);

const List: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const selected = useContextSelector(NavigationTabsContext, (state) => {
    return state?.tabs.find((item) => item.value === state?.selectedTab);
  });

  useEffect(() => {
    ref.current?.scrollTo({
      left: (selected?.left ?? 0) - 120,
      behavior: 'smooth',
    });
  }, [selected]);

  return (
    <div className="flex w-full">
      <ScrollContainer className="scroll-container w-full" innerRef={ref}>
        <ul
          style={
            {
              '--indicator-width': `${selected?.width ?? 0}px`,
              '--indicator-left': `${selected?.left ?? 0}px`,
            } as CSSProperties
          }
          className={cn('flex flex-row relative border-b w-full', className)}
        >
          {children}
          <SelectIndicator />
        </ul>
      </ScrollContainer>
    </div>
  );
};

List.displayName = 'NavigationTabsList';

const SelectIndicator: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={cn(
        'bg-primary h-[2px] bottom-[-1px] absolute transition-[translate,width] duration-200 ease-in-out translate-x-[var(--indicator-left)] w-[var(--indicator-width)] rounded-t-xs left-0',
        className,
      )}
    />
  );
};
const ListItem: React.FC<{
  value: string;
  children: React.ReactNode;
  className?: string;
}> = ({ value, children, className }) => {
  const { setSelected, registerTab } = useContextSelector(
    NavigationTabsContext,
    (state) => ({
      setSelected: state?.setSelectedTab,
      registerTab: state?.registerTab,
    }),
  );

  const isSelected = useContextSelector(NavigationTabsContext, (state) => {
    const selectedTab = state?.selectedTab;
    const currentTab = state?.tabs.find((item) => item.value === value);
    return currentTab?.value === selectedTab;
  });

  const ref = useRef<HTMLButtonElement>(null);

  // biome-ignore lint: ignore dependencies
  useLayoutEffect(() => {
    const w = ref.current?.offsetWidth;
    const l = ref.current?.offsetLeft;

    const computedStyle = getComputedStyle(ref.current as Element);

    const pl = Number.parseFloat(computedStyle.paddingLeft);
    const pr = Number.parseFloat(computedStyle.paddingRight);

    const width = (w ?? 0) - (pl + pr);
    const left = (l ?? 0) + pl;

    registerTab?.({
      value,
      label: children,
      width: width,
      left: left,
    });
  }, []);

  return (
    <li
      key={value}
      data-value={value}
      className={cn(
        'whitespace-nowrap text-sm font-medium text-[#b5b8b4] transition-colors duration-200 ease-out hover:text-primary/60',
        isSelected && 'text-primary!',
        className,
      )}
    >
      <button
        ref={ref}
        tabIndex={-1}
        className="py-3 px-5"
        type="button"
        onClick={() => setSelected?.(value)}
      >
        {children}
      </button>
    </li>
  );
};
ListItem.displayName = 'NavigationTabsListItem';

type RootProps = {
  children: React.ReactNode;
  defaultValue?: string;
  onChangeTab?: (tab: string | null) => void;
};
const Root: React.FC<RootProps> = ({ children, defaultValue, onChangeTab }) => {
  const [tabs, setTabs] = useState<TabType[]>([]);
  const [selectedTab, setTab] = useState<string | null>(defaultValue || null);

  const setSelectedTab = (tab: string | null) => {
    setTab(tab);
    onChangeTab?.(tab);
  };

  const registerTab = useCallback((params: TabType) => {
    setTabs(
      produce((draft) => {
        if (draft.find((item) => item.value === params.value)) return;
        draft.push(params);
      }),
    );
  }, []);

  return (
    <NavigationTabsContext.Provider
      value={{
        selectedTab,
        setSelectedTab,
        tabs: tabs,
        registerTab,
      }}
    >
      {/** @ts-ignore **/}
      {children}
    </NavigationTabsContext.Provider>
  );
};
Root.displayName = 'NavigationTabsRoot';

const TabContent: React.FC<{
  className?: string;
  value: string;
  animated?: boolean;
  children: React.ReactNode;
}> = ({ value, children, className, animated }) => {
  const isSelected = useContextSelector(NavigationTabsContext, (state) => {
    const selectedTab = state?.selectedTab;
    const currentTab = state?.tabs.find((item) => item.value === value);
    return currentTab?.value === selectedTab;
  });

  if (isSelected) {
    if (animated) {
      return (
        <motion.div
          key={value || 'empty'}
          initial={{ y: 5, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -5, opacity: 0 }}
          transition={{ duration: 0.1 }}
          className="flex-1"
        >
          {children}
        </motion.div>
      );
    }
    return <div className={cn('px-5 py-2', className)}>{children}</div>;
  }

  return null;
};
TabContent.displayName = 'NavigationTabsContent';

export { Root, List, ListItem, TabContent };
