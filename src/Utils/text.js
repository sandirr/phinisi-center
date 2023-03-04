export const generateArticleDesc = (str = '', maxLength = undefined) => {
  const div = document.createElement('div');
  div.innerHTML = str;
  return div.textContent.substring(0, maxLength);
};

export const normalizeRupiah = (v) => {
  if (!v) return '';
  const cleanedInput = v.replace(/[^\d]/g, '');
  if (cleanedInput) {
    const _cleanedInput = Number(cleanedInput);
    const convertedInput = new Intl.NumberFormat().format(_cleanedInput);
    return `${convertedInput}`.replace(/,/g, '.');
  } return '';
};

export const normalizeOnlyNumber = (v) => {
  if (!v) return '';
  const cleanedInput = v.replace(/[^\d]/g, '');
  return cleanedInput || '';
};
