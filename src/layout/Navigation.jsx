import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/app360.webp';

const Header = styled.header`
  width: min(1200px, calc(100% - 80px));
  margin: 0 auto;
  border-bottom: 1px solid var(--rule);
  padding: 24px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  @media (max-width: 700px) {
    width: calc(100% - 40px);
    padding: 18px 0 0;
    flex-wrap: wrap;
    gap: 16px;
  }
`;
const Brand = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--green);
  text-decoration: none;
  font: 26px var(--serif);
  min-width: 0;
  img {
    width: 42px;
    height: 42px;
    border-radius: 8px;
  }
  @media (max-width: 700px) {
    font-size: 24px;
    img {
      width: 36px;
      height: 36px;
    }
  }
`;
const Nav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 16px 32px;
  a {
    position: relative;
    padding: 12px 0;
    text-decoration: none;
    font-size: 15px;
  }
  a:hover {
    color: var(--gold);
  }
  a[aria-current='page']::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    background: var(--green);
  }
  @media (max-width: 700px) {
    width: 100%;
    justify-content: space-between;
    gap: 12px;
    a {
      padding: 0 0 14px;
      min-height: 40px;
    }
  }
`;
export default function Navigation() {
  return (
    <Header>
      <Brand to="/" aria-label="Poly Canyon home">
        <img src={logo} alt="" width="42" height="42" />
        Poly Canyon
      </Brand>
      <Nav aria-label="Main navigation">
        {[
          ['/', 'Home'],
          ['/structures', 'Structures'],
          ['/about', 'About'],
          ['/app', 'App'],
        ].map(([to, label]) => (
          <NavLink key={to} to={to} end={to === '/'}>
            {label}
          </NavLink>
        ))}
      </Nav>
    </Header>
  );
}
