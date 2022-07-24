import { Link } from "react-router-dom";
import styled from "styled-components";

import { observer } from "mobx-react-lite";
import { withTranslation } from "react-i18next";
import { Dropdown, Menu } from "antd";

export default withTranslation()(
  observer((props: any) => {
    let { current = "join", t, i18n } = props;
    const menu = () => {
      return (
        <Menu
          selectedKeys={[i18n.language]}
          onClick={({ key }) => {
            i18n.changeLanguage(key);
          }}
        >
          <Menu.Item key={"en"}>English</Menu.Item>
          <Menu.Item key={"cn"}>简体中文</Menu.Item>
          <Menu.Item key={"ru"}>Русский</Menu.Item>
          <Menu.Item key={"fr"}>Français</Menu.Item>
          <Menu.Item key={"sa"}>عربي</Menu.Item>
          <Menu.Item key={"es"}>español</Menu.Item>
        </Menu>
      );
    };
    return (
      <FooterStyled>
        <Link className={`fomo ${current == "join" ? "cur" : null}`} to="/">
          {t("home.join")}
        </Link>
        <Link className={`rank ${current == "rank" ? "cur" : null}`} to="/rank">
          {t("rank.rank")}
        </Link>
        <Link
          className={`claim ${current == "claim" ? "cur" : null}`}
          to="/claim"
        >
          {t("claim.claim")}
        </Link>
        <div className="lanage_view">
          <Dropdown overlay={menu} placement="topLeft" trigger={["click"]}>
            <img src={createURL("icons/icon_translation.svg")} />
          </Dropdown>
        </div>
      </FooterStyled>
    );
  })
);

const FooterStyled = styled.div`
  position: relative;
  padding: 0.14rem 0.3rem 0.12rem;
  background-color: #732aff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  a {
    max-width: 33.333%;
    padding: 0 0.1rem;
    position: relative;
    color: #f2f2f2;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
  .lanage_view {
    position: absolute;
    right: 0.1rem;
    top: -0.4rem;
    z-index: 9;
    padding: 0.04rem;
    border-radius: 50%;
    background-image: linear-gradient(90deg, #732aff, #d627fd);
    font-size: 0;
    img {
      width: 0.2rem;
      height: 0.2rem;
      object-fit: contain;
    }
  }
`;
