const Input = ({
  id = "",
  type = "text",
  name = "",
  minLength = "",
  maxLength = "",
  placeholder = "",
  required = false,
  onChange = null,
  defaultValue = "",
  disable = false
}) => {
  return (
    <input
      className="input"
      id={id}
      type={type}
      name={name}
      minLength={minLength}
      maxLength={maxLength}
      placeholder={placeholder}
      required={required}
      onChange={onChange}
      defaultValue={defaultValue}
      disabled={disable}
    />
  );
};

export default Input;