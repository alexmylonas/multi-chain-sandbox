import styled from 'styled-components';
import { DARK_GRAY, PURPLE } from '../../constants';
import IconHome from '../../icons/IconHome';
import IconGrid from '../../icons/IconGrid';
import { Routes } from '../ConnectedRoutes';
import React from 'react';
import IconSwap from '../../icons/IconSwap';

const NavPositioner = styled.div`
  position: sticky;
  width: 100%;
  bottom: 0;
`;

const NavWrapper = styled.div`
  background-color: ${DARK_GRAY};
  position: relative;
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const NavItem = styled.button<{ active: boolean }>`
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
  // border-top: 2px solid ${({ active }) => (active ? PURPLE : 'transparent')};
`;

const Border = styled.div<{ activeIndex: number; width: number }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 2px;
  width: ${({ width }) => width}px;
  background-color: ${PURPLE};
  transition: transform 0.3s ease-in-out;
  transform: translateX(${({ activeIndex }) => activeIndex * 100}%);
`;

type Props = {
  active: Routes;
  navigate: (route: Routes) => void;
};

const BottomNavigation = React.memo(({ navigate, active }: Props) => {
  const tabWrapperRef = React.useRef<HTMLDivElement>(null);
  const [tabWidth, setTabWidth] = React.useState(0);

  React.useEffect(() => {
    if (!tabWrapperRef.current) {
      return;
    }
    const handleResize = () => {
      const componentWidth = tabWrapperRef.current.offsetWidth / 3;
      setTabWidth(componentWidth);
    };
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <NavPositioner>
      <NavWrapper ref={tabWrapperRef}>
        <NavItem active={active === Routes.Home} tabIndex={Routes.Home} onClick={() => navigate(Routes.Home)}>
          <IconHome height="24px" width="24px" />
        </NavItem>
        <NavItem active={active === Routes.NFTs} tabIndex={Routes.NFTs} onClick={() => navigate(Routes.NFTs)}>
          <IconGrid height="24px" width="24px" />
        </NavItem>
        <NavItem active={active === Routes.Trading} tabIndex={Routes.Trading} onClick={() => navigate(Routes.Trading)}>
          <IconSwap height="24px" width="24px" />
        </NavItem>
        <Border activeIndex={active} width={tabWidth} />
      </NavWrapper>
    </NavPositioner>
  );
});

export default BottomNavigation;
