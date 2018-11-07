export const hey = (rawMessage) => {
  const message = rawMessage.trim();
  const yelling = /^[^a-z]*[A-Z][^a-z]*$/.test(message);
  if (!message) return 'Fine. Be that way!';
  if (message.endsWith('?')) {
    if (yelling) return "Calm down, I know what I'm doing!";
    return 'Sure.';
  }
  if (yelling) {
    return 'Whoa, chill out!';
  }
  return 'Whatever.';
};
