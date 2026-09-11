import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/shell-sweep.webp';
const Header = styled.header`
  width: min(1240px, calc(100% - 80px));
  margin: 0 auto;
  border-bottom: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  min-height: 88px;
  @media (max-width: 600px) {
    width: calc(100% - 36px);
    min-height: 0;
    padding: 20px 0 0;
    flex-wrap: wrap;
    gap: 12px;
  }
`;
const Brand = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: var(--green);
  font-weight: 700;
  font-size: 22px;
  letter-spacing: -0.7px;
  img {
    width: 44px;
    height: 44px;
    border-radius: 10px;
  }
  @media (max-width: 600px) {
    font-size: 21px;
    img {
      width: 36px;
      height: 36px;
    }
  }
`;
const Nav = styled.nav`
  display: flex;
  gap: 32px;
  align-self: stretch;
  align-items: stretch;
  a {
    display: flex;
    align-items: center;
    position: relative;
    text-decoration: none;
    font-size: 14px;
    color: var(--muted);
    min-height: 48px;
  }
  a:hover {
    color: var(--green);
  }
  a[aria-current='page'] {
    color: var(--green);
  }
  a[aria-current='page']::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--gold);
  }
  @media (max-width: 600px) {
    width: 100%;
    justify-content: space-between;
    gap: 20px;
    a {
      min-height: 44px;
    }
  }
`;
export default function Navigation() {
  return (
    <Header>
      <Brand to="/" aria-label="Poly Canyon home">
        <img src={logo} alt="" width="44" height="44" />
        Poly Canyon
      </Brand>
      <Nav aria-label="Main navigation">
        {[
          ['/', 'Home'],
          ['/about', 'About'],
          ['/app', 'App'],
          ['/structures', 'Structures'],
        ].map(([to, label]) => (
          <NavLink key={to} to={to} end={to === '/'}>
            {label}
          </NavLink>
        ))}
      </Nav>
    </Header>
  );
}
