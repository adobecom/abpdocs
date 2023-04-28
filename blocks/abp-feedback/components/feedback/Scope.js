import { html } from '../../../../htm-preact/htm-preact.js';

const KEY_ENTER = 13;
const KEY_SPACE = 32;

function Scope({
  key,
  index,
  isActive,
  label,
  onClick,
  hasKeyboardFocus,
  isInteractive,
  tooltip,
  isHovering,
}) {
  const handleClick = (ev, isKeyboardSelection = false) => {
    if (onClick) onClick(index, ev, { isKeyboardSelection });
  };
  const handleKeyPress = (ev) => {
    if (ev.which === KEY_ENTER || ev.which === KEY_SPACE) {
      ev.preventDefault();
      handleClick(ev, { isKeyboardSelection: true });
    }
  };
  let scopesInputClassNames = '';

  if (isInteractive && tooltip) {
    scopesInputClassNames += 'tooltip';
  }

  if (isHovering) {
    scopesInputClassNames += ' is-hovering';
  }

  if (isActive) {
    scopesInputClassNames += ' is-Active';
  }
  if (hasKeyboardFocus) {
    scopesInputClassNames += ' has-keyboard-focus';
  }

  return html`
  <div>
    <input
    key=${key}
    id=${index}
    name="feedback-scope"
    aria-label=${label}
    type="radio"
    className=${scopesInputClassNames}
    onClick=${handleClick}
    onKeyPress=${handleKeyPress}
    value=${label}
  />
  <label for="${label}"> ${label} </label>
</div>
  `;
}

export default Scope;
