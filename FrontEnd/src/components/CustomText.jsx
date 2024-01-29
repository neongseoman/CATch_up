import styled from "@emotion/styled";

const CustomText = styled.span`
  display: ${(props) => (props.align ? "block" : "inline")};
  text-align: ${(props) => (props.align ? props.align : "")};
  color: ${(props) => (props.color ? `${props.color}` : "")};
  font-size: ${(props) => `var(--${props.typography})`};
  font-weight: ${(props) => (props.bold ? "var(--bold)" : null)};
  font-weight: ${(props) => (props.weight ? props.weight : "")};
`;

export default CustomText;
