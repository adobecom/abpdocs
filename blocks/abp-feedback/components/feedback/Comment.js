import { html } from '../../../../htm-preact/htm-preact.js';

function Comment({ handleInputChange, like, donotlike, general, option }) {
  const submitButton = html`<input type="submit" value='submit'/>`;
  const getplaceholder = () => {
    if (option === 'I like something') {
      return like;
    } if (option === 'I do not like something') {
      return donotlike;
    }
    return general;
  };
  return html`
  <div className='hlx-Feedback-commentFields'>
      <textarea
        cols="60"
        placeholder=${getplaceholder(option)}
        id="feedback-comments"
        onInput=${handleInputChange}
        name="feedback-comments"
        className='hlx-feedback-comments'
        maxlength="1500"
        autofocus
      />
        ${submitButton}
  </div>
  `;
}

export default Comment;
