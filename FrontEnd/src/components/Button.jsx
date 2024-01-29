import styled from "@emotion/styled";

export const Button = styled.button`
  display: flex;
  gap: 8px;
  justify-content: center;
  font-size: var(--h4);
  align-items: center;
  padding: 12px 16px;
  border-radius: ${(props) => (props.rounded ? "100px" : `8px`)};
  width: ${(props) => (props.width ? props.width : `100%`)};
  background-color: ${(props) =>
    props.disabled ? `var(--bg-gray)` : `var(--main)`};
  color: var(--pure-white);
  font-weight: var(--bold);

  &.ghost {
    color: var(--font-gray);
    background-color: var(--pure-white);
    border: 1px solid var(--line-gray);
  }
`;

export const LinkButton = Button.withComponent("a");
