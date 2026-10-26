import './Dashboard.css';

export default function Dashboard({
  profile,
  projects,
  responses,
  setActive,
  theme,
  setTheme,
  resetWorkspace,
}) {
  return (
    <>
      <section className="welcome-row">
        <div>
          <div className="eyebrow">
            YOUR CREATIVE WORKSPACE
          </div>
          <h1>
            Good morning, {profile.name.split(' ')[0]}
          </h1>
          <p className="intro">
            Your personal workspace for building a clear, professional online presence.
          </p>
        </div>
      </section>

      <section className="hero-card">
        <div className="hero-copy">
          <div className="hero-kicker">
            WHAT IS DEVSTUDIO?
          </div>
          <h2>
            Build your
            <br />
            professional <em>presence.</em>
          </h2>
          <p>
            DevStudio brings your resume, project portfolio, and response
            collecting contact form together in one simple dashboard. Create
            each section, review it as you work, and keep your information in one place.
          </p>
          <button
            className="button button-dark"
            onClick={() => setActive('Resume')}
          >
            Start with your resume
          </button>
          <div className="hero-note">Use the sections below to continue building your workspace.</div>
        </div>

      </section>

      <section className="section-heading">
        <div>
          <div className="eyebrow">THREE TOOLS, ONE WORKSPACE</div>
          <h2>What you can do</h2>
        </div>
        <span className="section-caption">
          Choose a section to get started or make an update.
        </span>
      </section>

      <section className="workspace-grid">
        <article className="workspace-card resume-card">
          <div className="card-top">
            <span className="status-pill">
              STEP 1
            </span>
          </div>
          <h3>Your resume</h3>
          <p>
            Tell your story with a polished, print-ready resume that feels like
            you.
          </p>
          <div className="progress-label">
            <span>Update your details and experience</span>
          </div>
          <button className="text-link" onClick={() => setActive('Resume')}>
            Continue editing
          </button>
        </article>

        <article className="workspace-card portfolio-card">
          <div className="card-top">
            <span className="status-pill ready">
              STEP 2
            </span>
          </div>
          <h3>Your portfolio</h3>
          <p>A little collection of the things you’ve made and the way you think.</p>
          <div className="mini-projects">
            <span>{projects.length} projects in your portfolio</span>
          </div>
          <button className="text-link" onClick={() => setActive('Portfolio')}>
            Explore projects
          </button>
        </article>

        <article className="workspace-card forms-card">
          <div className="card-top">
            <span className="status-pill">
              STEP 3
            </span>
          </div>
          <h3>Your contact form</h3>
          <p>Make it easy for the right people to find their way to you.</p>
          <div className="response-row">
            <span>
              <b>{responses.length}</b> collected responses
            </span>
          </div>
          <button className="text-link" onClick={() => setActive('Forms')}>
            Manage your form
          </button>
        </article>
      </section>

      <section className="dashboard-info-section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">A SIMPLE WORKFLOW</div>
            <h2>How to use DevStudio</h2>
          </div>
          <span className="section-caption">Build each part at your own pace.</span>
        </div>

        <div className="workflow-list">
          <article>
            <span>1</span>
            <div>
              <h3>Write your resume</h3>
              <p>Add your contact details, headline, skills, and experience. The preview updates as you type.</p>
            </div>
          </article>
          <article>
            <span>2</span>
            <div>
              <h3>Choose your projects</h3>
              <p>Add projects to your portfolio and choose which ones appear on your resume.</p>
            </div>
          </article>
          <article>
            <span>3</span>
            <div>
              <h3>Set up your contact form</h3>
              <p>Add questions and choose what kind of answer each question should collect.</p>
            </div>
          </article>
          <article>
            <span>4</span>
            <div>
              <h3>Review and print</h3>
              <p>Check your resume preview and use the browser print option to save it as a PDF.</p>
            </div>
          </article>
        </div>
      </section>

      <section className="dashboard-info-section workspace-summary">
        <div className="section-heading">
          <div>
            <div className="eyebrow">YOUR CURRENT CONTENT</div>
            <h2>Workspace at a glance</h2>
          </div>
        </div>
        <div className="summary-grid">
          <article>
            <h3>Portfolio projects</h3>
            <p>You currently have {projects.length} projects listed.</p>
            <button className="text-link" onClick={() => setActive('Portfolio')}>
              Open portfolio
            </button>
          </article>
          <article>
            <h3>Form responses</h3>
            <p>You have collected {responses.length} responses during this visit.</p>
            <button className="text-link" onClick={() => setActive('Forms')}>
              Open forms
            </button>
          </article>
          <article>
            <h3>Changes reset on refresh</h3>
            <p>Your edits stay while the page is open. Refreshing starts the workspace with its example content.</p>
            <button className="text-link" onClick={resetWorkspace}>
              Restore sample data now
            </button>
          </article>
        </div>
      </section>

      <section className="dashboard-info-section theme-section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">PERSONALIZE YOUR WORKSPACE</div>
            <h2>Choose a theme</h2>
          </div>
          <span className="section-caption">
            Change the colors to suit your style.
          </span>
        </div>
        <div className="theme-options">
          <button
            className={`theme-option sage-option ${theme === 'sage' ? 'selected' : ''}`}
            type="button"
            onClick={() => setTheme('sage')}
            aria-pressed={theme === 'sage'}
          >
            Sage
          </button>
          <button
            className={`theme-option ocean-option ${theme === 'ocean' ? 'selected' : ''}`}
            type="button"
            onClick={() => setTheme('ocean')}
            aria-pressed={theme === 'ocean'}
          >
            Ocean
          </button>
          <button
            className={`theme-option rose-option ${theme === 'rose' ? 'selected' : ''}`}
            type="button"
            onClick={() => setTheme('rose')}
            aria-pressed={theme === 'rose'}
          >
            Rose
          </button>
        </div>
      </section>

    </>
  );
}
