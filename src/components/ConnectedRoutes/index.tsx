import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ConnectionProps } from '../Sidebar';
import Home from '../Home';
import BottomNavigation from '../BottomNavigation';
import Gallery from '../Gallery';
import { queryClient } from '../../services/api';
import Trading from '../Trading';

export enum Routes {
  Home,
  NFTs,
  Trading,
}
const ConnectedRoutes = React.memo((props: ConnectionProps) => {
  const [route, setRoute] = React.useState<Routes>(Routes.Home);
  let Comp = Home;
  if (route === Routes.NFTs) {
    Comp = Gallery;
  } else if (route === Routes.Trading) {
    Comp = Trading;
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Comp {...props} />
      </QueryClientProvider>
      <BottomNavigation navigate={setRoute} active={route} />
    </>
  );
});

export default ConnectedRoutes;
