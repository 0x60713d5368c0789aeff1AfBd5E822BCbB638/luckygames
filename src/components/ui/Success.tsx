import styled from "styled-components";
import Modal from "./Modal";

export default (props: any) => {
  let { tips } = props;
  return (
    <SuccessView
      onClick={() => {
        Modal.clear();
      }}
    >
      <div className="tips">{tips}</div>
    </SuccessView>
  );
};
const SuccessView = styled.div`
  position: relative;
  margin: 0 auto;
  width: 2.48rem;
  height: 3.5rem;
  background: url(${createURL("popup_success.png")}) no-repeat center;
  background-size: 100% 100%;
  .tips {
    position: absolute;
    left: 50%;
    bottom: 0.5rem;
    transform: translateX(-50%);
    width: 1.6rem;
    height: 1.2rem;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    font-size: 0.16rem;
    line-height: 0.18rem;
    color: #f2f2f2;
    text-align: center;
    overflow: hidden;
  }
`;
