import { useEffect, useMemo, useState } from 'react'

import { observer } from 'mobx-react-lite'

import styled from 'styled-components'
import { usePool } from '@/lib/pool'
import { Params } from '@/lib/address'
export default observer((props: any) => {
  const { isClosed } = usePool()
  const [seconds, setSeconds] = useState(0)
  useEffect(() => {
    if (isClosed) {
      setSeconds(0)
      return
    }
    const timmer = setInterval(() => {
      const now = (Date.now() / 1000) << 0
      setSeconds(Params.rankCD - ((now - Params.rankOffset) % Params.rankCD))
    }, 1000)
    return () => clearInterval(timmer)
  }, [isClosed])
  const getSingleNum = (numStr: string, index: number) => {
    if (index > 0) {
      return numStr.substring(index)
    } else {
      return numStr.substring(index, 1)
    }
  }
  const display = useMemo(() => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds - hours * 3600) / 60)
    const _seconds = Math.floor(seconds % 60)
    return {
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: _seconds.toString().padStart(2, '0'),
    }
  }, [seconds])
  return (
    <CountDownStyle>
      <div className="count_box">
        <div className="fado">FDAO</div>
        <div className="count_content">
          <div className="count_item">
            <div>
              <div className="num">{getSingleNum(display.hours, 0)}</div>
              <div className="num">{getSingleNum(display.hours, 1)}</div>
            </div>
            <div className="txt">
              <img src={createURL('icons/icon_hrs.png')} />
            </div>
          </div>
          <div className="colon">:</div>
          <div className="count_item">
            <div>
              <div className="num">{getSingleNum(display.minutes, 0)}</div>
              <div className="num">{getSingleNum(display.minutes, 1)}</div>
            </div>
            <div className="txt">
              <img src={createURL('icons/icon_mins.png')} />
            </div>
          </div>
          <div className="colon">:</div>
          <div className="count_item">
            <div>
              <div className="num">{getSingleNum(display.seconds, 0)}</div>
              <div className="num">{getSingleNum(display.seconds, 1)}</div>
            </div>
            <div className="txt">
              <img src={createURL('icons/icon_secs.png')} />
            </div>
          </div>
        </div>
      </div>
    </CountDownStyle>
  )
})
const CountDownStyle = styled.div`
  padding: 0.05rem 0.16rem 0;
  .count_box {
    width: 100%;
    height: 0.92rem;
    background: url(${createURL('count_bg.png')}) no-repeat center / contain;
  }
  .fado {
    position: relative;
    top: -0.04rem;
    line-height: 1;
    font-size: 0.18rem;
    text-align: center;
    color: #732aff;
  }
  .count_content {
    margin-top: 0.15rem;
    display: flex;
    justify-content: center;
    .colon {
      padding: 0 0.07rem;
      font-size: 0.24rem;
      font-weight: bold;
    }
    .count_item {
      width: 0.76rem;
      display: flex;
      flex-flow: column nowrap;
      .num {
        display: inline-block;
        width: 0.36rem;
        height: 0.38rem;
        line-height: 0.38rem;
        font-size: 0.24rem;
        font-weight: 600;
        background: url(${createURL('count_num_bg.png')}) no-repeat center/contain;
        &:last-child {
          margin-left: 0.03rem;
        }
      }
      .txt {
        line-height: 1;
        img {
          height: 0.1rem;
          object-fit: contain;
        }
      }
    }
  }
`
