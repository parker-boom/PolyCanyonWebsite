import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Message = styled.section`
  max-width: 620px;
  margin: 48px auto;
  padding: 24px;
  line-height: 1.65;
  h1 {
    color: #376d31;
  }
  button {
    border: 0;
    border-radius: 10px;
    padding: 12px 20px;
    margin: 0 20px 12px 0;
    background: #376d31;
    color: white;
    cursor: pointer;
  }
`;

// A failed page download should leave visitors a way to recover.
export default class PageErrorBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <Message role="alert">
        <h1>This page couldn’t load.</h1>
        <p>Reload the page to try again, or return to the structure archive.</p>
        <button type="button" onClick={() => window.location.reload()}>
          Reload page
        </button>
        <Link to="/structures">Browse the structures</Link>
      </Message>
    );
  }
}
