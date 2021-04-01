import styled from "styled-components";
import classNames from "classnames";
const SButton = styled.button`
  padding: 0;
  border: none;
  font: inherit;
  color: inherit;
  background-color: transparent;
  cursor: pointer;

  .btn {
    display: inline-block;
    text-align: center;
    text-docoration: none;

    // create a small space when button wraps on 2 lines
    margin: 2px 0;

    // invisible border colored on hover/focus
    border: solid 1px transparent;
    border-radius: 4px;

    // size comes from text & padding
    padding: 0.5em 1em;

    // make sure colors have enough contrast
    color: #ffffff;
    background-color: #9555af;

    outline: none;

    &:active {
      transform: translateY(1px);
      filter: saturate(150%);
    }

    &:hover {
      color: #9555af;
      border-color: currentColor;
      background-color: white;
    }
  }
`;
interface Props {
  children: React.ReactNode;
  onClick: any;
  disabled?: boolean;
  validationMessage?: string;
  hidden?: boolean;
}
export function Button({
  hidden = true,
  disabled,
  validationMessage,
  onClick,
  children,
}: Props) {
  //   return <SButton>{props.children}</SButton>;

  const btnClasses = classNames(
    "mt-4",
    "inline-flex",
    "justify-center",
    "w-full",
    "rounded-md",
    "border-gray-300",
    "shadow-sm",
    "px-4",
    "py-2",
    "bg-white",
    "text-sm",
    "font-medium",
    "text-gray-700",
    "border-2",
    "hover:border-red-200",
    "focus:outline-none",
    "focus:ring",
    "focus:ring-red-200"
  );
  const validationClasses = classNames(
    "px-3",
    "py-1",
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
      <button
        disabled={disabled}
        onClick={onClick}
        type="button"
        className={btnClasses}
      >
        {children}
      </button>
      <div className={validationClasses}>{validationMessage}</div>
    </>
  );
}
