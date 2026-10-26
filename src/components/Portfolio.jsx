import { useState } from 'react';
import './Portfolio.css';

function ProjectCard({ project, onSelect }) {
  return (
    <button className="project-card" type="button" onClick={onSelect}>
      <div className="project-details">
        <p className="project-meta">{project.type}</p>
        <h2>{project.title}</h2>
        <p>{project.description}</p>
        <div className="tag-list">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <span>View full description</span>
      </div>
    </button>
  );
}

function ProjectForm({ project, onSubmit, onCancel }) {
  return (
    <form className="add-project-form" onSubmit={onSubmit}>
      <h2>{project ? 'Edit project' : 'Add a project'}</h2>
      <label>
        Project name
        <input
          name="title"
          defaultValue={project ? project.title : ''}
          required
        />
      </label>
      <label>
        Description
        <textarea
          name="description"
          defaultValue={project ? project.description : ''}
          rows="4"
          required
        />
      </label>
      <div className="field-row">
        <label>
          Project type
          <select name="type" defaultValue={project ? project.type : 'Web app'}>
            <option>Web app</option>
            <option>Open source</option>
            <option>GitHub repository</option>
            <option>Design</option>
            <option>Concept</option>
          </select>
        </label>
        <label>
          Skills, separated by commas
          <input
            name="tags"
            defaultValue={project ? project.tags.join(', ') : ''}
            placeholder="React, CSS"
          />
        </label>
      </div>
      <button className="button button-dark" type="submit">
        {project ? 'Save changes' : 'Add project'}
      </button>
      <button className="simple-button" type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}

function ProjectDetails({ project, onDelete, onEdit }) {
  function deleteProject() {
    const shouldDelete = window.confirm('Delete this project?');

    if (shouldDelete) {
      onDelete(project.title);
    }
  }

  return (
    <section className="project-detail-panel">
      <p className="project-meta">{project.type}</p>
      <h2>{project.title}</h2>
      <p>{project.description}</p>
      {project.link && (
        <p>
          <a href={project.link} target="_blank" rel="noreferrer">
            Open repository on GitHub
          </a>
        </p>
      )}
      <button className="simple-button" type="button" onClick={onEdit}>
        Edit project
      </button>
      <button className="simple-button" type="button" onClick={deleteProject}>
        Delete project
      </button>
    </section>
  );
}

function GitHubRepositories({ projects, addGithubProject }) {
  const [username, setUsername] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function loadRepositories(event) {
    event.preventDefault();

    if (!username.trim()) {
      setError('Enter a GitHub username.');
      return;
    }

    setLoading(true);
    setError('');
    setRepositories([]);

    try {
      const response = await fetch(
        `https://api.github.com/users/${encodeURIComponent(username.trim())}/repos?per_page=10&sort=updated`,
        {
          headers: {
            Accept: 'application/vnd.github+json',
          },
        },
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Could not find that GitHub user.');
        }

        if (response.status === 403) {
          throw new Error('GitHub request limit reached. Try again later.');
        }

        throw new Error('GitHub could not load repositories. Try again.');
      }

      const repositoryList = await response.json();
      setRepositories(repositoryList);

      if (repositoryList.length === 0) {
        setError('No public repositories were found.');
      }
    } catch (requestError) {
      if (requestError.message === 'Failed to fetch') {
        setError('Could not connect to GitHub. Check your internet connection.');
      } else {
        setError(requestError.message);
      }
    } finally {
      setLoading(false);
    }
  }

  function addRepository(repository) {
    addGithubProject(repository);
    setRepositories(
      repositories.filter((item) => item.id !== repository.id),
    );
  }

  return (
    <section className="github-import">
      <h2>Load public GitHub projects</h2>
      <p>
        Enter a GitHub username to see up to ten recently updated repositories.
      </p>
      <form onSubmit={loadRepositories}>
        <label>
          GitHub username
          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="For example, octocat"
          />
        </label>
        <button className="button button-dark" type="submit" disabled={loading}>
          {loading ? 'Loading repositories...' : error ? 'Try again' : 'Load repositories'}
        </button>
      </form>

      {loading && <p role="status">Contacting GitHub...</p>}
      {error && <p className="github-message" role="alert">{error}</p>}

      {repositories.map((repository) => {
        const alreadyAdded = projects.some(
          (project) => project.title === repository.name,
        );

        return (
          <div className="github-repository" key={repository.id}>
            <div>
              <h3>{repository.name}</h3>
              <p>{repository.description || 'No description provided.'}</p>
              <small>{repository.language || 'Language not listed'}</small>
            </div>
            <button
              className="simple-button"
              type="button"
              disabled={alreadyAdded}
              onClick={() => addRepository(repository)}
            >
              {alreadyAdded ? 'Already added' : 'Add to portfolio'}
            </button>
          </div>
        );
      })}
    </section>
  );
}

export default function Portfolio({
  projects,
  saveProject,
  deleteProject,
  addGithubProject,
  template,
  setTemplate,
}) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [editingProject, setEditingProject] = useState(null);

  function submitProject(event) {
    saveProject(event, editingProject ? editingProject.title : null);
    setShowAddForm(false);
    setSelectedProject(null);
    setEditingProject(null);
  }

  function startNewProject() {
    setEditingProject(null);
    setShowAddForm(!showAddForm);
  }

  return (
    <>
      <section className="page-heading">
        <div>
          <h1>My projects</h1>
          <p>Projects you have made and want to share.</p>
        </div>
        <button
          className="button button-dark"
          type="button"
          onClick={startNewProject}
        >
          {showAddForm ? 'Close form' : 'Add a project'}
        </button>
      </section>

      {showAddForm && (
        <ProjectForm
          key={editingProject ? editingProject.title : 'new-project'}
          project={editingProject}
          onSubmit={submitProject}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      <label className="portfolio-template-picker">
        Portfolio template
        <select
          value={template}
          onChange={(event) => setTemplate(event.target.value)}
        >
          <option value="cards">Cards</option>
          <option value="list">List</option>
          <option value="compact">Compact</option>
        </select>
      </label>

      <GitHubRepositories
        projects={projects}
        addGithubProject={addGithubProject}
      />

      <p>{projects.length} projects</p>
      <div className={`project-grid portfolio-template-${template}`}>
        {projects.map((project) => (
          <ProjectCard
            key={project.title}
            project={project}
            onSelect={() => setSelectedProject(project)}
          />
        ))}
      </div>

      {selectedProject && (
        <ProjectDetails
          project={selectedProject}
          onEdit={() => {
            setEditingProject(selectedProject);
            setShowAddForm(true);
          }}
          onDelete={(title) => {
            deleteProject(title);
            setSelectedProject(null);
          }}
        />
      )}
    </>
  );
}
