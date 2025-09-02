

## TODO — Single-Tab-Per-Project

🚀 **[Live Demo](https://todo-seven-plum-85.vercel.app/)**

A single-page TODO application built with React.js.
Each browser tab is a separate project (identified by ?pid=<id> in the URL).
Everything is stored on the front-end (no backend) in localStorage. Projects can be exported/imported as JSON.

### Features

* Every browser tab = a separate project (no in-tab project switching).

* Editable project name (used as document.title).

* Add / delete tasks.

* Mark task as done / not done.

* Persistent storage across reloads (stored in localStorage).

* Import / export a project (JSON).

* Recursive subtasks (infinite depth).

* Filter/search tasks (filter is persisted).

* Edit task title after creation (double-click or edit button).

### How the project-per-tab works

When you first open the app, it generates a random project id pid and appends it to the URL as ?pid=<id>.

Open a new tab (navigate to the same app URL) — a new pid is generated, so that tab has its own independent project.

If you want to share or move a project, use Export to download a JSON file and Import it in another tab.


### JSON import/export format

```
{
  "pid": "abcd-1234-...",
  "title": "Project Title",
  "tasks": [
    {
      "id": "task-id",
      "title": "Task name",
      "done": false,
      "subtasks": [
        {
          "id": "subtask-id",
          "title": "Subtask",
          "done": true,
          "subtasks": []
        }
      ]
    }
  ],
  "filter": "",               // optional, saved filter string
  "version": 1,
  "createdAt": 1690000000000,
  "updatedAt": 1690000000000
}
```

