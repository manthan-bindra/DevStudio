import { useState } from 'react';
import './Forms.css';

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

function ResponseItem({ response }) {
  return (
    <article className="response-item">
      <span className="response-initial">
        {response.name.charAt(0).toUpperCase()}
      </span>
      <div>
        <b>{response.name}</b>
        <a href={`mailto:${response.email}`}>{response.email}</a>
        <p>{response.message}</p>
      </div>
      <time>{response.date}</time>
    </article>
  );
}

export default function Forms({
  profile,
  formTitle,
  setFormTitle,
  responses,
  submitResponse,
  template,
  setTemplate,
}) {
  const [fields, setFields] = useState([
    { id: 1, label: 'Name', type: 'text', required: true },
    { id: 2, label: 'Email address', type: 'email', required: true },
    { id: 3, label: 'What’s on your mind?', type: 'textarea', required: true },
  ]);

  function addField() {
    let nextId = 1;

    fields.forEach((field) => {
      if (field.id >= nextId) {
        nextId = field.id + 1;
      }
    });

    setFields([
      ...fields,
      { id: nextId, label: 'New question', type: 'text', required: false },
    ]);
  }

  function updateField(id, label) {
    const updatedFields = [];

    fields.forEach((field) => {
      if (field.id === id) {
        updatedFields.push({ ...field, label });
      } else {
        updatedFields.push(field);
      }
    });

    setFields(updatedFields);
  }

  function updateFieldType(id, type) {
    const updatedFields = fields.map((field) => {
      if (field.id === id) {
        return { ...field, type };
      }

      return field;
    });

    setFields(updatedFields);
  }

  function deleteField(id) {
    const remainingFields = fields.filter((field) => field.id !== id);
    setFields(remainingFields);
  }

  return (
    <>
      <PageHeading
        eyebrow="MAKE ROOM FOR A HELLO"
        title="Your inbox, with intention."
        description="A simple contact form gives good opportunities a clear path to you."
      />

      <label className="form-template-picker">
        Form template
        <select
          value={template}
          onChange={(event) => setTemplate(event.target.value)}
        >
          <option value="standard">Standard</option>
          <option value="simple">Simple</option>
          <option value="centered">Centered</option>
        </select>
      </label>

      <div className={`forms-layout form-template-${template}`}>
        <section className="form-editor">
          <div className="panel-heading">
            <div>
              <h3>Form settings</h3>
              <p>Make this little corner yours.</p>
            </div>
            <span className="live-label">
              LIVE
            </span>
          </div>

          <label>
            Form headline
            <input
              value={formTitle}
              onChange={(event) => setFormTitle(event.target.value)}
            />
          </label>
          <div className="field-preview-list">
            {fields.map((field) => (
              <div className="editable-form-field" key={field.id}>
                <label>
                  Field label
                  <input
                    value={field.label}
                    onChange={(event) =>
                      updateField(field.id, event.target.value)
                    }
                  />
                </label>
                <label>
                  Answer type
                  <select
                    value={field.type}
                    onChange={(event) =>
                      updateFieldType(field.id, event.target.value)
                    }
                  >
                    <option value="text">Short answer</option>
                    <option value="email">Email address</option>
                    <option value="number">Number</option>
                    <option value="date">Date</option>
                    <option value="textarea">Long answer</option>
                  </select>
                </label>
                <button
                  type="button"
                  onClick={() => deleteField(field.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
          <button type="button" className="add-field" onClick={addField}>
            Add a field
          </button>
          <div className="form-tip">
            <p>
              <b>Keep it welcoming.</b>
              <br />
              A simple form is often the easiest one to fill out.
            </p>
          </div>
        </section>

        <section className="form-preview-wrap">
          <div className="form-preview-bar">
            <span>
              FORM PREVIEW
            </span>
          </div>
          <div className="contact-form-card">
            <div className="eyebrow">
              A NOTE TO {profile.name.split(' ')[0].toUpperCase()}
            </div>
            <h2>{formTitle}</h2>
            <p>
              Have a project in mind, or just want to say hello? I’d love to
              hear from you.
            </p>
            <form onSubmit={submitResponse}>
              {fields.map((field) => (
                <label key={field.id}>
                  {field.label}
                  {field.type === 'textarea' ? (
                    <textarea
                      name={field.id === 3 ? 'message' : `field-${field.id}`}
                      rows="3"
                      required={field.required}
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                    />
                  ) : (
                    <input
                      name={
                        field.id === 1
                          ? 'name'
                          : field.id === 2
                            ? 'email'
                            : `field-${field.id}`
                      }
                      type={field.type}
                      required={field.required}
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                    />
                  )}
                </label>
              ))}
              <button className="button button-dark full-button">
                Send your note
              </button>
              <div className="privacy-note">
                Your message goes straight to {profile.email}.
              </div>
            </form>
          </div>
        </section>
      </div>

      <section className="responses-panel">
        <div className="responses-heading">
          <div>
            <div className="eyebrow">GOOD THINGS COME FROM HELLOS</div>
            <h2>
              Recent responses{' '}
              <span className="response-count">{responses.length}</span>
            </h2>
          </div>
        </div>

        {responses.length === 0 ? (
          <div className="no-responses">
            <div>
              <b>Your next good conversation starts here.</b>
              <p>
                Form responses will show up in this space. Try sending yourself
                a test note above.
              </p>
            </div>
          </div>
        ) : (
          <div className="response-list">
            {responses.map((response, index) => (
              <ResponseItem
                key={`${response.email}-${index}`}
                response={response}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
