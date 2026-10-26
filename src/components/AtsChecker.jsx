import { useState } from 'react';
import './AtsChecker.css';

const jobApiUrl = 'https://www.arbeitnow.com/api/job-board-api';
const savedJobsKey = 'devstudio-saved-jobs';

function getSavedJobs() {
  try {
    const savedJobs = localStorage.getItem(savedJobsKey);

    if (savedJobs) {
      const parsedJobs = JSON.parse(savedJobs);
      return Array.isArray(parsedJobs) ? parsedJobs : [];
    }
  } catch {
    return [];
  }

  return [];
}

const keywordsToCheck = [
  'React',
  'JavaScript',
  'TypeScript',
  'HTML',
  'CSS',
  'Git',
  'REST API',
  'responsive design',
  'accessibility',
  'testing',
  'Node.js',
  'Redux',
  'teamwork',
];

export default function AtsChecker({
  profile,
  projects,
  featuredProjects,
}) {
  const [jobs, setJobs] = useState(getSavedJobs);
  const [showingSavedJobs, setShowingSavedJobs] = useState(
    () => getSavedJobs().length > 0,
  );
  const [selectedJobId, setSelectedJobId] = useState(
    () => getSavedJobs()[0]?.slug || '',
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [checked, setChecked] = useState(false);

  const selectedJob = jobs.find((job) => job.slug === selectedJobId);

  async function loadJobs() {
    setLoading(true);
    setError('');
    setChecked(false);

    try {
      const response = await fetch(jobApiUrl);

      if (!response.ok) {
        throw new Error('The jobs service could not be reached.');
      }

      const result = await response.json();
      const frontendJobs = (result.data || []).filter((job) => {
        const title = job.title.toLowerCase();
        const tags = (job.tags || []).join(' ').toLowerCase();

        return (
          title.includes('frontend') ||
          title.includes('front-end') ||
          title.includes('react') ||
          tags.includes('frontend') ||
          tags.includes('javascript')
        );
      }).slice(0, 20);

      setJobs(frontendJobs);
      try {
        localStorage.setItem(savedJobsKey, JSON.stringify(frontendJobs));
      } catch {
        // The live results still work if this browser cannot save them.
      }
      setShowingSavedJobs(false);

      if (frontendJobs.length > 0) {
        setSelectedJobId(frontendJobs[0].slug);
      } else {
        setSelectedJobId('');
        setError('No frontend jobs were found. Try loading again later.');
      }
    } catch {
      setError('Could not load live jobs. Check your internet and try again.');
      setJobs([]);
      setSelectedJobId('');
    }

    setLoading(false);
  }

  const resumeText = [
    profile.name,
    profile.role,
    profile.about,
    profile.skills,
    profile.experience,
    projects
      .filter((project) => featuredProjects.includes(project.title))
      .map((project) =>
        `${project.title} ${project.description} ${(project.tags || []).join(' ')}`,
      )
      .join(' '),
  ]
    .join(' ')
    .toLowerCase();

  const jobText = selectedJob
    ? `${selectedJob.title} ${selectedJob.description} ${(selectedJob.tags || []).join(' ')}`
        .toLowerCase()
    : '';
  const jobKeywords = keywordsToCheck.filter((word) =>
    jobText.includes(word.toLowerCase()),
  );
  const matchingKeywords = jobKeywords.filter((word) =>
    resumeText.includes(word.toLowerCase()),
  );
  const missingKeywords = jobKeywords.filter(
    (word) => !resumeText.includes(word.toLowerCase()),
  );
  const matchPercent = jobKeywords.length
    ? Math.round((matchingKeywords.length / jobKeywords.length) * 100)
    : 0;

  return (
    <section className="ats-checker">
      <div className="ats-checker-heading">
        <div>
          <h3>Basic ATS keyword check</h3>
          <p>
            Load a real frontend job and compare its keywords with your resume
            and selected projects.
          </p>
        </div>
        <button
          className="button button-dark"
          onClick={loadJobs}
          disabled={loading}
        >
          {loading ? 'Loading jobs...' : 'Load live jobs'}
        </button>
      </div>

      {error && <p className="ats-message">{error}</p>}

      {showingSavedJobs && jobs.length > 0 && (
        <p className="ats-message">
          Showing job listings saved in this browser. Choose Load live jobs to
          refresh them.
        </p>
      )}

      {jobs.length > 0 && (
        <>
          <label className="ats-job-picker">
            Choose a job
            <select
              value={selectedJobId}
              onChange={(event) => {
                setSelectedJobId(event.target.value);
                setChecked(false);
              }}
            >
              {jobs.map((job) => (
                <option key={job.slug} value={job.slug}>
                  {job.title} at {job.company_name}
                </option>
              ))}
            </select>
          </label>

          {selectedJob && (
            <div className="ats-job-info">
              <span>{selectedJob.company_name}</span>
              <span>{selectedJob.location || 'Location not listed'}</span>
              <a href={selectedJob.url} target="_blank" rel="noreferrer">
                View job posting
              </a>
            </div>
          )}

          <button
            className="button ats-check-button"
            onClick={() => setChecked(true)}
            disabled={!selectedJob}
          >
            Check my resume
          </button>
        </>
      )}

      {checked && selectedJob && (
        <div className="ats-results" aria-live="polite">
          <h4>Keyword match: {matchPercent}%</h4>
          {jobKeywords.length === 0 ? (
            <p>No familiar development keywords were found in this posting.</p>
          ) : (
            <>
              <p>
                Found {matchingKeywords.length} of {jobKeywords.length} checked
                keywords in your resume and selected projects.
              </p>
              <p>
                <b>Found:</b>{' '}
                {matchingKeywords.length ? matchingKeywords.join(', ') : 'None'}
              </p>
              <p>
                <b>Not found:</b>{' '}
                {missingKeywords.length ? missingKeywords.join(', ') : 'None'}
              </p>
            </>
          )}
          <small>
            This is a basic keyword comparison, not an official ATS score.
          </small>
        </div>
      )}

      <small className="ats-credit">
        Job listings provided by{' '}
        <a href="https://www.arbeitnow.com/" target="_blank" rel="noreferrer">
          Arbeitnow
        </a>
        .
      </small>
    </section>
  );
}
