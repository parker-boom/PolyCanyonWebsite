import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAccessoryStructures } from '../data/structuresData.js';

const structures = getAccessoryStructures() || [];
export default function useAccessoryDetail() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [index, setIndex] = useState(() =>
    Math.floor(Math.random() * structures.length)
  );
  const move = (delta) =>
    setIndex((i) =>
      structures.length
        ? (i + delta + structures.length) % structures.length
        : 0
    );
  return {
    currentStructure: structures[index],
    handleNext: () => move(1),
    handlePrev: () => move(-1),
    backToList: () =>
      navigate(state?.returnTo || '/structures', {
        state: { restoreScrollKey: state?.returnKey },
      }),
  };
}
