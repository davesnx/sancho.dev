export const Emoji = ({ children, name }) => {
  return (
    <span role="img" aria-label={name || ''}>
      {children}
    </span>
  );
};
