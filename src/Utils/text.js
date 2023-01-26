export const generateArticleDesc = (str = '', maxLength = 20) => {
  const div = document.createElement('div');
  div.innerHTML = str;
  return div.textContent.substring(0, maxLength);
};
