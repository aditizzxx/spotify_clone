import btnLoading from '../../img/btnLoading.svg'

const Button = ({
  type = "button",
  color = "",
  fullWidth = false,
  isLoading = false,
  onClick,
  children,
  styles
}) => {
  return (
    <button
      className={`btn md:py-5 md:px-12 xs:py-4 xs:px-9 btn--${color} ${fullWidth ? "btn--full-width" : ""}`}
      type={type}
      onClick={onClick}
      style={styles}
    >
      {isLoading ? <img src={btnLoading}/> : children}
    </button>
  );
};

export default Button;