import styled from "styled-components";
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
}
export function Button(props: Props) {
  //   return <SButton>{props.children}</SButton>;
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      type="button"
      className="mt-4 inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none hover:border-red-200"
    >
      {props.children}
    </button>
  );
}
