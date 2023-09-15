import './Info.css';

function Info() {
  return (
    <main>
      <div id="about-section" className="main-section">
        <h1>Welcome!</h1>
        <div className="border-left-gradient">
          <p>
            I am a second year student at the University of Ottawa that has
            always been interested in technology. I started programming in the
            9th grade with game development and moved onto Java and Python where
            I developed a deep passion for coding.
          </p>
          <p>
            {' '}
            After continuing to learn for many years I participated in events
            such as the Waterloo Computing Contest, and the Engineering Idol,
            where I built a water filter for indigenous communities using
            Arduino.
          </p>
          <p>
            Feel free to contact me at{' '}
            <a href="mailto:contact@vasiltopalovic.com">
              {' '}
              contact@vasiltopalovic.com
            </a>
            .
          </p>
        </div>
      </div>

      <div id="projects-section" class="main-section">
        <h3>Projects</h3>

        <div className="border-left-gradient">
          <ul>
            <li>
              <a href="https://github.com/vasiltop/post-board-frontend">
                {' '}
                Post Board{' '}
              </a>
            </li>
            <li>
              <a href="https://github.com/healthhunt/healthhunt">
                {' '}
                HealthHunt{' '}
              </a>
            </li>
            <li>
              <a href="https://github.com/vasiltop/pathfinding-visualizer">
                {' '}
                Pathfinding Visualizer{' '}
              </a>
            </li>
            <li>
              <a href="https://github.com/vasiltop/raycasting-engine">
                {' '}
                Raycasting Engine{' '}
              </a>
            </li>
            <li>
              <a href="https://github.com/vasiltop/personal-website">
                {' '}
                Personal Website{' '}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}

export default Info;
