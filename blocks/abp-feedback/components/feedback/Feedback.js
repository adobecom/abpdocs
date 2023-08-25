import {
  html,
  useState,
} from '../../../../htm-preact/htm-preact.js';

import Header from './Header.js';
import Options from './Options.js';
import Scope from './Scope.js';
import Comment from './Comment.js';
import sendFeedbackData from '../../utils/sendHelixFeedbackData.js';
import sessionStorageUtils from '../../../utils/sessionStorageUtils.js';
import { getUseCaseText } from '../../../utils/utils.js';

const defaultStrings = {
  feedbackCommentPlaceholder: 'Please type your feedback here!',
  feedbackOptions: 'I like something, I do not like something, I have a suggestion',
  feedbackScopes: 'Page, Use-case, Playbook',
  feedbackTitle: 'Your feedback is very important to us, tell us what you think!',
  postUrl: '/data/feedback',
  subTitle: 'Tell us what you think',
  thankYou: 'Thank you for your feedback',
};

function Feedback({
  strings = defaultStrings,
  loginDate,
}) {
  const [displayThankYou, setDisplayThankYou] = useState(false);
  const [keyboardFocusIndex, setKeyboardFocusIndex] = useState(0);
  const [option, setOption] = useState('');
  const [scope, setScope] = useState('');
  const [comment, setComment] = useState('');

  const getRadioLabels = (element) => {
    const formatLabels = [];

    const labels = strings[element];
    labels.split('\n').forEach((e) => {
      if (e && e.trim().length > 0) {
        formatLabels.push(e.trim());
      }
    });
    return formatLabels;
  };

  const handleClick = (index, ev) => {
    if (ev.target.value) {
      setScope(ev.target.value);
      return;
    }
    setKeyboardFocusIndex(null);
  };

  const handleOptionChange = (e) => {
    if (e.target.value) {
      setOption(e.target.value);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.value) {
      setComment(e.target.value);
    }
  };

  const handleClose = () => {
    const feedbackModal = document.getElementById('feedbackModal');
    if (feedbackModal) {
      feedbackModal.style.display = 'none';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = strings.postUrl;
    const location = window.location?.href;
    const profileDetails = sessionStorageUtils.getSessionStorage('profile');
    sendFeedbackData({
      comment,
      scope,
      option,
      url,
      timeSpentInSeconds: Math.abs(new Date() - loginDate) / 1000,
      profileDetails,
      useCase: getUseCaseText(document),
      page: location,
    });
    setDisplayThankYou(true);
    setTimeout(() => {
      const feedbackModal = document.getElementById('feedbackModal');
      if (feedbackModal && feedbackModal.style.display === 'block') {
        feedbackModal.style.display = 'none';
      }
      setDisplayThankYou(false);
      setScope('');
    }, 4000);
  };

  const headerComponent = html`
    <${Header}
      strings=${strings}
    />
  `;

  const thankYouComponent = html`
    <div className="hlx-feedback-submit-response">${strings.thankYou}</div>
  `;

  const commentComponent = html`
    <${Comment}
      handleInputChange=${handleInputChange}
      like=${strings.like}
      donotlike=${strings.donotlike}
      general=${strings.general}
      option=${option}
    />
  `;
  const feedbackScopes = [];
  const feedbackOptions = [];
  for (let i = 0; i < 3; i += 1) {
    const scopeLables = getRadioLabels('feedbackScopes');
    const optionLables = getRadioLabels('feedbackOptions');
    feedbackScopes.push(
      html`<${Scope}
        key="feedback-scope"-${i}
        index=${i}
        isActive=${scopeLables[i] === scope}
        label=${scopeLables[i]}
        onClick=${handleClick}
        hasKeyboardFocus=${keyboardFocusIndex === i}
      />`,
    );
    feedbackOptions.push(
      html`<${Options}
        key="feedback-options"-${i}
        index=${i}
        label=${optionLables[i]}
        handleOptionChange=${handleOptionChange}
        option=${option}
      />`,
    );
  }

  const modalContent = html`
    <div class="feedback-topsection">
        ${headerComponent}
        <div class="close" onclick=${handleClose}>
        <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 18 18" width="18">
        <defs>
          <style>
            .fill {
              fill: #505050;
            }
          </style>
        </defs>
        <title>S Close 18 N</title>
        <rect id="Canvas" fill="#ff13dc" opacity="0" width="18" height="18" /><path class="fill" d="M13.2425,3.343,9,7.586,4.7575,3.343a.5.5,0,0,0-.707,0L3.343,4.05a.5.5,0,0,0,0,.707L7.586,9,3.343,13.2425a.5.5,0,0,0,0,.707l.707.7075a.5.5,0,0,0,.707,0L9,10.414l4.2425,4.243a.5.5,0,0,0,.707,0l.7075-.707a.5.5,0,0,0,0-.707L10.414,9l4.243-4.2425a.5.5,0,0,0,0-.707L13.95,3.343a.5.5,0,0,0-.70711-.00039Z" />
      </svg>
        
        
        </div>

    </div>
    <div class="hlx-feedback-options-comment">
      <div class='hlx-feedback-all-options'>
          ${feedbackOptions.map((optionItem) => html`${optionItem}`)}
      </div> 
        ${commentComponent}
    </div>`;

  const feedbackForm = html`
   <div className='hlx-FeedbackWrapper'>
      <form className="feedback-modal hlx-Feedback-ratingFields" 
          id="feedbackModal" 
          onSubmit=${handleSubmit}>
        <div class="modal-content">
          ${!displayThankYou && modalContent}
          ${displayThankYou && thankYouComponent}
        </div>
      </form>
    </div>
  `;

  return html`
      ${feedbackForm}
  `;
}

export default Feedback;
