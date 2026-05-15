export const uiButton = ({
  id = '',
  label = '',
  text = '',
  variant = 'primary',
  classes = '',
  attrs = '',
} = {}) => {
  const typeClass = variant === 'ghost' ? 'ui-btn ui-btn-ghost' : variant === 'pill' ? 'ui-btn ui-btn-pill' : 'ui-btn';
  const idAttr = id ? ` id="${id}"` : '';
  const labelAttr = label ? ` aria-label="${label}"` : '';
  return `<button type="button"${idAttr} class="${typeClass} ${classes}"${labelAttr} ${attrs}>${text}</button>`;
};

export const uiToggleRow = ({ id, label, checked = false, classes = '' }) => `
  <div class="ui-toggle-group ${classes}">
    <span>${label}</span>
    <label class="chromic-switch" for="${id}">
      <input id="${id}" type="checkbox" ${checked ? 'checked' : ''} />
      <span class="slider"></span>
    </label>
  </div>
`;

export const uiRange = ({ id, label, min, max, step, value, classes = '' }) => `
  <label class="ui-range ${classes}" for="${id}">
    <span>${label}</span>
    <input id="${id}" type="range" min="${min}" max="${max}" step="${step}" value="${value}" class="Chromic-slider" />
  </label>
`;

export const uiSegmented = ({ id, options = [], active = '' }) => `
  <div id="${id}" class="ui-segmented mode-switch" role="radiogroup">
    ${options
      .map((option) => `<button type="button" data-value="${option.value}" class="focusable${option.value === active ? ' active' : ''}">${option.label}</button>`)
      .join('')}
  </div>
`;

export const createModal = ({ title = '', onOpen = null, onClose = null } = {}) => {
  const root = document.createElement('div');
  root.className = 'ui-modal';
  root.setAttribute('hidden', '');
  root.innerHTML = `
    <div class="ui-modal-backdrop" data-modal-close></div>
    <section class="ui-modal-sheet" role="dialog" aria-modal="true" aria-label="${title || 'Modal'}">
      <header class="ui-modal-header">
        <h3 class="ui-modal-title"></h3>
        <button type="button" class="ui-modal-close" data-modal-close>Done</button>
      </header>
      <div class="ui-modal-body"></div>
    </section>
  `;

  const titleElement = root.querySelector('.ui-modal-title');
  const bodyElement = root.querySelector('.ui-modal-body');

  const close = () => {
    root.setAttribute('hidden', '');
    bodyElement.innerHTML = '';
    onClose?.();
  };

  const open = () => {
    root.removeAttribute('hidden');
    onOpen?.();
  };

  const setTitle = (nextTitle) => {
    titleElement.textContent = nextTitle || '';
  };

  const setContent = (markup) => {
    bodyElement.innerHTML = markup || '';
  };

  root.querySelectorAll('[data-modal-close]').forEach((element) => {
    element.addEventListener('click', close);
  });

  setTitle(title);
  document.body.append(root);

  return {
    root,
    close,
    open,
    setTitle,
    setContent,
    getBody: () => bodyElement,
  };
};


