import ContactLink from '../../components/ContactLink.jsx';
import React, { lazy, Suspense, useLayoutEffect, useState } from 'react';
import {
  Link,
  useNavigate,
  useSearchParams,
  useLocation,
  useNavigationType,
} from 'react-router-dom';
import {
  FaSearch,
  FaChevronDown,
  FaArrowRight,
  FaDice,
  FaImage,
  FaQuestion,
  FaHashtag,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaSortAmountUp,
  FaSortAmountDown,
} from 'react-icons/fa';
import * as S from '../Structures.styles.js';
import {
  thumbnailImages,
  accessoryImages,
  getResponsiveImage,
} from '../images/structureImages.js';
import structures from '../data/structuresList.json';
import { sortStructures } from '../data/structureHelpers.js';
const ResearchInfo = lazy(() => import('../extraComponents/ResearchInfo.jsx'));

export default function StructureList({ mobile = false }) {
  const navigate = useNavigate();
  const location = useLocation();
  const returnState = {
    returnTo: location.pathname + location.search,
    returnKey: location.key,
  };
  const [params, setParams] = useSearchParams();
  const action = useNavigationType();
  const [query, setQuery] = useState(params.get('q') || '');
  // Typing must update immediately; URL changes may render in a transition.
  // Our filters replace the current entry. Back/Forward and incoming links
  // restore the field from their own URL instead.
  useLayoutEffect(() => {
    if (action !== 'REPLACE') setQuery(params.get('q') || '');
  }, [location.key, action, params]);
  const sort = ['Number', 'Year', 'Location'].includes(params.get('sort'))
    ? params.get('sort')
    : 'Number';
  const ascending = params.get('direction') !== 'desc';
  const open = {
    active: params.get('active') !== 'closed',
    ghost: params.get('ghost') !== 'closed',
  };
  function updateFilter(key, value) {
    setParams(
      (current) => {
        const next = new URLSearchParams(current);
        if (value) next.set(key, value);
        else next.delete(key);
        return next;
      },
      { replace: true }
    );
  }
  const [research, setResearch] = useState(false);
  const Page = mobile ? S.MobilePageContainer : S.PageContainer;
  const SearchContainer = mobile ? S.MobileSearchContainer : S.SearchContainer;
  const Search = mobile ? S.MobileSearchSection : S.SearchSection;
  const SearchIcon = mobile ? S.MobileSearchIcon : S.SearchIcon;
  const Input = mobile ? S.MobileSearchInput : S.SearchInput;
  const Grid = mobile ? S.MobileStructuresGrid : S.StructuresGrid;
  const Card = mobile ? S.MobileStructureCard : S.StructureCard;
  const Photo = mobile ? S.MobileStructureImage : S.StructureImage;
  const Info = mobile ? S.MobileStructureInfo : S.StructureInfo;
  const NumberBadge = mobile ? S.MobileStructureNumber : S.StructureNumber;
  const Title = mobile ? S.MobileStructureTitle : S.StructureTitle;
  const Sort = mobile ? S.MobileSortOption : S.SortOption;
  const Direction = mobile ? S.MobileDirectionToggle : S.DirectionToggle;
  function surprise(image = false) {
    const choices = image
      ? structures.filter((s) => s.imageCount > 0)
      : structures;
    const choice = choices[Math.floor(Math.random() * choices.length)];
    if (!choice) return;
    const index = image ? Math.floor(Math.random() * choice.imageCount) : 0;
    navigate(
      `/structures/${choice.url}${image ? `?fullscreen=true&imageIndex=${index}` : ''}`,
      { state: returnState }
    );
  }
  return (
    <Page>
      <SearchContainer>
        <S.TitleContainer>
          <S.TitleTop>The Stories of</S.TitleTop>
          <S.TitleBottom>
            {mobile ? 'Structures' : 'The Structures'}
          </S.TitleBottom>
          <S.TitleTagline>A Legacy of Student Innovation</S.TitleTagline>
        </S.TitleContainer>
        <S.SearchAndInfoContainer>
          <Search>
            <SearchIcon>
              <FaSearch />
            </SearchIcon>
            <Input
              aria-label="Search structures"
              type="search"
              placeholder={
                mobile
                  ? 'Name or number…'
                  : 'Search structures by name or number...'
              }
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                updateFilter('q', e.target.value);
              }}
            />
          </Search>
          <S.InfoButton
            aria-label="About the research"
            onClick={() => setResearch(true)}
          >
            <FaQuestion />
          </S.InfoButton>
        </S.SearchAndInfoContainer>
        <S.SurpriseButtonsContainer>
          <S.IntegratedSurpriseButton>
            <S.SurpriseText>Surprise me</S.SurpriseText>
            <S.SurpriseIconButton
              aria-label="Random structure"
              onClick={() => surprise()}
            >
              <FaDice />
            </S.SurpriseIconButton>
            <S.SurpriseIconButton
              aria-label="Random photograph"
              onClick={() => surprise(true)}
            >
              <FaImage />
            </S.SurpriseIconButton>
          </S.IntegratedSurpriseButton>
        </S.SurpriseButtonsContainer>
      </SearchContainer>
      <S.StructuresContainer>
        <S.ControlGroup
          style={{
            justifyContent: 'center',
            marginBottom: 24,
            flexWrap: 'wrap',
          }}
        >
          <S.SortButtonGroup>
            {[
              ['Number', FaHashtag],
              ['Year', FaCalendarAlt],
              ['Location', FaMapMarkerAlt],
            ].map(([name, Icon]) => (
              <Sort
                key={name}
                aria-label={`Sort by ${name.toLowerCase()}`}
                selected={sort === name}
                aria-pressed={sort === name}
                onClick={() =>
                  updateFilter('sort', name === 'Number' ? '' : name)
                }
              >
                <Icon />
                <span>{name}</span>
              </Sort>
            ))}
            <Direction
              aria-label={ascending ? 'Sort descending' : 'Sort ascending'}
              onClick={() => updateFilter('direction', ascending ? 'desc' : '')}
            >
              {ascending ? <FaSortAmountUp /> : <FaSortAmountDown />}
            </Direction>
          </S.SortButtonGroup>
        </S.ControlGroup>
        {['active', 'ghost'].map((status) => {
          const entries = sortStructures(structures, {
            status,
            sort,
            ascending,
            query,
          });
          return (
            <S.SectionContainer key={status}>
              <S.SectionHeader>
                <S.SectionTitleContainer
                  as="button"
                  type="button"
                  aria-expanded={open[status]}
                  onClick={() =>
                    updateFilter(status, open[status] ? 'closed' : '')
                  }
                  style={{
                    border: 0,
                    background: 'transparent',
                    textAlign: 'left',
                    font: 'inherit',
                  }}
                >
                  <S.SectionTitle>
                    {status === 'active' ? 'Active' : 'Ghost'} Structures
                  </S.SectionTitle>
                  <S.SectionToggle isOpen={open[status]}>
                    <FaChevronDown />
                  </S.SectionToggle>
                </S.SectionTitleContainer>
              </S.SectionHeader>
              {open[status] &&
                (entries.length ? (
                  <Grid>
                    {entries.map((s) => (
                      <Card
                        as={Link}
                        to={`/structures/${s.url}`}
                        state={returnState}
                        key={s.number}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        <Photo
                          {...getResponsiveImage(
                            s.number === -1
                              ? Object.values(accessoryImages)[0]
                              : thumbnailImages[s.image_key],
                            '(max-width: 360px) 90px, (max-width: 768px) 120px, 200px'
                          )}
                          alt={s.title}
                          loading="lazy"
                          decoding="async"
                        />
                        <Info>
                          <NumberBadge>
                            {s.number === -1 ? '★' : s.number}
                          </NumberBadge>
                          <Title>{s.title}</Title>
                        </Info>
                        <S.ChevronIcon className="chevron-icon">
                          <FaArrowRight />
                        </S.ChevronIcon>
                      </Card>
                    ))}
                  </Grid>
                ) : (
                  <p role="status">No {status} structures match your search.</p>
                ))}
            </S.SectionContainer>
          );
        })}
      </S.StructuresContainer>
      <S.ContactContainer>
        <S.ContactTitle>Have information on structures?</S.ContactTitle>
        <S.ContactText>
          <ContactLink>Contact</ContactLink>
        </S.ContactText>
      </S.ContactContainer>
      {research && (
        <Suspense fallback={null}>
          <ResearchInfo isMobile={mobile} onClose={() => setResearch(false)} />
        </Suspense>
      )}
    </Page>
  );
}
