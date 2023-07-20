import { html } from '../../../../htm-preact/htm-preact.js';

function Options({ index, key, label, handleOptionChange, option }) {
  return html`
    <div className='hlx-feedback-options'>
      <input
      key=${key}
      id=${index}
      name="feedback-option"
      aria-label=${label}
      type="button"
      className=${(option !== '' && option !== label) ? 'hlx-feedback-option  hlx-feedback-grey' : 'hlx-feedback-option '}
      onClick=${handleOptionChange}
      onKeyPress=${'handleKeyPress'}
      value=${label}
    />
</div>
  `;
}

export default Options;
