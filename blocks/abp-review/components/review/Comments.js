import {
  useEffect,
  useState,
  useRef,
  html,
} from '../../../../htm-preact/htm-preact.js';

function Comments({
  label,
  comment,
  handleCommentChange,
  placeholderText,
  sendCtaText,
  goodRatingPlaceholder,
  rating,
}) {
  const maxLength = 500;
  const [hasComment, setHasComment] = useState(false);
  const [displaySend, setDisplaySend] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const [charCount, setCharCount] = useState(maxLength);

  const textArea = useRef(null);
  useEffect(() => {
    if (textArea && textArea.current) {
      textArea.current.focus();
    }
  }, [textArea]);

  const onCommentChange = (e) => {
    const { value } = e.target;
    setHasComment(!!value);
    setCharCount(maxLength - value.length);
    if (handleCommentChange) {
      handleCommentChange(value);
    }
  };

  const onBlur = (e) => {
    setDisplaySend(!!e.target.value);
    setHasFocus(false);
  };

  const onFocus = () => {
    setDisplaySend(true);
    setHasFocus(true);
  };

  const onCtaCoverClick = () => textArea.current && textArea.current.focus();

  let commentsClass = 'hlx-Review-commentFields is-Visible';
  if (hasFocus) {
    commentsClass += ' has-focus';
  }

  const disabledElement = html`
    <input type="submit" value=${sendCtaText} />
  `;

  const charCountElement = html`
    <span class="comment-counter">${charCount}/${maxLength}</span>
  `;
  return html`
    <fieldset className=${commentsClass}>
      <label htmlFor="rating-comments" />
      <textarea
        id="rating-comments"
        ref=${textArea}
        cols="60"
        maxlength=${maxLength}
        name="rating-comments"
        aria-label=${label}
        placeholder=${rating > 3 ? goodRatingPlaceholder : placeholderText}
        onInput=${onCommentChange}
        onFocus=${onFocus}
        value=${comment}
        onBlur=${onBlur}
      />
        <div id="ctaCover" onClick=${onCtaCoverClick}>
          ${charCountElement}
        </div>
        ${disabledElement}
    </fieldset>
  `;
}

export default Comments;
