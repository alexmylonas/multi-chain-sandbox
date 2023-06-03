import React from 'react';
import { ConnectionProps } from '../Sidebar';
import Home from '../Home';
import BottomNavigation from '../BottomNavigation';
import Gallery from '../Gallery';

export enum Routes {
  Home,
  NFTs,
}
const ConnectedRoutes = React.memo((props: ConnectionProps) => {
  const [route, setRoute] = React.useState<Routes>(Routes.Home);
  let Comp = Home;
  if (route === Routes.NFTs) {
    Comp = Gallery;
  }

  return (
    <>
      <Comp {...props} />
      <BottomNavigation navigate={setRoute} active={route} />
    </>
  );
});

export default ConnectedRoutes;
