import { html, render } from '../../htm-preact/htm-preact.js';
import HelixFeedback from './components/helixFeedback/HelixFeedback.js';

export function getMetadata(name, doc = document) {
  const attr = name && name.includes(':') ? 'property' : 'name';
  const meta = doc.head.querySelector(`meta[${attr}="${name}"]`);
  return meta && meta.content;
}

const App = ({ strings }) => html`
    <${HelixFeedback}
      strings=${strings}
    />
  `;

const sanitizedKeyDiv = (text) => text.toLowerCase().replace(/ /g, '');

const getStrings = (metaData) => {
  const {
    feedbackcommentplaceholder,
    feedbackoptions,
    feedbackurl,
    feedbackscopes,
    subtitle,
    thankyoutext,
    title,
    havefeedbackplaceholder,
    likefeedbackplaceholder,
    somethingfeedbackplaceholder,
  } = metaData;
  return {
    feedbackCommentPlaceholder: feedbackcommentplaceholder,
    feedbackOptions: feedbackoptions,
    postUrl: feedbackurl,
    feedbackScopes: feedbackscopes,
    title,
    subTitle: subtitle,
    feedbackTitle: title,
    thankYou: thankyoutext,
    like: likefeedbackplaceholder,
    donotlike: somethingfeedbackplaceholder,
    general: havefeedbackplaceholder,
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

document.launcher = () => {
  const feedbackModal = document.getElementById('feedbackModal');
  if (feedbackModal) {
    feedbackModal.style.display = 'block';
  }
  return false;
};

const removeMetaDataElements = (el) => {
  const children = el.querySelectorAll(':scope > div');
  children.forEach((child) => {
    child.remove();
  });
};

const init = async (el) => {
  const spacingXLDiv = document.createElement('div');
  spacingXLDiv.setAttribute('class', 'section xl-spacing');
  const feedbackDiv = document.createElement('div');
  feedbackDiv.setAttribute('class', 'floating-button-div');
  const feedbackLauncher = document.createElement('input');
  feedbackLauncher.type = 'button';
  feedbackLauncher.value = 'Help Us Improve';
  feedbackLauncher.class = 'feedback-launch';
  feedbackLauncher.setAttribute('class', 'feedback-launch');
  feedbackDiv.appendChild(feedbackLauncher);
  spacingXLDiv.appendChild(feedbackDiv);
  feedbackLauncher.setAttribute('onclick', 'javascript:document.launcher()');
  document.querySelector('main')?.appendChild(spacingXLDiv);
  const strings = getStrings(getMetaData(el));
  removeMetaDataElements(el);
  const app = html`<${App} rootEl=${el} strings="${strings}"/> `;
  render(app, el);
};

export default init;
