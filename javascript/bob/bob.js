export const hey = (rawMessage) => {
  const questionReg = /\?$/;
  const yellReg = /^[^a-z]*[A-Z][^a-z]*$/;
  const message = rawMessage.trim();
  if (!message) return 'Fine. Be that way!';
  if (questionReg.test(message)) {
    if (yellReg.test(message)) return "Calm down, I know what I'm doing!";
    return 'Sure.';
  }
  if (yellReg.test(message)) {
    return 'Whoa, chill out!';
  }
  return 'Whatever.';
};
