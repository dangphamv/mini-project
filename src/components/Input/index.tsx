import debounce from "lodash/debounce";
type PropsType = {
  onChange: (e: any) => void;
  className: string;
  placeholder: string;
};
const Input = ({ onChange, className, placeholder }: PropsType) => {
  const debouncedOnChange = debounce(onChange, 300);

  return (
    <input
      onChange={debouncedOnChange}
      className={className}
      type="text"
      placeholder={placeholder}
    />
  );
};

export default Input;
