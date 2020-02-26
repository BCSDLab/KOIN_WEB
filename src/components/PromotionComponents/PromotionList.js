import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Pagination from '../SharedComponents/Pagination';
import ClipLoader from 'react-spinners/ClipLoader';

const FiltersWrapper = styled.div`
  border-top: #175c8e 3px solid;
  padding: 27px 0;
  height: 16px;
  
  @media (max-width: 576px) {
    border: 0;
    padding: 26px 16px 17px 0;
    height: 16px;
  }
`;

const Filter = styled.div`
  margin-left: 25px;
  color: #175c8e;
  letter-spacing: -0.6px;
  font-size: 12px;
  float: right;
  
  @media (max-width: 576px) {
    margin-left: 12px;
  }
`;

const FilterCheckbox = styled.input.attrs({type: 'checkbox'})`
  display: none;
  
  & + label {
    display: inline-block;
    cursor: pointer;
    position: relative;
    padding-left: 23px;
    font-family: NanumBarunGothic;
    text-align: left;
    width: content-box;
  }
  & + label::before {
    content: "";
    width: 12px;
    height: 12px;
    position: absolute;
    left: 0;
    bottom: 1px;
    background-color: #ffffff;
    border: 1px solid #d2dae2;
    line-height: 13px;
  }
  &:checked + label::before {
    content: "";
    background-image: url("https://static.koreatech.in/assets/img/check.png");
    background-color: #175c8e;
    border: 1px solid #175c8e;
    background-size: cover;
  }
`;

const PromotionWrapper = styled.div`
  margin-bottom: 73px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 336px;
  grid-column-gap: 22px;
  grid-row-gap: 33px;
  
  @media (max-width: 576px) {
    margin: 0 auto 39px;
    width: 328px;
    min-height: 471px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 226px;
    grid-column-gap: 12px;
    grid-row-gap: 19px;
  }
`;

const Promotion = styled(Link)`
  border: solid 1px #c0c0c0;
  width: 100%;
  background-color: #ffffff;
  cursor: pointer;
  position: relative;
  text-decoration: none;
  
  ${props => (props.disabled ? css`
    & ${PromotionCover} {
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 1;
    }
    & ${PromotionCoverText} {
      display: block;
    }
    
    @media (max-width: 576px) {
      & ${PromotionCoverText} {
        width: 46px;
        padding: 3px 0;
        font-size: 11px;
        line-height: 1.09;
      }
    }
  ` : css`
    @media (max-width: 576px) {
      &:hover ${PromotionStore} {
        color: #f7941e;
      }
    }
  `)}
`;

const PromotionCover = styled.div`
  width: 100%;
  position: absolute;
`;

const PromotionCoverText = styled.div`
  display: none;
  width: 49px;
  padding: 6px 0;
  background-color: #175c8e;
  font-family: NanumBarunGothic;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.17;
  letter-spacing: 0.6px;
  text-align: center;
  z-index: 2;
  color: #ffffff;
  position: absolute;
`;

const PromotionThumbnailWrapper = styled.div`
  margin: 19px auto 20px;
  width: 236px;
  height: 162px;
  position: relative;
  
  @media (max-width: 576px) {
    margin: 0;
    width: 100%;
    height: 106px;
    position: relative;
  }
  
  ${props => (!props.hasThumbnail && css`
    background: #cacaca;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 162px;
    text-align: center;
    vertical-align: middle;
    color: #999999;
    font-size: 15px;
    
    &::before {
      content: "no-image";
    }
    
    @media (max-width: 576px) {
      line-height: 106px;
    }
  `)}
`;

const PromotionThumbnail = styled.img`
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PromotionStore = styled.div`
  margin-top: 20px;
  font-family: NanumBarunGothic;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  text-align: center;
  color: #175c8e;

  @media (max-width: 576px) {
    margin-top: 10px;
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.14;
    letter-spacing: normal;
    text-align: center;
    color: #175c8e;
  }
