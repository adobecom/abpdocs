import { html, render } from './htm-preact.js';
import Controls from './components/Controls.js';

export function loadStyle(href, callback) {
  let link = document.head.querySelector(`link[href="${href}"]`);
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', href);
    if (callback) {
      link.onload = (e) => callback(e.type);
      link.onerror = (e) => callback(e.type);
    }
    document.head.appendChild(link);
  } else if (callback) {
    callback('noop');
  }
  return link;
}

export function getMetadata(name, doc = document) {
  const attr = name && name.includes(':') ? 'property' : 'name';
  const meta = doc.head.querySelector(`meta[${attr}="${name}"]`);
  return meta && meta.content;
}

const App = ({ strings }) => html`
    <${Controls}
      previousButtonText=${strings.previousButtonText}
      nextButtonText=${strings.nextButtonText}
    />
  `;

const sanitizedKeyDiv = (text) => text.toLowerCase().replace(/ /g, '');

const getStrings = (metaData) => {
  const {
    backbuttontext,
    nextbuttontext,
  } = metaData;
  return {
    previousButtonText: backbuttontext,
    nextButtonText: nextbuttontext,
  };
};

const getMetaData = (el) => {
  const keyDivs = el.querySelectorAll(':scope > div > div:first-child');
  const metaData = {};
  keyDivs.forEach((div) => {
    const valueDivText = div.nextElementSibling.textContent;
    const keyValueText = sanitizedKeyDiv(div.textContent);
    metaData[keyValueText] = valueDivText;
  });
  return metaData;
};

const removeMetaDataElements = (el) => {
  const children = el.querySelectorAll(':scope > div');
  children.forEach((child) => {
    child.remove();
  });
};

const init = async (el) => {
  const metaData = getMetaData(el);
  const strings = getStrings(metaData);
  removeMetaDataElements(el);
  const app = html` <${App} rootEl=${el} strings="${strings}"/> `;
  render(app, el);
};

export default init;
