import {
  html,
  useState,
} from '../../../../htm-preact/htm-preact.js';

import Header from './Header.js';
import Options from './Options.js';
import Scope from './Scope.js';
import Comment from './Comment.js';
import Icons from './Icons.js';
import sendFeedbackData from '../../utils/sendHelixFeedbackData.js';
import sessionStorageUtils from '../../../../utils/sessionStorageUtils.js';
import getuseCaseText from '../../../../utils/utils.js';

const defaultStrings = {
  feedbackCommentPlaceholder: 'Please type your feedback here!',
  feedbackOptions: 'I like something, I do not like something, I have a suggestion',
  feedbackScopes: 'Page, Use-case, Playbook',
  feedbackTitle: 'Your feedback is very important to us, tell us what you think!',
  postUrl: '/data/feedback',
  subTitle: 'Send feedback about',
  thankYou: 'Thank you for your feedback',
};

function Feedback({
  strings = defaultStrings,
  loginDate,
}) {
  const [displayThankYou, setDisplayThankYou] = useState(false);
  const [keyboardFocusIndex, setKeyboardFocusIndex] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [showComment, setShowComment] = useState(false);
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

  const handleIconClick = (scopeValue) => {
    setScope(scopeValue);
    setShowOptions(true);
  };

  const handleClick = (index, ev) => {
    if (ev.target.value) {
      setScope(ev.target.value);
      setShowOptions(true);
      return;
    }
    setKeyboardFocusIndex(null);
  };

  const handleOptionChange = (e) => {
    if (e.target.value) {
      setOption(e.target.value);
      setShowComment(true);
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
      useCase: getuseCaseText(document),
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

  const iconsComponent = html`
      <${Icons}
        handleIconClick=${handleIconClick} 
        scope=${scope}/>
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
        <span class="close" onclick=${handleClose}>X</span>
    </div>
        ${iconsComponent}
    <div class="hlx-feedback-options-comment">
      <div class='hlx-feedback-all-options'>
          ${showOptions && feedbackOptions.map((optionItem) => html`${optionItem}`)}
      </div> 
      
        ${showOptions && showComment && commentComponent}
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
