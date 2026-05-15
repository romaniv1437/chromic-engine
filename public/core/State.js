const parseStoredValue = (storage, key) => {
  if (!storage || !key) {
    return null;
  }

  try {
    const raw = storage.getItem(key);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch (_error) {
    return null;
  }
};

export const createStateStore = (initialState = {}) => {
  let snapshot = Object.freeze({ ...initialState });
  const listeners = new Set();

  const getState = () => snapshot;

  const setState = (updater) => {
    const previous = snapshot;
    const nextPatch = typeof updater === 'function' ? updater(previous) : updater;

    if (!nextPatch || typeof nextPatch !== 'object') {
      return snapshot;
    }

    const next = Object.freeze({
      ...previous,
      ...nextPatch,
    });

    snapshot = next;
    listeners.forEach((listener) => listener(next, previous));
    return snapshot;
  };

  const patch = (partial) => setState(partial);

  const save = ({
    storage = globalThis?.localStorage,
    key = 'chromic_state',
    select = (state) => state,
  } = {}) => {
    if (!storage || !key) {
      return null;
    }

    try {
      const payload = select(snapshot);
      if (!payload || typeof payload !== 'object') {
        return null;
      }
      storage.setItem(key, JSON.stringify(payload));
      return payload;
    } catch (_error) {
      return null;
    }
  };

  const load = ({
    storage = globalThis?.localStorage,
    key = 'chromic_state',
  } = {}) => {
    const parsed = parseStoredValue(storage, key);
    if (!parsed) {
      return snapshot;
    }

    return setState(parsed);
  };

  const subscribe = (listener) => {
    if (typeof listener !== 'function') {
      return () => {};
    }

    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  return {
    getState,
    setState,
    patch,
    save,
    load,
    subscribe,
  };
};
