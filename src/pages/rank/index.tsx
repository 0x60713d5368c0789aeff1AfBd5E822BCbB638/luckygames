import { useEffect, useMemo } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import { observer } from "mobx-react-lite";

import styled from "styled-components";
import Title from "../components/title";
import RankList from "./rankList";
import { useRank } from "@/lib/rank";
import { useWallet } from "@/lib/wallet";
import { withTranslation } from "react-i18next";
export default withTranslation()(
  observer((props: any) => {
    const { address } = useWallet();
    const { t } = props;
    const { invitedInRound, thisRound } = useRank();
    const myRanking = useMemo(() => {
      if (!address || !thisRound) {
        return 0;
      }
      return thisRound.findIndex((a) => a.user == address) + 1;
    }, [address, thisRound]);
    return (
      <ViewStyled>
        <Header />
        <ContentStyle>
          <div className="results_view">
            <div className="results_box">
              <div className="box_title">
                <Title>{t("rank.results")}</Title>
              </div>
              <div className="line"></div>
              <div className="result_items">
                <div className="item">
                  <div className="icon">
                    <img src={createURL("icons/icon_trophy.png")} />
                  </div>
                  <div className="txt">{t("rank.invitations")}</div>
                  <div className="num">{invitedInRound}</div>
                </div>
                <div className="item">
                  <div className="icon">
                    <img src={createURL("icons/icon_star.png")} />
                  </div>
                  <div className="txt">{t("rank.myRanking")}</div>
                  <div className="num">{myRanking}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="list_view">
            <RankList />
          </div>
        </ContentStyle>
        <Footer current="rank" />
      </ViewStyled>
    );
  })
);
const ViewStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
`;
const ContentStyle = styled.div`
  flex: 1;
  height: 0;
  flex-shrink: 0;
  padding: 0 0.25rem;
  background: url(${createURL("page_bg.png")}) no-repeat center top/contain;
  overflow-y: auto;
  .results_view {
    position: relative;
    margin-top: 0.45rem;

    .results_box {
      width: 100%;
      padding: 0.1rem 0.2rem 0.2rem;
      height: 2.2rem;
      background: url(${createURL("rank_pool_box.png")}) no-repeat center
        bottom/100% 100%;
      .box_title {
        margin-top: -0.25rem;
      }
    }
    .line {
      width: 100%;
      margin: 0.09rem 0;
      height: 0.07rem;
      background: url(${createURL("line_bg.png")}) no-repeat center
        center/contain;
    }
    .result_items {
      display: flex;
      padding: 0.12rem;
      width: 100%;
      height: 1.26rem;
      text-align: center;

      background: url(${createURL("results_bg.png")}) no-repeat center
        center/cover;
      .item {
        flex: 1;
        overflow: hidden;
        text-align: center;
        &:last-child {
          margin-left: 0.1rem;
        }
        .icon {
          img {
            width: 0.44rem;
            height: 0.44rem;
            object-fit: contain;
          }
        }
        .txt {
          width: 100%;
          font-size: 0.16rem;
          color: #d627fd;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .num {
          line-height: 1;
          font-size: 0.26rem;
          text-shadow: 0 0 0.1rem #ff2b90;
        }
      }
    }
  }
  .list_view {
    margin-top: 0.6rem;
    padding-bottom: 0.66rem;
    background: url(${createURL("home_btm_bg.png")}) no-repeat center bottom/80%;
  }
`;
