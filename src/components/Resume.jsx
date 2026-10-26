import './Resume.css';
import AtsChecker from './AtsChecker.jsx';

function PageHeading({ eyebrow, title, description }) {
  return (
    <section className="page-heading">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  );
}

function ResumeSection({ title, children }) {
  return (
    <section className="resume-section">
      <h3>{title}</h3>
      {children}
    </section>
  );
}

export default function Resume({
  profile,
  setField,
  projects,
  featuredProjects,
  setFeaturedProjects,
  template,
  setTemplate,
}) {
  function toggleProject(projectTitle) {
    if (featuredProjects.includes(projectTitle)) {
      setFeaturedProjects(
        featuredProjects.filter((title) => title !== projectTitle),
      );
    } else {
      setFeaturedProjects([...featuredProjects, projectTitle]);
    }
  }

  return (
    <>
      <PageHeading
        eyebrow="YOUR STORY, WELL TOLD"
        title="Resume studio"
        description="A few details, a polished first impression. Edit on the left and see your resume take shape."
      />

      <label className="resume-template-picker">
        Resume template
        <select
          value={template}
          onChange={(event) => setTemplate(event.target.value)}
        >
          <option value="classic">Classic</option>
          <option value="simple">Simple</option>
          <option value="compact">Compact</option>
          <option value="modern">Modern</option>
        </select>
      </label>

      <div className={`resume-layout resume-template-${template}`}>
        <section className="editor-panel">
          <div className="panel-heading">
            <div>
              <h3>About you</h3>
              <p>Your story starts here.</p>
            </div>
            <span className="autosave">Profile details</span>
          </div>

          <label>
            Full name
            <input
              value={profile.name}
              onChange={(event) => setField('name', event.target.value)}
              placeholder="Your name"
            />
          </label>
          <label>
            Professional headline
            <input
              value={profile.role}
              onChange={(event) => setField('role', event.target.value)}
              placeholder="e.g. Frontend developer"
            />
          </label>
          <div className="field-row">
            <label>
              Email address
              <input
                type="email"
                value={profile.email}
                onChange={(event) => setField('email', event.target.value)}
              />
            </label>
            <label>
              Location
              <input
                value={profile.location}
                onChange={(event) => setField('location', event.target.value)}
              />
            </label>
          </div>
          <label>
            A little about you
            <textarea
              rows="4"
              value={profile.about}
              onChange={(event) => setField('about', event.target.value)}
            />
          </label>
          <label>
            Skills <small>Separate with commas</small>
            <input
              value={profile.skills}
              onChange={(event) => setField('skills', event.target.value)}
            />
          </label>

          <label>
            Experience
            <textarea
              rows="3"
              value={profile.experience || ''}
              onChange={(event) => setField('experience', event.target.value)}
              placeholder="Role, company, and a short description"
            />
          </label>

          <fieldset className="resume-project-select">
            <legend>Projects to show</legend>
            {projects.map((project) => (
              <label key={project.title}>
                <input
                  type="checkbox"
                  checked={featuredProjects.includes(project.title)}
                  onChange={() => toggleProject(project.title)}
                />
                {project.title}
              </label>
            ))}
          </fieldset>

          <div className="experience-box">
            <div>
              <b>Resume preview</b>
              <p>Changes appear in the preview as you edit.</p>
            </div>
          </div>
          <button
            className="button button-dark full-button"
            onClick={() => window.print()}
          >
            Print or save as PDF
          </button>
        </section>

        <section className="preview-panel">
          <div className="preview-toolbar">
            <span>
              LIVE PREVIEW
            </span>
            <button onClick={() => window.print()}>Print</button>
          </div>

          <article className="resume-paper">
            <div className="resume-accent"></div>
            <div className="resume-paper-inner">
              <header className="resume-header">
                <div className="resume-pretitle">PERSONAL PROFILE</div>
                <h2>{profile.name || 'Your Name'}</h2>
                <div className="resume-role">
                  {profile.role || 'Your professional headline'}
                </div>
                <div className="resume-contact">
                  {profile.email} <span>,</span> {profile.location}
                </div>
              </header>
              <div className="resume-divider"></div>

              <ResumeSection title="A LITTLE ABOUT ME">
                <p>{profile.about}</p>
              </ResumeSection>
              <ResumeSection title="EXPERIENCE">
                <p>{profile.experience}</p>
              </ResumeSection>
              <ResumeSection title="SKILLS">
                <div className="skill-tags">
                  {profile.skills.split(',').map((skill) => (
                    <span key={skill}>{skill.trim()}</span>
                  ))}
                </div>
              </ResumeSection>
              <ResumeSection title="SELECTED WORK">
                <div className="resume-work-list">
                  {projects
                    .filter((project) =>
                      featuredProjects.includes(project.title),
                    )
                    .map((project) => (
                      <div key={project.title}>
                        <b>{project.title}</b>
                        <p>{project.description}</p>
                      </div>
                    ))}
                </div>
              </ResumeSection>
              <div className="resume-footer">
                Resume for {profile.name}
              </div>
            </div>
          </article>
        </section>
      </div>

      <AtsChecker
        profile={profile}
        projects={projects}
        featuredProjects={featuredProjects}
      />
    </>
  );
}
