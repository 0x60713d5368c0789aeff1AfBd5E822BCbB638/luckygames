import { useEffect, useMemo, useState } from 'react'

import { Link } from 'react-router-dom'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

import { observer } from 'mobx-react-lite'

import styled from 'styled-components'
import Countdown from './countdown'
import Title from '../components/title'
import { useBalance } from '@/lib/balance'
import { useWallet } from '@/lib/wallet'
import { useAddress } from '@/lib/address'
import { useLucky } from '@/lib/lucky'
import { usePool } from '@/lib/pool'
import { useApprove } from '@/lib/approve'
import Modal from '@/components/ui/Modal'

export default observer((props: any) => {
  const {
    Contracts: { fdao },
    address,
  } = useWallet()
  const Addresses = useAddress()
  const rankBalance = useBalance(fdao, Addresses.Rank)
  const { burned, join, active, income, totalPay } = useLucky()
  const { balance: poolBalance } = usePool()
  const { approve, approved } = useApprove(fdao, Addresses.Lucky, address)

  const [loading, setLoading] = useState(false)

  const handleJoin = async () => {
    setLoading(true)
    if (totalPay.gt(0)) {
      if (income.lt('400')) {
        Modal.error('conditions are not met')
        setLoading(false)
      } else if (!approved) {
        approve()
          .then(() => {
            Modal.success('Approve success, you can join now')
          })
          .catch((err) => {
            Modal.error(err)
          })
          .finally(() => setLoading(false))
      } else {
        active()
          .then(() => {
            Modal.success('Join success')
          })
          .catch((err) => {
            Modal.error(err)
          })
          .finally(() => setLoading(false))
      }
    } else if (!approved) {
      approve()
        .then(() => {
          Modal.success('Approve success, you can join now')
        })
        .catch((err) => {
          Modal.error(err)
        })
        .finally(() => setLoading(false))
    } else {
      join()
        .then(() => {
          Modal.success('Join success')
        })
        .catch((err) => {
          Modal.error(err)
        })
        .finally(() => setLoading(false))
    }
  }
  return (
    <ViewStyled>
      <Header />
      <ContentStyle>
        <HomeStyle>
          <div className="top_info">
            <img className="top_img" src={createURL('home_top_img.png')} />
            <div className="ranking_view">
              <div className="ranking_box">
                <div>
                  <Title>Ranking Pool</Title>
                </div>
                <div className="ranking_num">{rankBalance.toFixed(4)}</div>
                <div className="count_view">
                  <Countdown />
                </div>
              </div>
            </div>

            <div className="tips">
              <p>A FAIR GAME OF CONTRACT</p>
              <p>YOU MAYBE LOSE OR WIN FDAO</p>
              <p>PLEASE ONLY USE "100FDAO" TO PLAY!</p>
            </div>
            <div className="btn_view">
              <button disabled={loading} onClick={handleJoin}>
                <img className="btn_join" src={createURL('btns/btn_join_now.png')} />
              </button>
            </div>
          </div>
          <div className="lucky_pool_view">
            <div className="luck_box">
              <div className="box_item">
                <Title style={{ fontSize: '0.2rem' }}>Lucky Pool</Title>
                <div className="item_pd">
                  <div className="item_num_box">
                    <div className="num">{poolBalance.toFixed(2)}</div>
                    <div className="unit">FDAO</div>
                  </div>
                </div>
              </div>
              <div className="box_item">
                <Title style={{ fontSize: '0.2rem' }}>Burned FDAO</Title>
                <div className="item_pd">
                  <div className="item_num_box">
                    <div className="num">{burned.toFixed(2)}</div>
                    <div className="unit">FDAO</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </HomeStyle>
      </ContentStyle>
      <Footer />
    </ViewStyled>
  )
})
const ViewStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
`
const ContentStyle = styled.div`
  position: relative;
  flex: 1;
  height: 0;
  flex-shrink: 0;
  overflow-y: auto;
`
const HomeStyle = styled.div`
  .top_info {
    text-align: center;
    .top_img {
      width: 100%;
      object-fit: contain;
    }
    .tips {
      margin-top: 0.08rem;
      font-size: 0.12rem;
      line-height: 0.18rem;
      text-align: center;
      p {
        margin: 0;
      }
    }
    .ranking_view {
      position: relative;
      margin-top: -0.12rem;
      padding: 0 0.25rem;
      z-index: 2;
      .ranking_box {
        width: 100%;
        height: 2rem;
        background: url(${createURL('rank_pool_box.png')}) no-repeat center bottom/100% 100%;
      }
      .ranking_num {
        font-size: 0.3rem;
        font-weight: bold;
        text-shadow: 0 0 0.1rem #ff2b90;
      }
    }
  }

  .btn_view {
    margin-top: 0.2rem;
    text-align: center;
    a {
      display: inline-block;
    }
    .btn_join {
      height: 0.42rem;
      object-fit: contain;
    }
    button {
      background: none;
      outline: none;
    }
  }
  .lucky_pool_view {
    margin-top: 0.16rem;
    padding: 0 0.25rem 0.6rem;
    background: url(${createURL('home_btm_bg.png')}) no-repeat center bottom/80%;
    .luck_box {
      width: 100%;
      padding: 0.18rem;
      display: flex;
      align-items: center;
      background: url(${createURL('lucky_box.png')}) no-repeat center/100% 100%;
      .box_item {
        flex: 1;
        border: 1px solid transparent;
        border-radius: 0 0 0.1rem 0.1rem;
        background-color: #222;
        background-clip: padding-box, border-box;
        background-origin: padding-box, border-box;
        background-image: linear-gradient(to bottom, #222, #222), linear-gradient(to bottom, #732aff, #d627fd);
        &:last-child {
          margin-left: 0.08rem;
        }
        .item_pd {
          padding: 0.09rem;
          .item_num_box {
            padding: 0.06rem 0.06rem 0.04rem;
            background-color: #222222;
            border: 1px solid #732aff;
            border-radius: 0.1rem;
            text-align: center;
            .num {
              width: 100%;
              font-size: 0.16rem;
              background-color: rgba(115, 42, 255, 0.5);
              border-radius: 0.2rem;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .unit {
              font-size: 0.14rem;
              color: #732aff;
            }
          }
        }
      }
    }
  }
`
