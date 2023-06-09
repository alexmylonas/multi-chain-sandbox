import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ConnectionProps } from '../Sidebar';
import Home from '../../pages/Home';
import BottomNavigation from '../BottomNavigation';
import Gallery from '../../pages/Gallery';
import { queryClient } from '../../services/api';
import Trading from '../../pages/Trading';
import History from 'pages/History';
import Interview from 'pages/Interview';

export enum Routes {
  Home,
  NFTs,
  Trading,
  History,
  Interview,
}
const ConnectedRoutes = React.memo((props: ConnectionProps) => {
  const [route, setRoute] = React.useState<Routes>(Routes.Home);
  let Comp = Home;
  if (route === Routes.NFTs) {
    Comp = Gallery;
  } else if (route === Routes.Trading) {
    Comp = Trading;
  } else if (route === Routes.History) {
    Comp = History;
  } else if (route === Routes.Interview) {
    Comp = Interview;
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
