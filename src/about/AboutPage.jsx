import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import dome from '../assets/generated/info/a1.webp';

const Page = styled.article`
  max-width: 1040px;
  margin: 0 auto;
  padding: 36px 28px 60px;
  color: #354133;
  h1 {
    margin: 0 0 20px;
    color: #376d31;
    font-size: clamp(34px, 4.5vw, 48px);
    line-height: 1.12;
    letter-spacing: -1px;
  }
  h2 {
    margin: 0 0 20px;
    color: #376d31;
    font-size: 28px;
    line-height: 1.25;
  }
  p {
    margin: 0 0 20px;
    font-size: 17px;
    line-height: 1.8;
  }
  a {
    color: #376d31;
    text-underline-offset: 3px;
  }
  section {
    scroll-margin-top: 100px;
  }
  @media (max-width: 600px) {
    padding: 26px 20px 40px;
    h2 {
      font-size: 25px;
    }
  }
`;
const Introduction = styled.header`
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  gap: 40px;
  align-items: center;
  padding-bottom: 32px;
  border-bottom: 1px solid #dbe1d5;
  figure {
    margin: 0;
  }
  img {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 1.12;
    object-fit: cover;
    border-radius: 18px;
  }
  figcaption {
    margin-top: 10px;
    color: #5d6959;
    font-size: 13px;
    line-height: 1.5;
  }
  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    gap: 8px;
    img {
      aspect-ratio: 1.65;
    }
  }
`;
const Location = styled.a`
  display: inline-block;
  font-size: 13px;
  margin-bottom: 16px;
`;
const Text = styled.div`
  section {
    padding-top: 44px;
  }
`;
const Reference = styled.p`
  && {
    font-size: 13px;
    line-height: 1.65;
    color: #606b5d;
    margin-top: -6px;
  }
`;
const ClimateFigure = styled.figure`
  margin: 28px 0 6px;
  figcaption {
    margin-top: 12px;
    font-size: 12px;
    line-height: 1.6;
    color: #606b5d;
  }
`;
const Climate = styled.div`
  padding: 24px;
  border: 1px solid #dce4d4;
  border-radius: 18px;
  background: #f4f7ef;
  h3 {
    color: #376d31;
    font-size: 18px;
    margin: 0 0 16px;
  }
  @media (max-width: 450px) {
    padding: 20px 14px;
  }
`;
const SeasonButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 22px;
  button {
    flex: 1;
    padding: 10px 12px;
    border: 1px solid #c9d4bd;
    border-radius: 10px;
    background: white;
    color: #376d31;
    cursor: pointer;
    font: inherit;
    font-size: 14px;
    font-weight: 600;
    transition:
      background-color 120ms ease,
      color 120ms ease;
  }
  button[aria-pressed='true'] {
    color: white;
    background: #376d31;
    border-color: #376d31;
  }
