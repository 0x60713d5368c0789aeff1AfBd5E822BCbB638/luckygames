import { useEffect, useMemo, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import { observer } from "mobx-react-lite";

import styled from "styled-components";
import Title from "../components/title";
import Modal from "@/components/ui/Modal";
import { useLucky } from "@/lib/lucky";
import { useRank } from "@/lib/rank";
import { usePool } from "@/lib/pool";
import { Params } from "@/lib/address";
import { useInvited } from "@/lib/invited";
import { Link, useHistory } from "react-router-dom";
import { withTranslation } from "react-i18next";
import Button from "../components/button";

export default withTranslation()(
  observer((props: any) => {
    const {
      income,
      dividends,
      bonus,
      claim,
      totalBonus,
      totalDividends,
      totalPay,
      invited,
    } = useLucky();
    const { totalReward } = useRank();
    const pool = usePool();
    const { t } = props;
    const [loading, setLoading] = useState(false);

    const [seconds, setSeconds] = useState(0);
    const history = useHistory();
    useEffect(() => {
      if (totalPay.eq(0) || pool.isClosed || income.gte(400)) {
        setSeconds(0);
        return;
      }
      const timmer = setInterval(() => {
        const now = (Date.now() / 1000) << 0;
        setSeconds(Params.CD - ((now - Params.offset) % Params.CD));
      }, 1000);
      return () => clearInterval(timmer);
    }, [pool.isClosed, income, totalPay]);
    const display = useMemo(() => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds - hours * 3600) / 60);
      const _seconds = Math.floor(seconds % 60);
      return {
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: _seconds.toString().padStart(2, "0"),
      };
    }, [seconds]);

    const handleLuckyClaim = () => {
      setLoading(true);
      claim()
        .then(() => {
          Modal.success("Claim success");
        })
        .catch((err) => {
          Modal.error(err);
        })
        .finally(() => setLoading(false));
    };

    const handlePoolClaim = () => {
      setLoading(true);
      pool
        .claim()
        .then(() => {
          Modal.success("Claim success");
        })
        .catch((err) => {
          Modal.error(err);
        })
        .finally(() => setLoading(false));
    };

    const invitedUsers = useInvited(0); // page starts with 0, pageSize = 20

    return (
      <ViewStyled>
        <Header />
        <ContentStyle>
          {/*My income*/}
          <div className="card_view">
            <div className="card_bg lg">
              <Title className="card_title">{t("claim.myIncome")}</Title>
              <div className="card_content">
                <div className="list_view">
                  <div className="list_item">
                    <label>{t("claim.countdown")}</label>
                    <div className="time_view">
                      <span>{display.hours}H</span>:
                      <span>{display.minutes}M</span>:
                      <span>{display.seconds}S</span>
                    </div>
                  </div>
                  <div className="list_item">
                    <label>{t("claim.maxProfit")}</label>
                    <div className="value">
                      <span className="val_num">400</span>
                      <span className="val_unit">FDAO</span>
                    </div>
                  </div>
                  <div className="list_item">
                    <label>{t("claim.revenue")}</label>
                    <div className="value">
                      <span className="val_num">{income.toFixed(2)}</span>
                      <span className="val_unit">FDAO</span>
                    </div>
                  </div>
                  <div className="list_item">
                    <label>{t("claim.dividends")}</label>
                    <div className="value">
                      <span className="val_num">
                        {pool.isClosed ? "0.00" : dividends.toFixed(2)}
                      </span>
                      <span className="val_unit">FDAO</span>
                    </div>
                  </div>
                  <div className="list_item">
                    <label>{t("claim.bonus")}</label>
                    <div className="value">
                      <span className="val_num">
                        {pool.isClosed ? "0.00" : bonus.toFixed(2)}
                      </span>
                      <span className="val_unit">FDAO</span>
                    </div>
                  </div>
                  <div className="list_item">
                    <label>{t("claim.tWithdrawable")}</label>
                    <div className="value">
                      <span className="val_num">
                        {pool.isClosed
                          ? "0.00"
                          : dividends.add(bonus).toFixed(2)}
                      </span>
                      <span className="val_unit">FDAO</span>
                    </div>
                  </div>
                </div>
                <div className="card_btm_btn">
                  <Button
                    disabled={loading || dividends.add(bonus).lte(0)}
                    onClick={handleLuckyClaim}
                  >
                    {t("claim.claimBtn")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {/*My rank prize*/}
          <div className="card_view">
            <div className="card_bg">
              <Title className="card_title">{t("claim.myRank")}</Title>
              <div className="card_content">
                <div className="list_view list_bg">
                  <div className="list_item">
                    <label>{t("claim.total")}</label>
                    <div className="value">
                      <span className="val_num">{totalReward.toFixed(2)}</span>
                      <span className="val_unit">FDAO</span>
                    </div>
                  </div>
                  {/* <div className="list_item">
                  <label>Withdrawable</label>
                  <div className="value">
                    <span className="val_num">400</span>
                    <span className="val_unit">FDAO</span>
                  </div>
                </div> */}
                </div>
                {/* <div className="card_btm_btn">
                <a href="">
                  <img src={createURL('btns/btn_claim.png')} />
                </a>
              </div> */}
              </div>
            </div>
          </div>
          {/*My lucky prize*/}
          <div className="card_view">
            <div className="card_bg">
              <Title className="card_title">{t("claim.myLucky")}</Title>
              <div className="card_content">
                <div className="list_view list_bg">
                  <div className="list_item">
                    <label>{t("claim.projectedLucky")}</label>
                    <div className="value">
                      <span className="val_num">{pool.income.toFixed(2)}</span>
                      <span className="val_unit">FDAO</span>
                    </div>
                  </div>
                  <div className="list_item">
                    <label>{t("claim.withdrawable")}</label>
                    <div className="value">
                      <span className="val_num">
                        {pool.isClosed ? pool.income.toFixed(2) : "0.00"}
                      </span>
                      <span className="val_unit">FDAO</span>
                    </div>
                  </div>
                </div>
                <div className="card_btm_btn">
                  <Button
                    disabled={loading || pool.income.lte(0) || !pool.isClosed}
                    onClick={handlePoolClaim}
                  >
                    {t("claim.claimBtn")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {/*My data*/}
          <div className="card_view">
            <div className="card_bg">
              <Title className="card_title">{t("claim.myData")}</Title>
              <div className="card_content">
                <div className="list_view list_bg">
                  <div className="list_item">
                    <label>{t("claim.tDividends")}</label>
                    <div className="value">
                      <span className="val_num">
                        {totalDividends.toFixed(2)}
                      </span>
                      <span className="val_unit">FDAO</span>
                    </div>
                  </div>
                  <div className="list_item">
                    <label>{t("claim.tBonus")}</label>
                    <div className="value">
                      <span className="val_num">{totalBonus.toFixed(2)}</span>
                      <span className="val_unit">FDAO</span>
                    </div>
                  </div>
                  <div className="list_item">
                    <label>{t("claim.tJoin")}</label>
                    <div className="value">
                      <span className="val_num">{totalPay.toFixed(2)}</span>
                      <span className="val_unit">FDAO</span>
                    </div>
                  </div>
                  <div className="list_item">
                    <label>{t("claim.tInvitations")}</label>
                    <div className="value">
                      <span className="val_num">{invited}</span>
                      <span className="val_unit">USER</span>
                    </div>
                  </div>
                </div>
                <div className="card_btm_btn">
                  <Button
                    onClick={() => {
                      history.push("/invitees");
                    }}
                  >
                    {t("claim.inviteesBtn")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </ContentStyle>
        <Footer current="claim" />
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
  padding: 0.25rem;
  overflow-y: auto;
  background: url(${createURL("page_bg.png")}) no-repeat center top/contain;
  .card_view {
    margin-top: 0.2rem;
    padding-bottom: 0.5rem;
    background: url(${createURL("home_btm_bg.png")}) no-repeat center bottom/80%;
    .card_bg {
      padding: 0.1rem 0.16rem 0.36rem;
      background: url(${createURL("card_view_bg.png")}) no-repeat center
        bottom/100% 100%;
      &.lg {
        background: url(${createURL("this_round_bg.png")}) no-repeat center
          bottom/100% 100%;
      }
      .card_title {
        margin-top: -0.25rem;
      }
    }

    .card_content {
      padding-top: 0.1rem;
      .card_btm_btn {
        margin-top: 0.3rem;
        text-align: center;
        button,
        a {
          outline: none;
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
              /* text-overflow: ellipsis; */
              white-space: nowrap;
            }
          }
        }
      }
    }
  }
`;