`;

const PromotionTitle = styled.div`
  width: 230px;
  margin: 16px auto 0;
  font-family: NanumBarunGothic;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.2;
  letter-spacing: normal;
  text-align: center;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  color: #404040;
  
  @media (max-width: 576px) {
    width: 118px;
    height: 32px;
    margin: 10px 20px 0;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    word-break: break-all;
    line-height: 1.31;
    letter-spacing: normal;
    -webkit-line-clamp: 2;
    text-align: center;
    color: #252525;
  }
`;

const PromotionPeriod = styled.div`
  width: fit-content;
  margin: 10px auto 0;
  font-family: NanumBarunGothic;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.17;
  letter-spacing: normal;
  text-align: center;
  color: #7e7e7e;
  
  &::before {
    content: "행사기간:";
    line-height: 1.17;
  }
  
  @media (max-width: 576px) {
    margin: 10px auto 0;
    font-size: 12px;
    line-height: 1.17;
    color: #7e7e7e;
    
    &::before {
      display: inline-block;
      content: "";
      width: 8px;
      height: 11px;
      margin-right: 6px;
      background-image: url(https://stage-static.koreatech.in/upload/8c621c1a7b4e016debf3a1164b51d96b.png);
      background-size: cover
    }
  }
`;

const PromotionCreatedDate = styled.div`
  margin: 19px auto 0;
  opacity: 0.98;
  font-family: NanumBarunGothic;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.17;
  letter-spacing: -0.36px;
  text-align: center;
  color: #778391;
  
  &::before {
    content: "";
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-right: 5px;
    margin-bottom: -2px;
    background-image: url("https://static.koreatech.in/assets/img/ic_date.png");
    background-repeat: no-repeat;
    background-size: 12px 12px;
  }
  
  @media (max-width: 576px) {
    margin: 10px auto 0;
    font-size: 10px;
    line-height: 1.2;
    color: #9fa9b3;
    
    &::before {
      content: "";
      width: 10px;
      height: 10px;
      margin-right: 3px;
      margin-bottom: -2px;
      background-size: 10px 10px;
    }
  }
`;

const LoaderWrapper = styled.div`
  width: 834px;
  height: 680px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 576px) {
    width: 100%;
    height: 760px;
    border-bottom: 2px solid #175c8e;
  }
`;

export default function PromotionList ({
  totalPageNum,
  path,
  getPromotionList,
  promotions,
  filter,
  changeFilter,
  checkDisabled
}) {
  return (
    <>
      <FiltersWrapper>
        <Filter>
          <FilterCheckbox
            id="finished"
            name="finished"
            checked={filter & 1}
            onChange={() => changeFilter(filter, 1)} />
          <label htmlFor="finished">
            종료된 이벤트
          </label>
        </Filter>
        <Filter>
          <FilterCheckbox
            id="proceeding"
            name="proceeding"
            checked={filter & 2}
            onChange={() => changeFilter(filter, 2)} />
          <label htmlFor="proceeding">
            진행중 이벤트
          </label>
        </Filter>
      </FiltersWrapper>
      <PromotionWrapper>
        {promotions && promotions.map(promotion => (
          <Promotion
            to={'/board/promotion/' + promotion.id}
            disabled={checkDisabled(promotion.end_date)}
            key={promotion.id}>
            <PromotionCover>
              <PromotionCoverText>마감</PromotionCoverText>
            </PromotionCover>
            <PromotionThumbnailWrapper
              hasThumbnail={!!promotion.thumbnail} >
              {promotion.thumbnail && <PromotionThumbnail src={promotion.thumbnail} />}
            </PromotionThumbnailWrapper>
            <PromotionStore>{promotion.nickname}</PromotionStore>
            <PromotionTitle>{promotion.title}</PromotionTitle>
            <PromotionPeriod>{promotion.start_date.replace(/-/g, '.').slice(2, 10)} ~ {promotion.end_date.replace(/-/g, '.').slice(2, 10)}</PromotionPeriod>
            <PromotionCreatedDate>{promotion.created_at.replace(/-/g, '.').slice(0, 10)}</PromotionCreatedDate>
          </Promotion>
        ))}
      </PromotionWrapper>
      <Pagination
        totalPageNum={totalPageNum}
        setPageData={getPromotionList}
        path={path} />
    </>
  )
}