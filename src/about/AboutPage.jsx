import React from 'react';
import MapEmbed from '../components/MapEmbed.jsx';
import { steps } from '../info/directions.js';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import dome from '../assets/generated/info/a1.webp';

const Page = styled.article`
  max-width: 1180px;
  margin: 0 auto;
  padding: 58px 40px 80px;
  color: #243f32;
  h1,
  h2 {
    font-family: Georgia, 'Times New Roman', serif;
    font-weight: 400;
  }
  h1 {
    margin: 0 0 24px;
    font-size: clamp(36px, 4.8vw, 60px);
    line-height: 1.08;
    letter-spacing: -1.5px;
  }
  h2 {
    margin: 0 0 24px;
    font-size: clamp(27px, 3vw, 36px);
    line-height: 1.2;
    letter-spacing: -0.5px;
  }
  h3 {
    font-size: 16px;
    font-weight: 600;
    margin: 0 0 10px;
  }
  p,
  li {
    font-size: 17px;
    line-height: 1.8;
  }
  p {
    margin: 0 0 22px;
  }
  a {
    color: inherit;
    text-decoration-color: #a17629;
    text-underline-offset: 4px;
  }
  a:hover {
    text-decoration-thickness: 2px;
  }
  section,
  [id] {
    scroll-margin-top: 110px;
  }
  @media (max-width: 600px) {
    padding: 30px 20px 54px;
    p,
    li {
      font-size: 16px;
    }
  }
`;
const Introduction = styled.header`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  align-items: center;
  padding-bottom: 52px;
  figure {
    margin: 0;
  }
  img {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 3 / 2;
    object-fit: cover;
  }
  figcaption {
    margin-top: 12px;
    color: #626959;
    font-size: 12px;
    line-height: 1.6;
  }
  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    gap: 20px;
    padding-bottom: 30px;
    img {
      aspect-ratio: 3 / 2;
    }
  }
`;
const JumpLinks = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 0 22px;
  margin: -10px 0 20px;
  a {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    font-size: 13px;
  }
`;
const Location = styled.a`
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  font-size: 13px;
`;
const Text = styled.div`
  section {
    display: grid;
    grid-template-columns: 250px minmax(0, 1fr);
    column-gap: 60px;
    border-top: 1px solid #c9cbbc;
    padding: 42px 0 24px;
  }
  section h2 {
    grid-column: 1;
    grid-row: 1 / span 8;
  }
  section > :not(h2) {
    grid-column: 2;
  }
  @media (max-width: 850px) {
    section {
      grid-template-columns: 190px minmax(0, 1fr);
      column-gap: 32px;
    }
  }
  @media (max-width: 640px) {
    section {
      display: block;
      padding-top: 30px;
    }
  }
`;
const Reference = styled.p`
  && {
    font-size: 13px;
    line-height: 1.7;
    color: #626959;
  }
`;
const ClimateFigure = styled.figure`
  margin: 8px 0 22px;
  padding-top: 22px;
  border-top: 1px solid #c9cbbc;
  figcaption {
    margin-top: 14px;
    font-size: 12px;
    line-height: 1.7;
    color: #626959;
  }
`;
const Climate = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  p {
    font-size: 15px;
    line-height: 1.7;
    margin: 0;
  }
  @media (max-width: 460px) {
    grid-template-columns: 1fr;
  }
`;
const Project = styled.section``;
const VisitDetails = styled.div`
  ol {
    padding-left: 24px;
    margin: 0 0 28px;
  }
  li {
    padding-left: 6px;
    margin-bottom: 12px;
  }
  li::marker {
    color: #a17629;
    font-family: Georgia, serif;
  }
  > div {
    border-radius: 0;
  }
  > div > div {
    background: #eceee3;
  }
  button {
    border-radius: 0;
    font: inherit;
  }
  .visit-links {
    display: flex;
    flex-wrap: wrap;
    gap: 12px 28px;
    margin: 14px 0 24px;
  }
  .visit-links a {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    font-size: 14px;
  }
`;
function SeasonalClimate() {
  return (
    <ClimateFigure>
      <Climate>
        <div>
          <h3>May to early October</h3>
          <p>
            Rain is uncommon during the dry season. Pacific air moderates
            temperatures, and coastal fog can reach San Luis Obispo overnight
            and into the morning. Clear afternoons can feel quite different from
            the start of the day.
          </p>
        </div>
        <div>
          <h3>Late October through April</h3>
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
          <JumpLinks aria-label="About sections">
            <a href="#visiting">Visiting</a>
            <a href="#history">History</a>
            <a href="#landscape">Landscape</a>
            <a href="#project">This archive</a>
          </JumpLinks>
          <p>
            Poly Canyon is an area of hills and trails northeast of Cal Poly’s
            campus. Within it, a{' '}
            <a href="https://caed.calpoly.edu/content/facilities/poly-canyon">
              nine-acre outdoor construction laboratory
            </a>{' '}
            contains bridges, towers, houses, and other structures designed and
            built by students.
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
        <section id="visiting">
          <h2>Walking to the canyon</h2>
          <VisitDetails>
            <p>
              Follow Poly Canyon Road from campus. The walk takes about 20
              minutes, with a gentle incline along the road and uneven ground
              around the structures.
            </p>
            <ol>
              {steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <MapEmbed
              latitude={35.31344}
              longitude={-120.65192}
              title="Find the canyon"
              height={260}
              directions
            />
            <div className="visit-links">
              <a
                href="https://www.alltrails.com/trail/us/california/architecture-graveyard-hike-private-property?sh=rvw6ps"
                target="_blank"
                rel="noopener noreferrer"
              >
                Trail on AllTrails ↗
              </a>
              <Link to="/app">The iPhone map →</Link>
            </div>
            <p>
              Visit during daylight. Bring water, wear shoes suited to uneven
              terrain, and give wildlife and horses space. Summer afternoons can
              be hot; paths can be muddy after rain. Download the app before
              walking out, as cell service can be spotty.
            </p>
          </VisitDetails>
        </section>
        <section id="history">
          <h2>An outdoor construction laboratory</h2>
          <p>
            Known today as the Architecture Graveyard, the canyon took shape as
            a place for students to try new ideas. Beginning in the 1960s, they
            brought designs out of the classroom and built them here at full
            scale, experimenting with materials, forms, and ways of building.
          </p>
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
          <h2>About this archive</h2>
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
