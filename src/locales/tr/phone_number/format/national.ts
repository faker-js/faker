import international from './international';

export default international.map(
  (format) => `(0${format.slice(3, 6)}) ### ## ##`
);
