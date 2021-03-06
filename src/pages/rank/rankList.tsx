import { observer } from "mobx-react-lite";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFlip } from "swiper";
import "swiper/css";
import "swiper/css/effect-flip";
import { useRef } from "react";
import styled from "styled-components";
import Title from "../components/title";
import { useRank } from "@/lib/rank";
import { withTranslation } from "react-i18next";
import Button from "../components/button";
export default withTranslation()(
  observer((props: any) => {
    const { thisRound, lastRound } = useRank();
    const { t } = props;
    const swiperRef = useRef<any>();
    const formatAddress = (a: string) => {
      return `${a.slice(0, 6)}..${a.slice(38)}`;
    };
    return (
      <SwiperView>
        <Swiper
          className="swiper_view"
          slidesPerView={1}
          modules={[EffectFlip]}
          effect="flip"
          flipEffect={{ slideShadows: false }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          <SwiperSlide className="slide_item" key={0}>
            <div className="item_view">
              <Title className="item_title">{t("rank.thisRound")}</Title>
              <div className="rank_list">
                <div className="list_title">
                  <div>{t("rank.ranking")}</div>
                  <div>{t("rank.inv")}</div>
                  <div className="ad">{t("rank.address")}</div>
                </div>
                <div className="list_body">
                  {thisRound.map((item, index) => {
                    return (
                      <div key={index} className="list_item">
                        <div className="index">{index + 1}</div>
                        <div>{item.count}</div>
                        <div className="ad">{formatAddress(item.user)}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="view_btn">
                <Button
                  onClick={() => {
                    swiperRef.current.slideNext();
                  }}
                >
                  {t("rank.lastBtn")}
                </Button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="slide_item" key={1}>
            <div className="item_view last_view">
              <Title
                className="item_title"
                style={{
                  color: "#ff2b90",
                  backgroundImage: `url(${createURL("title_bg_pink.png")})`,
                }}
              >
                {t("rank.lastRound")}
              </Title>
              <div className="rank_list">
                <div className="list_title">
                  <div>{t("rank.ranking")}</div>
                  <div>{t("rank.inv")}</div>
                  <div className="ad">{t("rank.address")}</div>
                </div>
                <div className="list_body">
                  {lastRound.map((item, index) => {
                    return (
                      <div key={index} className="list_item">
                        <div className="index">{index + 1}</div>
                        <div>{item.count}</div>
                        <div className="ad">{formatAddress(item.user)}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="view_btn">
                <Button
                  className="liner"
                  onClick={() => {
                    swiperRef.current.slidePrev();
                  }}
                >
                  {t("rank.thisBtn")}
                </Button>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </SwiperView>
    );
  })
);

const SwiperView = styled.div`
  width: 100%;
  .swiper_view {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  .slide_item {
    width: 100%;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    .item_view {
      padding: 0.1rem 0.16rem 0.3rem;
      background: url(${createURL("this_round_bg.png")}) no-repeat center
        bottom/100% 100%;

      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      .item_title {
        margin-top: -0.25rem;
      }
      &.last_view {
        background: url(${createURL("last_round_bg.png")}) no-repeat center
          bottom/100% 100%;
        .rank_list {
          .list_body {
            border-color: #ff2b90;
          }
          .list_title {
            border-color: #ffb22d;
          }
          .list_item {
            border-color: #ff2b90;
            & > div {
              &.index {
                color: #ff2b90;
              }
            }
          }
        }
      }
      .view_btn {
        margin-top: 0.26rem;
        text-align: center;
        img {
          height: 0.4rem;
          object-fit: contain;
        }
        .liner {
          background-image: linear-gradient(to right, #222, #222),
            linear-gradient(90deg, #5818d8, #9a6df0);
          .inner {
            background-image: linear-gradient(90deg, #5818d8, #9a6df0);
          }
        }
      }
      .rank_list {
        margin-top: 0.1rem;
        min-height: 2.8rem;

        .list_body {
          margin-top: -0.05rem;
          padding: 0.05rem 0.06rem 0;
          border: 1px solid #732aff;
          border-top: none;
        }
        .list_title {
          display: flex;
          align-items: center;
          background: url(${createURL("rank_list_tit_bg.png")}) no-repeat center
            bottom/100% 100%;

          padding: 0.1rem 0.06rem;
          & > div {
            flex: 1.5;
            width: 0;
            font-size: 0.15rem;
            line-height: 1;
            text-align: center;
            color: #f2f2f2;
            &.ad {
              flex: 2;
              padding-left: 0.1rem;
              text-align: left;
            }
          }
        }
        .list_item {
          display: flex;
          align-items: center;
          padding: 0.09rem;
          border-bottom: 1px solid #732aff;
          &:last-child {
            border-bottom: none;
          }
          & > div {
            flex: 1.5;
            width: 0;
            font-size: 0.16rem;
            line-height: 1;
            text-align: center;
            color: #f2f2f2;
            &.index {
              color: #d627fd;
            }
            &.ad {
              flex: 2;
              padding-left: 0.1rem;
              text-align: left;
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
