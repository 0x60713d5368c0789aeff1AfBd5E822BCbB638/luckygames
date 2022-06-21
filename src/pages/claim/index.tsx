import { useState } from "react";
import copy from "copy-to-clipboard";
import { useLocation } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import { observer } from "mobx-react-lite";

import styled from "styled-components";
import Title from "../components/title";
import { useClaim } from "@/lib/claim";
import Modal from "@/components/ui/Modal";
import { useWallet } from "@/lib/wallet";
export default observer(() => {
  return (
    <ViewStyled>
      <Header />
      <ContentStyle>
        {/*My income*/}
        <div className="card_view">
          <div className="card_bg lg">
            <Title>My income</Title>
            <div className="card_content">
              <div className="list_view">
                <div className="list_item">
                  <label>Countdown</label>
                  <div className="time_view">
                    <span>12H</span>:<span>29M</span>:<span>42S</span>
                  </div>
                </div>
                <div className="list_item">
                  <label>Round of max profit</label>
                  <div className="value">
                    <span className="val_num">400</span>
                    <span className="val_unit">FDAO</span>
                  </div>
                </div>
                <div className="list_item">
                  <label>Generated revenue</label>
                  <div className="value">
                    <span className="val_num">400</span>
                    <span className="val_unit">FDAO</span>
                  </div>
                </div>
                <div className="list_item">
                  <label>Withdrawable dividends</label>
                  <div className="value">
                    <span className="val_num">400</span>
                    <span className="val_unit">FDAO</span>
                  </div>
                </div>
                <div className="list_item">
                  <label>Withdrawable bonus</label>
                  <div className="value">
                    <span className="val_num">400</span>
                    <span className="val_unit">FDAO</span>
                  </div>
                </div>
                <div className="list_item">
                  <label>Total withdrawable </label>
                  <div className="value">
                    <span className="val_num">400</span>
                    <span className="val_unit">FDAO</span>
                  </div>
                </div>
              </div>
              <div className="card_btm_btn">
                <a href="">
                  <img src={createURL("btns/btn_claim.png")} />
                </a>
              </div>
            </div>
          </div>
        </div>
        {/*My rank prize*/}
        <div className="card_view">
          <div className="card_bg">
            <Title>My rank prize</Title>
            <div className="card_content">
              <div className="list_view list_bg">
                <div className="list_item">
                  <label>Champion income</label>
                  <div className="value">
                    <span className="val_num">400</span>
                    <span className="val_unit">FDAO</span>
                  </div>
                </div>
                <div className="list_item">
                  <label>Withdrawable</label>
                  <div className="value">
                    <span className="val_num">400</span>
                    <span className="val_unit">FDAO</span>
                  </div>
                </div>
              </div>
              <div className="card_btm_btn">
                <a href="">
                  <img src={createURL("btns/btn_claim.png")} />
                </a>
              </div>
            </div>
          </div>
        </div>
        {/*My lucky prize*/}
        <div className="card_view">
          <div className="card_bg">
            <Title>My lucky prize</Title>
            <div className="card_content">
              <div className="list_view list_bg">
                <div className="list_item">
                  <label>Lucky income</label>
                  <div className="value">
                    <span className="val_num">400</span>
                    <span className="val_unit">FDAO</span>
                  </div>
                </div>
                <div className="list_item">
                  <label>Withdrawable</label>
                  <div className="value">
                    <span className="val_num">400</span>
                    <span className="val_unit">FDAO</span>
                  </div>
                </div>
              </div>
              <div className="card_btm_btn">
                <a href="">
                  <img src={createURL("btns/btn_claim.png")} />
                </a>
              </div>
            </div>
          </div>
        </div>
        {/*My data*/}
        <div className="card_view">
          <div className="card_bg">
            <Title>My data</Title>
            <div className="card_content">
              <div className="list_view list_bg">
                <div className="list_item">
                  <label>Total dividends</label>
                  <div className="value">
                    <span className="val_num">400</span>
                    <span className="val_unit">FDAO</span>
                  </div>
                </div>
                <div className="list_item">
                  <label>Total bonus</label>
                  <div className="value">
                    <span className="val_num">400</span>
                    <span className="val_unit">FDAO</span>
                  </div>
                </div>
                <div className="list_item">
                  <label>Total joinFDAO</label>
                  <div className="value">
                    <span className="val_num">400</span>
                    <span className="val_unit">FDAO</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentStyle>
      <Footer current="claim" />
    </ViewStyled>
  );
});
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
  padding: 0.25rem;
  overflow-y: auto;
  background: url(${createURL("page_bg.png")}) no-repeat center top/contain;
  .card_view {
    overflow: hidden;
    padding-bottom: 0.5rem;
    background: url(${createURL("home_btm_bg.png")}) no-repeat center bottom/80%;
    .card_bg {
      padding: 0 0.16rem 0.36rem;
      background: url(${createURL("card_view_bg.png")}) no-repeat center
        bottom/100% 100%;
      &.lg {
        background: url(${createURL("this_round_bg.png")}) no-repeat center
          bottom/100% 100%;
      }
    }

    .card_content {
      padding-top: 0.1rem;
      .card_btm_btn {
        margin-top: 0.3rem;
        text-align: center;
        a {
          display: inline-block;
          img {
            height: 0.4rem;
            object-fit: contain;
          }
        }
      }
      .list_view {
        &.list_bg {
          padding: 0.2rem 0.14rem;
          background: url(${createURL("results_bg.png")}) no-repeat center /
            100% 100%;
        }
        .list_item {
          margin-top: 0.1rem;
          padding: 0.04rem 0.1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: 1px solid #732aff;
          border-radius: 0.1rem;
          font-size: 0.16rem;
          &:first-child {
            margin-top: 0;
          }
          .time_view {
            span {
              margin: 0.04rem;
              padding: 0.01rem 0.04rem;
              color: #ff2b90;
              border-radius: 0.05rem;
              background-color: #0e061b;
            }
          }
          .value {
            display: flex;
            align-items: center;
            .val_num {
              display: block;
              min-width: 0.46rem;
              max-width: 0.6rem;
              height: auto;
              margin-right: 0.05rem;
              padding: 0.01rem 0.06rem;
              border-radius: 0.05rem;
              line-height: 0.23rem;
              background-color: #732aff;
              text-align: center;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
    }
  }
`;
