const STORAGE_PREFIX = "todo:project:";

export const getOrCreateProjectIdFromURL = () => {
  const url = new URL(window.location.href);
  let pid = url.searchParams.get("pid");
  if (!pid) {
    pid = crypto.randomUUID();
    url.searchParams.set("pid", pid);
    window.history.replaceState({}, "", url.toString());
  }
  return pid;
};

export const loadProject = (pid) => {
  const raw = localStorage.getItem(STORAGE_PREFIX + pid);
  if (!raw) {
    return {
      title: "New Project",
      tasks: [],
      filter: "",
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
  }
  return JSON.parse(raw);
};

export const saveProject = (pid, data) => {
  localStorage.setItem(
    STORAGE_PREFIX + pid,
    JSON.stringify({ ...data, updatedAt: Date.now() })
  );
};
