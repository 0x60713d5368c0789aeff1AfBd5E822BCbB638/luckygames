import styled from "styled-components";

export default (props: any) => {
  const { children, ...parames } = props;
  return <TitleStyle {...parames}>{children}</TitleStyle>;
};

const TitleStyle = styled.div`
  padding: 0 0.05rem;
  width: 100%;
  max-width: 2.58rem;
  height: 0.46rem;
  line-height: 0.34rem;
  margin: 0 auto;
  text-align: center;
  color: #d627fd;
  font-size: 0.22rem;
  font-weight: bold;
  background-image: url(${createURL("title_bg.png")});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
