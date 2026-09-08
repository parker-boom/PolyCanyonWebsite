import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAccessoryStructures } from '../data/structuresData.js';

const structures = getAccessoryStructures() || [];
export default function useAccessoryDetail() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [index, setIndex] = useState(0);
  const move = delta => setIndex(i => Math.max(0, Math.min(structures.length-1, i+delta)));
  return {
    currentStructure: structures[index],
    previousStructure: structures[index-1],
    nextStructure: structures[index+1],
    handleNext: () => move(1),
    handlePrev: () => move(-1),
    backToList: () =>
      navigate(state?.returnTo || '/structures', {
        state: { restoreScrollKey: state?.returnKey },
      }),
  };
}
