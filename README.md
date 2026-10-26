# DevStudio

DevStudio is a browser-based workspace for building a personal developer brand. It includes a dashboard, a resume editor with a live print preview, a project portfolio, and a contact form that collects responses.

## Project structure

```text
src/
  main.jsx                 Starts the React app
  App.jsx                  Holds shared state and switches between pages
  style.css                Shared app shell and navigation styles
  components/
    Dashboard.jsx          Overview screen
    Dashboard.css
    Resume.jsx             Resume editor and preview
    Resume.css
    AtsChecker.jsx         Live job keyword comparison for a resume
    AtsChecker.css
    Portfolio.jsx          Project list, GitHub import, add/edit, and delete
    Portfolio.css
    Forms.jsx              Contact form and response list
    Forms.css
```

## Concepts used

- **Components and props:** Each screen is its own component. `App.jsx` passes the data and actions that screen needs.
- **State:** `useState` stores the current page, profile details, projects, form title, and form responses.
- **Events and forms:** Button clicks change screens or show the inline project form. The project and contact forms read submitted values with `FormData`.
- **API requests:** Portfolio uses `fetch` and `async/await` to request public GitHub repositories. It shows a loading message and a simple error when the request fails.
- **Live job API:** The resume keyword checker loads real frontend job listings from Arbeitnow. It compares a selected job's keywords with the resume and selected projects in the browser. This is a simple keyword match, not an official ATS score.
- **Local storage:** The resume checker saves up to 20 fetched job listings in the browser with `localStorage` and reads them back after refresh with `JSON.parse`. Resume, project, and form edits still reset to the sample data after refresh.
- **Lists and basic array methods:** `map` displays projects, responses, and form fields. `filter` removes projects and form fields. `forEach` updates form fields.
- **Temporary state:** `useState` holds edits while the app is open. Refreshing the page restores the starting content.
- **Responsive CSS:** Media queries adjust the layout for smaller screens.

## Viva explanation

The app starts in `main.jsx`, which renders `App`. `App.jsx` stores the shared profile, projects, and responses, then displays the selected screen. Each screen has its own component and CSS file. React state updates the page when information changes. These changes last while the app is open; refreshing restores the starting content. The dashboard can also restore the sample content without a refresh. The Forms screen uses a list of fields; Add a field adds to the list, and Delete removes one. The Portfolio screen uses a simple inline form to add or edit projects, shows the full project description below the cards, and can load public repositories from GitHub with an API request. The resume preview updates as the user types, and the browser print dialog can save it as a PDF. Resume and Portfolio each have selectable layout templates.

To demonstrate the resume checker, open Resume, choose **Load live jobs**, select a role, and choose **Check my resume**. The checker needs an internet connection. Arbeitnow is linked as the job source.

To run locally, use `npm run dev`.
