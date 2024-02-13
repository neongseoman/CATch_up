import styled from "@emotion/styled";

export const Button = styled.button`
  display: inline-flex; /* flex 대신 inline-flex를 사용하여 요소의 너비가 내용물에 맞게 조정되도록 함 */
  gap: 8px;
  justify-content: center;
  font-size: ${(props) => (props.fontSize ? props.fontSize : `var(--h4)`)};
  align-items: center;
  padding: 12px 16px;
  border-radius: ${(props) => (props.rounded ? "100px" : `8px`)};
  width: ${(props) => (props.width ? props.width : `100%`)}; /* 너비가 명시적으로 주어지지 않으면 자동으로 설정 */
  background-color: ${(props) =>
    props.disabled ? `var(--bg-gray)` : `var(--main)`};
  color: var(--pure-white);
  font-weight: var(--bold);
  margin-left: ${(props) => (props.alignRight ? `auto` : `0`)}; /* 오른쪽 정렬을 위해 margin-left를 auto로 설정 */

  &.ghost {
    color: var(--font-gray);
    background-color: var(--pure-white);
    border: 1px solid var(--line-gray);
  }
`;



export default Button;
