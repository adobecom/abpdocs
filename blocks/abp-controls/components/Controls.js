import { useEffect, useState, html } from '../../../htm-preact/htm-preact.js';

// eslint-disable-next-line no-unused-vars
const Controls = ({ previousButtonText, nextButtonText }) => {
  const [nextURL, setNextURL] = useState();
  const [nextText, setNextText] = useState(nextButtonText);
  const [previousText, setPreviousText] = useState(previousButtonText);
  const [previousURL, setPreviousURL] = useState();

  useEffect(() => {
    const currentURL = window.location.pathname;
    const currentNavItem = document.querySelector(`li[role="presentation"] a[href="${currentURL}"]`)?.parentElement;
    if (currentNavItem) {
      setNextText(`${currentNavItem.nextElementSibling?.textContent} >>`);
      setNextURL(currentNavItem.nextElementSibling?.firstChild?.getAttribute('href'));
      setPreviousURL(currentNavItem.previousElementSibling?.firstChild?.getAttribute('href'));
      setPreviousText(`<< ${currentNavItem.previousElementSibling?.textContent}`);
    }
  }, []);

  const nextClassName = previousURL === undefined ? 'no-previous' : 'previous-exist';
  const previousClassName = nextURL === undefined ? 'no-next' : 'next-exist';

  const previousCom = html`<a href=${previousURL} className=${previousClassName}> ${previousText}</a>`;
  const nextCom = html`<a href=${nextURL}  className=${nextClassName}> ${nextText}  </a>`;
  const controlsComponent = html`
     ${previousURL && previousCom}
     ${nextURL && nextCom}
   `;

  return html` ${controlsComponent} `;
};

export default Controls;
