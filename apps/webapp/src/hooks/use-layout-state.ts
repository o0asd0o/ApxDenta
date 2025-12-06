import { parseAsStringEnum, useQueryState } from 'nuqs';
import { useEffect } from 'react';
import { useIsMobile } from './use-mobile';

const useLayoutState = () => {
  const isMobile = useIsMobile();
  const [layoutTab, setLayoutTab] = useQueryState(
    'layoutTab',
    parseAsStringEnum<'card' | 'list'>(['card', 'list']).withDefault('list'),
  );

  // biome-ignore lint:
  useEffect(() => {
    setLayoutTab(isMobile ? 'card' : 'list');
  }, [isMobile]);

  return [layoutTab, setLayoutTab] as const;
};

export default useLayoutState;
