import { html, render } from '../../htm-preact/htm-preact.js';

import HelixReview from './components/helixReview/HelixReview.js';

const COMMENT_THRESHOLD = 5;

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

const getReviewPath = (url) => {
  try {
    return new URL(url).pathname;
  } catch (err) {
    return 'no-path';
  }
};

const getPageLocale = () => {
  const ogLocale = document.querySelector('meta[property="og:locale"]');
  if (!ogLocale) {
    return 'no-loc';
  }
  return ogLocale.getAttribute('content');
};

const getVisitorId = () => {
  if (window.s_adobe && window.s_adobe.visitor) {
    return window.s_adobe.visitor.getMarketingCloudVisitorID();
  }
  return null;
};

const getProductJson = () => {
  const name = getMetadata('product-name');
  const description = getMetadata('product-description');
  if (!name) return null;
  return {
    name,
    description,
    '@type': 'Product',
    '@context': 'http://schema.org',
  };
};

const App = ({ rootEl, strings }) => html`
    <${HelixReview}
      clickTimeout="5000"
      commentThreshold=${COMMENT_THRESHOLD}
      hideTitleOnReload=${strings.hideTitleOnReload}
      lang=${getPageLocale()}
      reviewTitle=${strings.reviewTitle}
      productJson=${getProductJson()}
      strings=${strings}
      tooltipDelay=${strings.tooltipdelay}
      postUrl=${strings.postUrl}
      visitorId=${getVisitorId()}
      reviewPath=${getReviewPath(strings.postUrl)}
      initialValue=${strings.initialValue}
      onRatingSet=${({ rating, comment }) => {}}
      onRatingHover=${({ rating }) => {}}
      onReviewLoad=${({ hasRated, rating }) => {}}
      goodRatingPlaceholder=${strings.goodRatingPlaceholder}
      loginDate=${new Date()}
    />
  `;

const sanitizedKeyDiv = (text) => text.toLowerCase().replace(/ /g, '');

const getStrings = (metaData) => {
  const {
    commentfieldlabel,
    commentplaceholder,
    ratingLegend,
    ratingverb = 'star',
    ratingnoun = 'vote',
    submittext,
    thankyoutext,
    title,
    tooltips,
    hidetitle,
    reviewurl,
    initialvalue,
    above3ratingplaceholder,
  } = metaData;
  return {
    commentLabel: commentfieldlabel,
    sendCta: submittext,
    star: ratingnoun.split(',')[0],
    starPlural: ratingnoun.split(',')[0],
    starsLegend: ratingLegend,
    placeholder: commentplaceholder,
    review: ratingverb.split(',')[0],
    reviewPlural: ratingverb.split(',')[1],
    reviewTitle: title,
    thankYou: thankyoutext,
    hideTitleOnReload: hidetitle,
    tooltips: tooltips && tooltips.split(',').map((t) => t.trim()),
    postUrl: reviewurl,
    initialValue: initialvalue,
    goodRatingPlaceholder: above3ratingplaceholder,
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
