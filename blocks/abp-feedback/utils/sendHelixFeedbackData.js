const getDate = () =>
  // eslint-disable-next-line implicit-arrow-linebreak
  new Date().toISOString().replace(/[TZ]/g, ' ').split('.')[0].trim();

const sendFeedbackData = ({
  comment, scope, option, url, timeSpentInSeconds, profileDetails, useCase, page,
} = {}) => {
  const data = [
    { name: 'Timestamp', value: getDate() },
  ];
  if (comment) {
    data.push({ name: 'Comment', value: comment });
  }

  if (scope) {
    data.push({ name: 'Scope', value: scope });
  }

  if (option) {
    data.push({ name: 'FeedbackOption', value: option });
  }
  if (timeSpentInSeconds) {
    data.push({ name: 'TimeSpentInSeconds', value: timeSpentInSeconds });
  }

  if (page) {
    data.push({ name: 'Page', value: page });
  }

  if (useCase) {
    data.push({ name: 'Use Case', value: useCase });
  }

  if (profileDetails) {
    const { name, email } = profileDetails;
    if (name) {
      data.push({ name: 'Name', value: name });
    }
    if (email) {
      data.push({ name: 'Email', value: email });
    }
  }

  const body = { data };

  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
};

export default sendFeedbackData;
