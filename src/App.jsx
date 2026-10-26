import { useState } from 'react';
import './style.css';
import Dashboard from './components/Dashboard.jsx';
import Resume from './components/Resume.jsx';
import Portfolio from './components/Portfolio.jsx';
import Forms from './components/Forms.jsx';

const initialProjects = [
  {
    title: 'Lumina — habit tracker',
    type: 'Web app',
    description:
      'Lumina helps people build steady habits with a calm, colorful daily tracker. ' +
      'The project focuses on clear progress, small goals, and making routines easy to revisit.',
    tags: ['React', 'CSS'],
  },
  {
    title: 'Open source contributions',
    type: 'Community',
    description:
      'A collection of practical improvements contributed to open source tools. ' +
      'The work includes fixing interface details, improving documentation, and collaborating with maintainers through GitHub.',
    tags: ['GitHub', 'Open source'],
  },
  {
    title: 'Sonder — travel journal',
    type: 'Concept',
    description:
      'Sonder is a travel journal concept for saving places, notes, and memories from a trip. ' +
      'It is designed to make entries simple to add and enjoyable to look back on.',
    tags: ['Design', 'JavaScript'],
  },
];

const startingProfile = {
  name: 'Alex Morgan',
  role: 'Frontend developer & thoughtful builder',
  email: 'hello@alexmorgan.dev',
  location: 'Brooklyn, NY',
  about:
    'I build useful, human-centered digital experiences. ' +
    'I care about the small details, clean code, and making the web a little more welcoming.',
  skills: 'React, JavaScript, CSS, UI design, Accessibility',
  experience: 'Frontend Developer, Independent\nBuilding accessible, thoughtful digital products.',
};

const navigationItems = [
  { label: 'Overview' },
  { label: 'Resume' },
  { label: 'Portfolio' },
  { label: 'Forms' },
];

export default function App() {
  // Shared app data lives here so every screen can use the same information.
  const [active, setActive] = useState('Overview');
  const [profile, setProfile] = useState(startingProfile);
  const [projects, setProjects] = useState(initialProjects);
  const [featuredProjects, setFeaturedProjects] = useState(
    initialProjects.slice(0, 2).map((project) => project.title),
  );
  const [formTitle, setFormTitle] = useState('Let’s work together');
  const [responses, setResponses] = useState([]);
  const [theme, setTheme] = useState('sage');
  const [resumeTemplate, setResumeTemplate] = useState('classic');
  const [portfolioTemplate, setPortfolioTemplate] = useState('cards');
  const [formTemplate, setFormTemplate] = useState('standard');
  // Update one profile property and keep the other properties as they are.
  function setProfileField(field, value) {
    setProfile((currentProfile) => ({
      ...currentProfile,
      [field]: value,
    }));
  }

  function saveProject(event, projectToEdit) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const skills = formData.get('tags') || '';
    const newProject = {
      title: formData.get('title').trim(),
      type: formData.get('type'),
      description: formData.get('description').trim(),
      tags: skills
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag),
    };

    if (projectToEdit) {
      const updatedProjects = projects.map((project) => {
        if (project.title === projectToEdit) {
          return newProject;
        }

        return project;
      });
      setProjects(updatedProjects);
      if (featuredProjects.includes(projectToEdit)) {
        setFeaturedProjects(
          featuredProjects.map((title) =>
            title === projectToEdit ? newProject.title : title,
          ),
        );
      }
    } else {
      setProjects([newProject, ...projects]);
    }

    form.reset();
  }

  function deleteProject(projectTitle) {
    const remainingProjects = projects.filter(
      (project) => project.title !== projectTitle,
    );
    const remainingFeaturedProjects = featuredProjects.filter(
      (title) => title !== projectTitle,
    );

    setProjects(remainingProjects);
    setFeaturedProjects(remainingFeaturedProjects);
  }

  function addGithubProject(repository) {
    const alreadyAdded = projects.some(
      (project) => project.title === repository.name,
    );

    if (alreadyAdded) {
      return;
    }

    const newProject = {
      title: repository.name,
      type: 'GitHub repository',
      description: repository.description || 'Public GitHub repository',
      tags: repository.language ? [repository.language] : [],
      link: repository.html_url,
    };

    setProjects([newProject, ...projects]);
  }

  function submitResponse(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const newResponse = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      date: new Date().toLocaleDateString(),
    };

    setResponses((currentResponses) => [newResponse, ...currentResponses]);
    event.currentTarget.reset();
  }

  function resetWorkspace() {
    const shouldReset = window.confirm('Restore the original sample data?');

    if (shouldReset) {
      setProfile(startingProfile);
      setProjects(initialProjects);
      setFeaturedProjects(
        initialProjects.slice(0, 2).map((project) => project.title),
      );
      setFormTitle('Let’s work together');
      setResponses([]);
      setTheme('sage');
      setResumeTemplate('classic');
      setPortfolioTemplate('cards');
      setFormTemplate('standard');
    }
  }

  return (
    <div className={`app-shell theme-${theme}`}>
      <aside className="sidebar">
        <a
          className="brand"
          href="#overview"
          onClick={() => setActive('Overview')}
        >
          DevStudio
        </a>
        <div className="workspace-label">WORKSPACE</div>

        <nav aria-label="Main navigation">
          {navigationItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActive(item.label)}
              className={`nav-item ${active === item.label ? 'active' : ''}`}
            >
              {item.label}
              {item.label === 'Forms' && responses.length > 0 && (
                <span className="nav-count">{responses.length}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="profile-switch">
            <span className="profile-meta">
              <strong>{profile.name}</strong>
              <small>Personal workspace</small>
            </span>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb">
            Workspace <span>/</span> <b>{active}</b>
          </div>
        </header>

        <div className="page-wrap">
          {active === 'Overview' && (
            <Dashboard
              profile={profile}
              projects={projects}
              responses={responses}
              setActive={setActive}
              theme={theme}
              setTheme={setTheme}
              resetWorkspace={resetWorkspace}
            />
          )}
          {active === 'Resume' && (
            <Resume
              profile={profile}
              setField={setProfileField}
              projects={projects}
              featuredProjects={featuredProjects}
              setFeaturedProjects={setFeaturedProjects}
              template={resumeTemplate}
              setTemplate={setResumeTemplate}
            />
          )}
          {active === 'Portfolio' && (
            <Portfolio
              projects={projects}
              saveProject={saveProject}
              deleteProject={deleteProject}
              addGithubProject={addGithubProject}
              template={portfolioTemplate}
              setTemplate={setPortfolioTemplate}
            />
          )}
          {active === 'Forms' && (
            <Forms
              profile={profile}
              formTitle={formTitle}
              setFormTitle={setFormTitle}
              responses={responses}
              submitResponse={submitResponse}
              template={formTemplate}
              setTemplate={setFormTemplate}
            />
          )}
        </div>
      </main>

    </div>
  );
}
