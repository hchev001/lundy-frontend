import styled from "styled-components";
import classNames from "classnames";
const SButton = styled.button`
    background-color: #3CB9BD;
    padding: 12px 16px;
    display: flex;
    justify-content: center;
    align-items: center;;

    &::active {
        background-color: #36A7AA;
    }

    &::hover {
        background-color: #77CED1;
    }

    &.disabled {
        background-color: #C5EAEB;
    }
`;

const Button = ({
  hidden = true,
  disabled = false,
  validationMessage = "",
  onClick,
  text = "", 
  className='',
}) => {

  const btnClasses = classNames(
    className,
    {"disabled": disabled},
    "rounded-md",
    "shadow-sm",
    "text-sm",
    "font-medium",
    "text-gray-50",
    "w-full",
    "border-2",
    "focus:outline-none",
    "focus:ring",
    "focus:ring-teal-200",
    "block",
  );
  const validationClasses = classNames(
    "text-sm",
    "text-red-500",
    "transition-opacity",
    "ease-out",
    "duration-300",
    { "opacity-0": hidden },
    { "opacity-100": !hidden }
  );
  return (
    <>
      <SButton
        disabled={disabled}
        onClick={onClick}
        type="button"
        className={btnClasses}
      >
        {text}
      </SButton>
      <div className={validationClasses}>{validationMessage}</div>
    </>
  );
}

export default Button;