import { useEffect, html, useState } from '../htm-preact.js';

const Controls = ({ previousButtonText, nextButtonText }) => {
  const [nextURL, setNextURL] = useState('');
  const [nextText, setNextText] = useState('');
  const [previousText, setPreviousText] = useState('');
  const [previousURL, setPreviousURL] = useState('');
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

  const previousCom = html`<a href=${previousURL} className='previous'>  ${previousText}  </a>`;
  const nextCom = html` <a href=${nextURL}  className='next'> ${nextText}  </a>`;
  const controlsComponent = html`
     ${previousURL && previousCom}
     ${nextURL && nextCom}
   `;

  return html` ${controlsComponent} `;
};

export default Controls;
