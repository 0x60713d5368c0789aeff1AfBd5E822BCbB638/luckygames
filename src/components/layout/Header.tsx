import styled from 'styled-components'
import { useStores } from '@/hooks/index'
import { observer } from 'mobx-react-lite'
import { useWallet } from '@/lib/wallet'
import { useBalance } from '@/lib/balance'

export default observer(() => {
  const {
    Contracts: { fdao },
    connect,
    address,
  } = useWallet()
  const balance = useBalance(fdao, address)
  return (
    <HeaderStyled>
      <div className="header_container">
        <div className="header_left">
          <div className="header_coin">
            <img className="fomo_icon" src={createURL('icons/icon_coin_fomo.png')} />
            <div className="header_fomo_num">{balance.toDP(4).toString()}</div>
          </div>
        </div>
        <div className="header_logo">
          <img src={createURL('logo.png')} />
        </div>
        <div className="header_right">
          {address ? (
            <div className="right_btn">{address}</div>
          ) : (
            <div className="right_btn" onClick={() => connect()}>
              Connect
            </div>
          )}
        </div>
      </div>
    </HeaderStyled>
  )
})

const HeaderStyled = styled.div`
  width: 100%;
  height: 0.56rem;

  .header_container {
    padding: 0 0.15rem;
    height: 0.56rem;
    display: flex;
    background: url(${createURL('header_bg.png')}) no-repeat center/cover;
  }
  .header_left,
  .header_right {
    padding-top: 0.1rem;
    flex: 1;
  }
  .header_left {
    position: relative;
    padding-right: 0.1rem;
    overflow: hidden;
    .header_coin {
      height: 0.24rem;
      position: relative;
    }
    .fomo_icon {
      position: absolute;
      left: 0.05rem;
      top: 50%;
      width: 0.16rem;
      height: 0.16rem;
      transform: translateY(-50%);
      object-fit: contain;
    }
    .header_fomo_num {
      display: inline-block;
      max-width: 100%;
      padding: 0 0.12rem 0 0.3rem;
      line-height: 0.2rem;
      border: 2px solid transparent;
      background-color: #111;
      border-radius: 0.24rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      background-clip: padding-box, border-box;
      background-origin: padding-box, border-box;
      background-image: linear-gradient(to right, #222, #222), linear-gradient(90deg, #732aff, #d627fd);
    }
  }
  .header_right {
    text-align: right;
    .right_btn {
      display: inline-block;
      max-width: 0.7rem;
      padding: 0 0.08rem;
      line-height: 0.2rem;
      border: 2px solid transparent;
      color: #f2f2f2;
      border-radius: 0.24rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      background-clip: padding-box, border-box;
      background-origin: padding-box, border-box;
      background-image: linear-gradient(to right, #222, #222), linear-gradient(90deg, #732aff, #d627fd);
    }
  }
  .header_logo {
    padding-top: 0.1rem;
    width: 1.68rem;
    text-align: center;
    img {
      height: 0.38rem;
      width: 1.68rem;
      object-fit: contain;
    }
  }
`
