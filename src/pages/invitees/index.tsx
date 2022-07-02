import { useEffect, useMemo, useRef, useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper'
import { observer } from 'mobx-react-lite'
import Modal from '@/components/ui/Modal'
import styled from 'styled-components'
import copy from 'copy-to-clipboard'
import { useInvited } from '@/lib/invited'
export default observer(() => {
  const [invitedList, setList] = useState<string[]>([])
  const [page, setPage] = useState(0)
  const [nextDisabled, setNextDisabled] = useState(false)
  const swiperRef = useRef<any>()

  useEffect(() => {
    swiperRef.current.update()
  }, [invitedList.length])

  const invitedUsers = useInvited(page)

  useEffect(() => {
    if (invitedUsers.length == 0) {
      setNextDisabled(true)
      return
    }
    let tempList = [...invitedList, ...invitedUsers]
    setList(tempList)
  }, [invitedUsers])

  const formatAddress = (a: string) => {
    return `${a.slice(0, 6)}..${a.slice(38)}`
  }
  const copyAddress = (text: string) => {
    copy(text)
    Modal.success('copy success')
  }
  return (
    <ViewStyled>
      <Header />
      <ContentStyle>
        <Swiper
          className="swiper_view"
          slidesPerView={'auto'}
          modules={[FreeMode]}
          freeMode={true}
          direction={'vertical'}
          setWrapperSize={true}
          onSwiper={(swiper) => {
            swiperRef.current = swiper
          }}
          onMomentumBounce={(swiper) => {
            if (swiper.translate < -100) {
              if (!nextDisabled) {
                setPage(page + 1)
              }
            }
          }}
        >
          {invitedList.map((e: string) => {
            return (
              <SwiperSlide className="list_item" key={e}>
                <div>{formatAddress(e)}</div>
                <div
                  className="copy_btn"
                  onClick={() => {
                    copyAddress(e)
                  }}
                >
                  COPY
                </div>
              </SwiperSlide>
            )
          })}
          <div className="wrapper_end" slot="wrapper-end">
            {invitedList.length > 0 && <> {nextDisabled ? 'no more' : 'load more'}</>}
          </div>
        </Swiper>
      </ContentStyle>
      <Footer current="claim" />
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
  flex: 1;
  height: 100%;
  flex-shrink: 0;
  background: url(${createURL('page_bg.png')}) no-repeat center top/contain;
  overflow-y: auto;
  .swiper_view {
    padding: 0.2rem 0.25rem;
    width: 100%;
    height: 100%;
    .list_item {
      width: 100%;
      height: 0.4rem;
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
      .copy_btn {
        color: #fff;
        padding: 0.01rem 0.1rem;
        background-color: #732aff;
        border-radius: 0.1rem;
        font-size: 0.14rem;
      }
    }
  }
  .wrapper_end {
    padding: 0.1rem 0;
    text-align: center;
    font-size: 0.12rem;
  }
`
