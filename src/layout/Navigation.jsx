import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import {
  FaBars,
  FaDownload,
  FaInfo,
  FaBuilding,
  FaBookOpen,
} from 'react-icons/fa';
import styled from 'styled-components';
import Dialog from '../components/Dialog.jsx';
import {
  BannerMobile,
  MenuIcon,
  PolyCanyonTitle,
  Logo,
  Banner,
  BannerContent,
  BannerIcon,
  BannerText,
  NavLinks,
  NavLink,
} from './Navigation.styles.js';
import app360 from '../assets/app360.webp';

const Brand = styled(Link)`
  display: flex;
  align-items: center;
  gap: 16px;
  text-decoration: none;
  flex-shrink: 0;
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
  width: 100%;
`;
const Menu = styled.nav`
  display: grid;
  gap: 8px;
  margin-top: 18px;
  a {
    display: flex;
    align-items: center;
    gap: 12px;
    border-radius: 12px;
    padding: 14px 16px;
    text-decoration: none;
    background: #e8efe8;
    color: #376d31;
    font-weight: 700;
  }
`;
const links = [
  { to: '/download', text: 'App', Icon: FaDownload },
  { to: '/info', text: 'Info', Icon: FaInfo },
  { to: '/structures', text: 'Structures', Icon: FaBuilding },
  { to: '/about', text: 'About', Icon: FaBookOpen },
];

export default function Navigation() {
  const mobile = useMediaQuery({ maxWidth: 768 });
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);
  const currentPath = pathname.replace(/\/$/, '') || '/';
  const active = (to) =>
    currentPath === to ||
    (to === '/structures' && pathname.startsWith('/structures/'));
  if (mobile)
    return (
      <>
        <BannerMobile as="header">
          <MenuIcon
            as="button"
            style={{ border: 0 }}
            aria-label="Open navigation"
            aria-expanded={open}
            aria-haspopup="dialog"
            onClick={() => setOpen(true)}
          >
            <FaBars />
          </MenuIcon>
          <Brand to="/" aria-label="Poly Canyon home">
            <PolyCanyonTitle
              as="span"
              style={{ fontSize: 'clamp(26px, 8vw, 34px)' }}
            >
              Poly Canyon
            </PolyCanyonTitle>
          </Brand>
          <Link to="/" aria-label="Poly Canyon home">
            <Logo src={app360} alt="" width="40" height="40" />
          </Link>
        </BannerMobile>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          titleId="navigation-title"
        >
          <h2 id="navigation-title">Explore Poly Canyon</h2>
          <Menu aria-label="Main navigation">
            <Link to="/" onClick={() => setOpen(false)}>
              Home
            </Link>
            {links.map(({ to, text, Icon }) => (
              <Link
                to={to}
                key={to}
                aria-current={active(to) ? 'page' : undefined}
                onClick={() => setOpen(false)}
              >
                <Icon aria-hidden="true" />
                {text}
              </Link>
            ))}
          </Menu>
        </Dialog>
      </>
    );
  return (
    <Banner as="header" $isAtTop $isVisible>
      <BannerContent>
        <Row>
          <Brand to="/" aria-label="Poly Canyon home">
            <BannerIcon src={app360} alt="" width="40" height="40" />
            <BannerText as="span">Poly Canyon</BannerText>
          </Brand>
          <NavLinks as="nav" aria-label="Main navigation">
            {links.map(({ to, text, Icon }) => (
              <NavLink
                key={to}
                to={to}
                $isActive={active(to)}
                aria-current={active(to) ? 'page' : undefined}
              >
                <Icon aria-hidden="true" />
                {text}
              </NavLink>
            ))}
          </NavLinks>
        </Row>
      </BannerContent>
    </Banner>
  );
}