`;
const Months = styled.div`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 3px;
  margin: 0 0 20px;
  span {
    font-size: 10px;
    text-align: center;
    color: #54604f;
  }
  i {
    display: block;
    height: 12px;
    margin-bottom: 7px;
    border-radius: 2px;
    background: #dce2d5;
  }
  i[data-season='wet'] {
    background: #75936b;
  }
  i[data-season='dry'] {
    background: #d7b669;
  }
  i[data-season='transition'] {
    background: linear-gradient(90deg, #d7b669 50%, #75936b 50%);
  }
`;
const SeasonText = styled.div`
  p {
    font-size: 15px;
    line-height: 1.7;
    margin: 0;
  }
`;
const Project = styled.section`
  margin-top: 40px;
  border-top: 1px solid #dbe1d5;
`;
const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
function SeasonalClimate() {
  const [season, setSeason] = useState('dry');
  return (
    <ClimateFigure>
      <Climate>
        <h3>Weather through the year</h3>
        <SeasonButtons aria-label="Explore the seasonal climate">
          <button
            type="button"
            aria-pressed={season === 'dry'}
            onClick={() => setSeason('dry')}
          >
            Dry season
          </button>
          <button
            type="button"
            aria-pressed={season === 'wet'}
            onClick={() => setSeason('wet')}
          >
            Wet season
          </button>
        </SeasonButtons>
        <Months aria-label="Typical dry season: May to early October. Typical wet season: late October through April.">
          {months.map((month, index) => {
            const kind =
              index === 9
                ? 'transition'
                : index >= 4 && index <= 8
                  ? 'dry'
                  : 'wet';
            return (
              <span key={month} aria-hidden="true">
                <i
                  data-season={
                    kind === season || kind === 'transition' ? kind : undefined
                  }
                />
                {month}
              </span>
            );
          })}
        </Months>
        <SeasonText aria-live="polite">
          {season === 'dry' ? (
            <p>
              <strong>May to early October.</strong> Rain is uncommon during the
              dry season. Pacific air moderates temperatures, and coastal fog
              can reach San Luis Obispo overnight and into the morning. Clear
              afternoons can feel quite different from the start of the day.
            </p>
          ) : (
            <p>
              <strong>Late October through April.</strong> Most rain arrives
              with Pacific storms, especially in winter. Rainfall varies
              considerably from year to year. Wet ground and runoff change
              conditions along the paths and creek, even when the weather has
              cleared.
            </p>
          )}
        </SeasonText>
      </Climate>
      <figcaption>
        Typical regional patterns for San Luis Obispo. Sources:{' '}
        <a href="https://www.weather.gov/media/wrh/online_publications/TMs/TM-223.pdf">
          National Weather Service climate study
        </a>{' '}
        and{' '}
        <a href="https://afd.calpoly.edu/sustainability/campus-action/water/water-sources">
          Cal Poly’s water resources overview
        </a>
        .
      </figcaption>
    </ClimateFigure>
  );
}

export default function AboutPage() {
  return (
    <Page>
      <Introduction>
        <div>
          <h1>About Poly Canyon</h1>
          <p>
            Poly Canyon is an area of hills and trails northeast of Cal Poly’s
            campus. Within it, a{' '}
            <a href="https://caed.calpoly.edu/content/facilities/poly-canyon">
              nine-acre outdoor construction laboratory
            </a>{' '}
            contains bridges, towers, houses, and other structures designed and
            built by students.
          </p>
          <p>
            Known today as the Architecture Graveyard, the canyon took shape as
            a place for students to try new ideas. Beginning in the 1960s, they
            brought designs out of the classroom and built them here at full
            scale, experimenting with materials, forms, and ways of building.
          </p>
          <Location
            href="https://www.google.com/maps/search/?api=1&query=Poly+Canyon+Architecture+Graveyard+San+Luis+Obispo"
            target="_blank"
            rel="noopener noreferrer"
          >
            San Luis Obispo, California ↗
          </Location>
        </div>
        <figure>
          <img
            src={dome}
            alt="The open steel framework of the Geodesic Dome on a grassy slope in Poly Canyon"
            width="600"
            height="400"
            decoding="async"
          />
          <figcaption>
            The <Link to="/structures/geodesicDome">Geodesic Dome</Link>, one of
            the experimental structures in the canyon.
          </figcaption>
        </figure>
      </Introduction>
      <Text>
        <section id="history">
          <h2>An outdoor construction laboratory</h2>
          <p>
            George Hasslein, the first dean of Cal Poly’s College of
            Architecture and Environmental Design, supported the canyon as a
            place for large experimental projects. Students could take a design
            through calculations, fabrication, and construction, leaving a
            full-size example for later classes to study.
          </p>
          <p>
            The <Link to="/structures/blade">Blade Structure</Link> shows how
            that work has developed over time. First built in 1963 to test a
            method of strengthening concrete with tensioned steel, it was
            reconstructed by another student team in 2003 after the original
            deteriorated. More recent projects include the{' '}
            <Link to="/structures/momentMonument">Moment Monument</Link>, whose
            exposed steel connections help students study earthquake-resistant
            framing.
          </p>
          <p id="stewardship">
            An outdoor site also needs ongoing care. Resident student caretakers
            historically maintained the grounds, and the student-led Canyon Days
            Committee formed in 2014 to address deterioration and vandalism. The
            canyon also hosts Design Village, a competition in which students
            build temporary shelters and inhabit them for a weekend.
          </p>
          <Reference>
            Read more:{' '}
            <a href="https://polycanyon.calpoly.edu/history">
              Cal Poly’s structure history
            </a>
            ,{' '}
            <a href="https://polycanyon.calpoly.edu/history/blade-structure">
              the Blade reconstruction
            </a>
            ,{' '}
            <a href="https://digitalcommons.calpoly.edu/arcesp/208/">
              the Moment Monument project report
            </a>
            , and{' '}
            <a href="https://caed.calpoly.edu/about-canyon-days-committee">
              Canyon Days
            </a>
            .
          </Reference>
        </section>
        <section id="landscape">
          <h2>The landscape around the structures</h2>
          <p>
            The construction site occupies only a small part of the wider
            canyon. Brizzolara Creek runs through the valley, with grasslands,
            oak-covered slopes, and streamside vegetation around it. Rocky
            ridges support different plant communities from the wetter ground
            below.
          </p>
          <p>
            Those differences have a geological basis. Cal Poly’s{' '}
            <a href="https://polyland.net/overview/Archives/derome/geology.html">
              Poly Land field guide
            </a>{' '}
            describes serpentinite along the ridge east of Poly Canyon Road,
            sandstone and shale elsewhere in the valley, and the changes in
            vegetation across them. The exposed rock, creek, and seasonal
            weather are part of the setting in which the structures were built
            and have aged.
          </p>
          <SeasonalClimate />
        </section>
        <Project id="project">
          <h2>About the app and website</h2>
          <p>
            This project began with a map. After visiting Poly Canyon as a Cal
            Poly student, Parker Jones found that existing maps had misplaced
            labels and poorly scaled paths. He traced paths and structures from
            aerial photography, then{' '}
            <a href="https://caed.calpoly.edu/student-developed-app-revolutionizes-poly-canyon-experience">
              developed the app
            </a>{' '}
            to make that map available to other visitors.
          </p>
          <p>
            Research into the structures followed, with help from Kennedy
            Library and students in the College of Architecture and
            Environmental Design. The website brings together structure
            descriptions, historical photographs, and links to original project
            reports. The app provides a map for exploring on foot; the website
            offers more room to read through the research and compare past
            projects.
          </p>
          <p>
            The archive draws on original theses, photographs, and university
            records, including resources compiled by Danny Wills’s architecture
            studio and Jesse Vestermark’s library research guide. Source
            documents are linked in the Resources section of individual
            structure pages where available. Records are uneven, and a
            photograph or project report may describe an earlier condition of
            the site.
          </p>
        </Project>
      </Text>
    </Page>
  );
}
