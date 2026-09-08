import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getStructuresList, getStructureInfo } from '../data/structuresData.js';
import { sortImages, galleryQuery } from '../data/structureHelpers.js';
import {
  mainImages,
  closeUpImages,
  otherImages,
} from '../images/structureImages.js';
import useImagePreloader from '../images/useImagePreloader.js';
import { shareStructure } from '../data/shareStructure.js';
import { resourceLinks } from '../data/resourceLinks.js';

const structures = getStructuresList();
const imagePath = (path) => {
  const key = path.split('/').pop();
  return mainImages[key] || closeUpImages[key] || otherImages[key];
};

/** Shared archive navigation and gallery state; each layout owns its presentation. */
export default function useStructureDetail() {
  const navigate = useNavigate();
  const { structureUrl } = useParams();
  const { search, state } = useLocation();
  const backToList = () =>
    navigate(state?.returnTo || '/structures', {
      state: { restoreScrollKey: state?.returnKey },
    });
  const structure = useMemo(() => {
    const entry = structures.find((s) => s.url === structureUrl);
    const data = entry && getStructureInfo(entry.number);
    return data
      ? {
          ...data,
          images: sortImages(data.images).filter(
            (image) => typeof image?.path === 'string' && image.path
          ),
        }
      : null;
  }, [structureUrl]);
  const query = galleryQuery(search, structure?.images.length || 0);
  const [currentImageIndex, setCurrentImageIndex] = useState(query.index);
  const [fullscreen, setFullscreen] = useState(query.fullscreen);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [imageAspectRatio, setImageAspectRatio] = useState(null);
  // App keys this detail by pathname and search, so route state starts together.
  const currentPaths = useMemo(
    () => structure?.images.map((img) => imagePath(img.path)) || [],
    [structure]
  );
  const { loadedImages } = useImagePreloader({
    currentPaths,
    currentIndex: currentImageIndex,
  });
  const moveImage = useCallback(
    (delta) =>
      setCurrentImageIndex((i) =>
        currentPaths.length
          ? (i + delta + currentPaths.length) % currentPaths.length
          : 0
      ),
    [currentPaths.length]
  );
  const handlePrevImage = useCallback(() => moveImage(-1), [moveImage]);
  const handleNextImage = useCallback(() => moveImage(1), [moveImage]);
  const position = structures.findIndex((s) => s.url === structureUrl);
  const adjacent = (delta) =>
    structures[(position + delta + structures.length) % structures.length];
  const handlePrevStructure = () =>
    navigate(`/structures/${adjacent(-1).url}`, { state });
  const handleNextStructure = () =>
    navigate(`/structures/${adjacent(1).url}`, { state });
  useEffect(() => {
    if (!fullscreen) return;
    const onKey = (event) => {
      if (event.key === 'Escape') setFullscreen(false);
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        handlePrevImage();
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        handleNextImage();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [fullscreen, handleNextImage, handlePrevImage]);
  const [shareStatus, setShareStatus] = useState('');
  useEffect(() => {
    if (!shareStatus) return;
    const timer = setTimeout(() => setShareStatus(''), 6000);
    return () => clearTimeout(timer);
  }, [shareStatus]);
  const handleShare = async () => {
    if (!structure) return;
    const url = `https://polycanyon.com/structures/${structure.url}`;
    setShareStatus('');
    setShareStatus(
      await shareStructure({
        title: structure.names[0],
        text: 'Check out this structure in Poly Canyon!',
        url,
      })
    );
  };
  const links = resourceLinks(structure?.links);
  return {
    navigate,
    backToList,
    structure,
    structureNumber: structure?.number,
    notFound: !structure,
    currentImageIndex,
    descriptionExpanded,
    toggleDescription: () => setDescriptionExpanded((v) => !v),
    imageAspectRatio,
    setImageAspectRatio,
    loadedImages,
    fullscreen: fullscreen && Boolean(structure?.images[currentImageIndex]),
    setFullscreen,
    toggleFullscreen: () => setFullscreen((v) => !v),
    handlePrevImage,
    handleNextImage,
    handlePrevStructure,
    handleNextStructure,
    getPrevStructureNumber: () => adjacent(-1).number,
    getNextStructureNumber: () => adjacent(1).number,
    getValidLinks: () => links,
    handleShare,
    shareStatus,
  };
}
