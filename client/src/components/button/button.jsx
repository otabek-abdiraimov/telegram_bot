import './button.css';

const Button = (props) => {
  const { type, title, onClick, disable } = props;

  return (
    <button
      onClick={onClick}
      className={`btn ${
        type === 'add'
          ? 'add'
          : type === 'remove'
          ? 'remove'
          : type === 'checkout'
          ? 'checkout'
          : ''
      } ${disable === true && 'disabled'}`}
      disabled={disable}
    >
      {title}
    </button>
  );
};

export default Button;
