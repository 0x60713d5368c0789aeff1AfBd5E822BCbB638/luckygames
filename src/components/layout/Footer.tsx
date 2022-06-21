import { Link } from "react-router-dom";
import styled from "styled-components";

import { observer } from "mobx-react-lite";

export default observer((props: any) => {
  let { current = "join" } = props;
  return (
    <FooterStyled>
      <Link className={`fomo ${current == "join" ? "cur" : null}`} to="/">
        JOIN
      </Link>
      <Link className={`rank ${current == "rank" ? "cur" : null}`} to="/rank">
        RANK
      </Link>
      <Link
        className={`claim ${current == "claim" ? "cur" : null}`}
        to="/claim"
      >
        CLAIM
      </Link>
    </FooterStyled>
  );
});
const FooterStyled = styled.div`
  padding: 0.14rem 0.3rem 0.12rem;
  background-color: #732aff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  a {
    position: relative;
    color: #f2f2f2;
    text-align: center;
    &::before {
      content: " ";
      display: block;
      margin: 0 auto 0.04rem;
      width: 0.3rem;
      height: 0.3rem;
      border-radius: 0.06rem;
      background-position: center;
      background-size: contain;
      transition: all 0.2s linear;
    }
    &.cur {
      color: #ffffff;
      &::before {
        background-color: #5818d8;
      }
    }
    &.fomo {
      &::before {
        background-image: url(${createURL("icons/icon_fomo.png")});
      }
    }
    &.rank {
      &::before {
        background-image: url(${createURL("icons/icon_rank.png")});
      }
    }  
    &.claim {
      &::before {
        background-image: url(${createURL("icons/icon_claim.png")});
      }
    }    
  }
`;
