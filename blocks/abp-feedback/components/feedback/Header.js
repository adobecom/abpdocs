import { html } from '../../../../htm-preact/htm-preact.js';

const getTitle = (strings) => html`<h3 className="hlx-feedbackTitle">${strings.title}</h3>`;
const getSubTitle = (strings) => html`<h3 className="hlx-feedbackTitle">${strings.subTitle}</h3>`;

function Header({ strings }) {
  return html`
    ${strings.title && getTitle(strings)}
    ${strings.subTitle && getSubTitle(strings)}
  `;
}

export default Header;
