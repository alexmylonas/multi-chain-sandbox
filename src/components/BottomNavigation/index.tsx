import styled from 'styled-components';
import { DARK_GRAY, PURPLE } from '../../constants';
import IconHome from '../../icons/IconHome';
import IconGrid from '../../icons/IconGrid';
import { Routes } from '../ConnectedRoutes';
import React from 'react';

const NavWrapper = styled.div`
  background-color: ${DARK_GRAY};
  position: sticky;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const NavItem = styled.button<{ active?: boolean }>`
  (props:{active?:boolean})display: flex;
  align-items: center;
  border: none;
  background: none;
  cursor: pointer;
  // checking if the button is active
  // if it is, we want to change the color of the icon
  // if not, we want to keep it the same
  // also top border should be purple
  width: 100%;
  padding: 16px 0;
  // background-color: ${(props) => (props.active ? 'red' : 'transparent')};
  border-top: ${(props) => (props.active ? `8px solid ${PURPLE}` : '8px solid transparent')};
`;

type Props = {
  active: Routes;
  navigate: (route: Routes) => void;
};

const BottomNavigation = React.memo(({ navigate, active }: Props) => {
  return (
    <NavWrapper>
      <NavItem active={active === Routes.Home} onClick={() => navigate(Routes.Home)}>
        <IconHome height="24px" width="24px" />
      </NavItem>
      <NavItem active={active === Routes.NFTs} onClick={() => navigate(Routes.NFTs)}>
        <IconGrid height="24px" width="24px" />
      </NavItem>
    </NavWrapper>
  );
});

export default BottomNavigation;
