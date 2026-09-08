import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const PageContainer = styled.div`
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  padding: 10px 20px 40px;
  box-sizing: border-box;
  @media (max-width: 480px) {
    padding: 10px 14px 30px;
  }
`;
export const RoundedContainer = styled.section`
  background: #e8efe8;
  border-radius: 20px;
  padding: 28px 24px;
  box-shadow:
    0 4px 20px rgba(189, 139, 19, 0.2),
    0 2px 8px rgba(55, 109, 49, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const Header = styled.header`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;
export const Subtitle = styled.div`
  font-family: 'Playfair Display', serif;
  font-size: clamp(24px, 4vw, 32px);
  font-style: italic;
  color: #376d31;
`;
export const MainTitle = styled.h1`
  font-size: clamp(42px, 7vw, 68px);
  font-weight: 800;
  margin: 0 0 6px;
  line-height: 1.05;
  color: #a8780c;
`;
export const TitleTagline = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #376d31;
  letter-spacing: 1.5px;
  text-transform: uppercase;
`;
export const Divider = styled.div`
  width: 60%;
  height: 1px;
  margin: 20px 0 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(189, 139, 19, 0.5),
    transparent
  );
`;
export const Description = styled.p`
  max-width: 640px;
  text-align: center;
  font-size: clamp(17px, 2.5vw, 21px);
  line-height: 1.65;
  color: #445044;
  margin: 18px 0 24px;
`;
export const LearnMoreButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: 44px;
  background: #376d31;
  color: white;
  text-decoration: none;
  border-radius: 50px;
  padding: 10px 24px;
  box-sizing: border-box;
  font-size: 17px;
  font-weight: bold;
  &:hover {
    background: #295033;
  }
  &:focus-visible {
    outline: 3px solid #a8780c;
    outline-offset: 4px;
  }
`;
export const StoreGrid = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 28px;
  margin-top: 28px;
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;
export const StoreCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 0;
  h2 {
    font-size: 20px;
    color: #376d31;
    margin: 0 0 14px;
    text-align: center;
  }
`;
export const DownloadButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: white;
  background: #376d31;
  min-height: 48px;
  padding: 10px 20px;
  border-radius: 50px;
  text-decoration: none;
  font-size: 17px;
  font-weight: 700;
  box-sizing: border-box;
  margin-bottom: 20px;
  svg {
    font-size: 28px;
    flex: 0 0 auto;
  }
  &:hover {
    background: #295033;
  }
  &:focus-visible {
    outline: 3px solid #a8780c;
    outline-offset: 4px;
  }
`;
export const Preview = styled.img`
  display: block;
  width: auto;
  height: auto;
  max-height: 560px;
  max-width: 100%;
  object-fit: contain;
  border-radius: 15px;
  @media (max-width: 640px) {
    max-height: 440px;
  }
`;
