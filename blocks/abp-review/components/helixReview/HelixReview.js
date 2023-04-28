import { useState, html } from '../../htm-preact.js';

import sendHelixData from '../../utils/sendHelixData.js';
import Review from '../review/Review.js';

const HelixReview = ({
  clickTimeout = 5000,
  commentThreshold = 5,
  hideTitleOnReload,
  lang,
  maxRating = 5,
  onRatingHover,
  onRatingSet: onRatingSetCallback,
  postUrl,
  reviewPath,
  strings,
  tooltipDelay = 300,
  visitorId,
  initialValue,
  loginDate,
}) => {
  const [avgRating, setAvgRating] = useState(5);
  const [totalReviews, setTotalReviews] = useState(0);
  const onRatingSet = ({
    rating: newRating,
    comment,
  }) => {
    const location = window.location?.href;
    sendHelixData({
      comment,
      lang,
      rating: newRating,
      postUrl,
      reviewPath,
      visitorId,
      page: location,
      timeSpentInSeconds: new Date().getSeconds() - loginDate.getSeconds(),
    });

    if (onRatingSetCallback) {
      onRatingSetCallback({ rating: newRating, comment });
    }
  };
  const reviewComponent = html`
    <${Review}
      averageRating=${avgRating}
      clickTimeout=${clickTimeout}
      commentThreshold=${commentThreshold}
      hideTitleOnReload=${hideTitleOnReload}
      maxRating=${maxRating}
      onRatingHover=${onRatingHover}
      onRatingSet=${onRatingSet}
      setAverageRating=${setAvgRating}
      setTotalReviews=${setTotalReviews}
      displayRatingSummary=${false}
      strings=${strings}
      tooltipDelay=${tooltipDelay}
      totalReviews=${totalReviews}
      initialValue=${initialValue}
      loginDate=${loginDate}
    />
  `;

  return html` ${reviewComponent} `;
};

export default HelixReview;
