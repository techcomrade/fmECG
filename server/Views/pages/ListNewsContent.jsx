import truncate from 'lodash/truncate.js';
import React from 'react';

const stripHtml = (html) => {
  const el = window.document.createElement('DIV');
  el.innerHTML = html;

  return el.textContent || el.innerText || '';
};

const ListNewsContent = (props) => {
  const { property, record } = props;
  const maxLength = property.custom?.maxLength || 15;
  const value = record.params[property.path] || '';
  const textValue = stripHtml(value);

  return <>{truncate(textValue, { length: maxLength, separator: ' ' })}</>;
};

export default ListNewsContent;
