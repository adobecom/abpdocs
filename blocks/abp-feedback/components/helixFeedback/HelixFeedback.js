import { html } from '../../../../htm-preact/htm-preact.js';
import Feedback from '../feedback/Feedback.js';

const HelixFeedback = ({ strings }) => {
  const feedbackComponent = html`
    <${Feedback} 
    strings=${strings}
    loginDate=${new Date()}
    />
  `;

  return html` ${feedbackComponent} `;
};

export default HelixFeedback;
