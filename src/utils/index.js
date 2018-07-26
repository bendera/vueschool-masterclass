const countObjectProperties = (obj) => {
  if (typeof obj === 'object') {
    return Object.keys(obj).length;
  }

  return 0;
};

export {
  // eslint-disable-next-line import/prefer-default-export
  countObjectProperties,
};
