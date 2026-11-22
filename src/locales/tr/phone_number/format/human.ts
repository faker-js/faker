import international from './international';

export default international.flatMap((format) => {
  const prefix = format.slice(3, 6);
  return [`+90-${prefix}-###-##-##`, `+90-${prefix}-###-#-###`];
});
