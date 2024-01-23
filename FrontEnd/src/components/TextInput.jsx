import styled from "@emotion/styled";
import React from "react";

// eslint-disable-next-line react/display-name
const TextInput = React.forwardRef((props, ref) => {
  const { width, onClick, ...others } = props;
  return (
    <InputWrapper>
      <Input type={"text"} ref={ref} {...others} />
    </InputWrapper>
  );
});

const Input = styled.input`
  & {
    padding: 16px;
    padding-right: ${(props) => (props.icon ? "48px" : "")};
    outline-style: solid;
    outline-width: 1px;
    font-weight: ${(props) => (props.weight ? props.weight : "var(--bold)")};
    width: 100%;
    outline-color: var(--line-gray);
    border-radius: 6px;
    resize: none;
    accent-color: var(--main);
  }
  &:disabled {
    background-color: #eee;
    color: var(--font-light-gray);
  }
  &:focus {
    filter: ${(props) =>
      props.error
        ? "drop-shadow(0px 0px 2px var(--alert-red))"
        : "drop-shadow(0px 0px 2px var(--main))"};
    color: var(--font-main);
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export default TextInput;
