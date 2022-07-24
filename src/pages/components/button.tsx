import styled from "styled-components";
export default (props: any) => {
  const { children, ...parames } = props;
  return (
    <ButtonSytle {...parames}>
      <span className="inner">{children}</span>
    </ButtonSytle>
  );
};
const ButtonSytle = styled.button`
  max-width: 100%;
  border: 1px solid transparent;
  padding: 0.02rem;
  border-radius: 0.5rem;
  font-size: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  background-image: linear-gradient(to right, #222, #222),
    linear-gradient(90deg, #732aff, #d627fd);
  .inner {
    display: inline-block;
    padding: 0 0.1rem;
    width: auto;
    max-width: 100%;
    min-width: 1.55rem;
    line-height: 0.35rem;
    font-size: 0.18rem;
    font-weight: 600;
    text-align: center;
    background-image: linear-gradient(90deg, #732aff, #d627fd);
    border-radius: 0.48rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
