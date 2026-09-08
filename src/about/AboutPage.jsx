import React from 'react';
import MapEmbed from '../components/MapEmbed.jsx';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import dome from '../assets/generated/info/a1.webp';
import { steps } from '../info/directions.js';
const Page = styled.article`
  width: min(1120px, 100%);
  margin: 0 auto;
  padding: 52px 32px 88px;
  box-sizing: border-box;
  color: #354139;
  h1,
  h2,
  h3 {
    color: #164b3b;
    font-weight: 600;
    letter-spacing: -0.035em;
  }
  h1 {
    margin: 0 0 24px;
    font-size: clamp(32px, 4vw, 46px);
    line-height: 1.12;
  }
  h2 {
    margin: 0 0 22px;
    font-size: 28px;
    line-height: 1.2;
  }
  h3 {
    margin: 0 0 12px;
    font-size: 17px;
    letter-spacing: -0.015em;
  }
  p {
    margin: 0 0 22px;
    font-size: 16px;
    line-height: 1.85;
  }
  a {
    color: #164b3b;
    text-decoration-thickness: 1px;
    text-underline-offset: 4px;
  }
  a:hover {
    text-decoration-thickness: 2px;
  }
  a:focus-visible,
  button:focus-visible {
    outline: 2px solid #926b1c;
    outline-offset: 5px;
  }
  section,
  [id] {
    scroll-margin-top: 100px;
  }
  @media (max-width: 600px) {
    padding: 30px 20px 56px;
    h2 {
      font-size: 25px;
    }
  }
`;
const Introduction = styled.header`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 52px;
  align-items: center;
  padding-bottom: 48px;
  border-bottom: 1px solid #dce2da;
  figure {
    margin: 0;
  }
  img {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 1.08;
    object-fit: cover;
  }
  figcaption {
    margin-top: 12px;
    color: #667267;
    font-size: 12px;
    line-height: 1.6;
  }
  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    gap: 24px;
    padding-bottom: 32px;
    img {
      aspect-ratio: 1.5;
    }
  }
`;
const Location = styled.a`
  display: inline-block;
  font-size: 13px;
  padding: 6px 0;
`;
const Body = styled.div`
  display: grid;
  grid-template-columns: 190px minmax(0, 1fr);
  gap: 64px;
  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    gap: 0;
  }
`;
const Contents = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  position: sticky;
  top: 112px;
  align-self: start;
  padding-top: 44px;
  a {
    display: inline-flex;
    min-height: 32px;
    align-items: center;
    font-size: 13px;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
  @media (max-width: 760px) {
    position: static;
    padding-top: 20px;
    flex-direction: row;
    gap: 4px 20px;
    flex-wrap: wrap;
  }
`;
const Text = styled.div`
  min-width: 0;
  section {
    padding-top: 44px;
  }
`;
const Reference = styled.p`
  && {
    font-size: 12px;
    line-height: 1.75;
    color: #667267;
  }
`;
const ClimateFigure = styled.figure`
  margin: 30px 0 0;
  figcaption {
    margin-top: 16px;
    color: #667267;
    font-size: 12px;
    line-height: 1.75;
  }
`;
const Climate = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
  border-top: 1px solid #dce2da;
  border-bottom: 1px solid #dce2da;
  padding: 24px 0;
  p {
    font-size: 14px;
    line-height: 1.8;
    margin: 0;
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 22px;
  }
`;
const Project = styled.section`
  margin-top: 40px;
  border-top: 1px solid #dce2da;
`;
const Directions = styled.ol`
  margin: 24px 0;
  padding-left: 24px;
  li {
    padding: 0 0 12px 8px;
    font-size: 15px;
    line-height: 1.7;
  }
  li::marker {
    color: #926b1c;
    font-variant-numeric: tabular-nums;
  }
`;
const Map = styled.div`
  margin: 12px 0 28px;
`;
function VisitMap() {
  return (
    <Map>
      <MapEmbed
        latitude={35.31344}
        longitude={-120.65192}
        title="Entry Arch destination map"
        height={300}
        directions
      />
    </Map>
  );
}
function SeasonalClimate() {
  return (
    <ClimateFigure>
      <Climate>
        <div>
          <h3>May – early October</h3>
          <p>
            Rain is uncommon during the dry season. Pacific air moderates
            temperatures, and coastal fog can reach San Luis Obispo overnight
            and into the morning. Clear afternoons can feel quite different from
            the start of the day.
          </p>
        </div>
        <div>
          <h3>Late October – April</h3>
          <p>
            Most rain arrives with Pacific storms, especially in winter.
            Rainfall varies considerably from year to year. Wet ground and
            runoff change conditions along the paths and creek, even when the
            weather has cleared.
          </p>
        </div>
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
            alt="The open framework of the Geodesic Dome on a grassy slope in Poly Canyon"
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
      <Body>
        <Contents aria-label="On this page">
          <a href="#history">History</a>
          <a href="#landscape">Landscape</a>
          <a href="#visit">Visiting</a>
          <a href="#project">The archive</a>
        </Contents>
        <Text>
          <section id="history">
            <h2>An outdoor construction laboratory</h2>
            <p>
              George Hasslein, the first dean of Cal Poly’s College of
              Architecture and Environmental Design, supported the canyon as a
              place for large experimental projects. Students could take a
              design through calculations, fabrication, and construction,
              leaving a full-size example for later classes to study.
            </p>
            <p>
              The <Link to="/structures/blade">Blade Structure</Link> shows how
              that work has developed over time. First built in 1963 to test a
              method of strengthening concrete with tensioned steel, it was
              reconstructed by another student team in 2003 after the original
              deteriorated. More recent projects include the{' '}
              <Link to="/structures/momentMonument">Moment Monument</Link>,
              whose exposed steel connections help students study
              earthquake-resistant framing.
            </p>
            <p id="stewardship">
              An outdoor site also needs ongoing care. Resident student
              caretakers historically maintained the grounds, and the
              student-led Canyon Days Committee formed in 2014 to address
              deterioration and vandalism. The canyon also hosts Design Village,
              a competition in which students build temporary shelters and
              inhabit them for a weekend.
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
          <section id="visit">
            <h2>Visiting the canyon</h2>
            <p>
              Walk along Poly Canyon Road from campus. The route to the
              structures takes about 20 minutes, with uneven ground around the
              projects.
            </p>
            <Directions>
              {steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </Directions>
            <VisitMap />
            <p>
              Bring water and wear hiking shoes. Visit in daylight, watch for
              wildlife and horses, and give them space. Summer afternoons can be
              hot; paths can be muddy after rain. Cell service can be spotty, so
              download the <Link to="/app">app</Link> before your visit.
            </p>
            <Reference>
              <a
                href="https://www.alltrails.com/trail/us/california/architecture-graveyard-hike-private-property?sh=rvw6ps"
                target="_blank"
                rel="noopener noreferrer"
              >
                Trail information on AllTrails ↗
              </a>
            </Reference>
          </section>
          <Project id="project">
            <h2>About this archive</h2>
            <p>
              This project began with a map. After visiting Poly Canyon as a Cal
              Poly student, Parker Jones found that existing maps had misplaced
              labels and poorly scaled paths. He traced paths and structures
              from aerial photography, then{' '}
              <a href="https://caed.calpoly.edu/student-developed-app-revolutionizes-poly-canyon-experience">
                developed the app
              </a>{' '}
              to make that map available to other visitors.
            </p>
            <p>
              Research into the structures followed, with help from Kennedy
              Library and students in the College of Architecture and
              Environmental Design. The website brings together structure
              descriptions, historical photographs, and links to original
              project reports. The app provides a map for exploring on foot; the
              website offers more room to read through the research and compare
              past projects.
            </p>
            <p>
              The archive draws on original theses, photographs, and university
              records, including resources compiled by Danny Wills’s
              architecture studio and Jesse Vestermark’s library research guide.
              Source documents are linked in the Resources section of individual
              structure pages where available. Records are uneven, and a
              photograph or project report may describe an earlier condition of
              the site.
            </p>
            <p>
              <Link to="/support">Contact &amp; corrections</Link> ·{' '}
              <Link to="/privacy">Privacy</Link>
            </p>
          </Project>
        </Text>
      </Body>
    </Page>
  );
}
