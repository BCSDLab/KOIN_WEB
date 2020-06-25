import React, { useEffect } from 'react'
import styled, { css } from 'styled-components';
import ReactQuill from 'react-quill';
import '../../static/quill.snow.css';

const PromotionHead = styled.div`
  border-top: 2px solid #175c8e;
  border-bottom: 1px solid #175c8e;
  padding: 14px 10px;
  
  @media (max-width: 576px) {
    border-bottom: 1px solid #e7e7e7;
    padding: 14px 0 16px;
  }
`;

const PromotionTitle = styled.div`
  display: flex;
  flex-direction: row;
  
  @media (max-width: 576px) {
    flex-direction: column;
    border-bottom: 1px solid #e7e7e7;
    padding: 0 16px;
  }
`;

const TextInput = styled.input`
  border: 0;
  font-family: NanumBarunGothic, serif;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  color: #252525;
  font-size: 20px;
  width: 610px;
  height: 30px;

  &::placeholder {
    color: #bec9d5;
    letter-spacing: -1px;
  }
  
  @media (max-width: 576px) {
    font-family: NanumSquareR;
    line-height: 1.13;
    letter-spacing: -0.8px;
    margin: 19px 0 20px;
    font-size: 16px;
    width: 100%;
    order: 2;
    
    &::placeholder {
      color: #e7e7e7;
    }
  }
  
  ${props => props.type === 'summary' && css`
    height: 26px;
    padding-left: 10px;
    font-size: 14px;
    flex: auto;
    
    @media (max-width: 576px) {
      margin: 0;
      order: unset;
      font-size: 16px;
      height: 20px;
      padding: 0;
    }
  `}
`;

const PromotionShop = styled.div`
  width: 225px;
  height: 30px;
  order: 2;
  display: flex;
  
  & span {
    font-family: NanumBarunGothic, serif;
    font-size: 14px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 2;
    letter-spacing: normal;
    text-align: left;
    color: #175c8e;
    flex: none;
    margin-right: 21px;
  }
  
  @media (max-width: 576px) {
    width: 179px;
    order: 1;
    
    & span {
      display: none;
    }
  }
`;

const ShopSelectWrapper = styled.div`
  width: 149px;
  height: 30px;
  border: solid 1px #175c8e;
  position: relative;
  flex: none;
  
  & label {
    position: absolute;
    top: 0;
    left: 0;
    width: 113px;
    padding: 5px 25px 5px 11px;
    border-radius: 0;
    line-height: 1.4;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  &::after {
    content: "";
    background-image:  url(https://static.koreatech.in/assets/img/ic_arrow%403x.png);
    background-size: 12px 12px;
    background-repeat: no-repeat;
    display: inline-block;
    width: 12px;
    height: 12px;
    position: absolute;
    top: 9px;
    right: 13px;
  }
  
  @media (max-width: 576px) {
    width: 179px;
    
    & label {
      width: 153px;
      text-align: center;
    }
    
    &::before {
      content: "";
      background-image: url("https://static.koreatech.in/assets/img/ic_store%403x.png");
      background-repeat: no-repeat;
      background-size: 20px;
      position: absolute;
      top: 5px;
      left: 12px;
      width: 20px;
      height: 20px;
      display: block;
    }
  }
`;

const ShopSelect = styled.select`
  width: 100%;
  height: 100%;
  position: relative;
  font-size: 14px;
  flex: none;
  appearance: none;
  opacity: 0;
  
  &::placeholder {
    font-family: SegoeUI;
  }
`;

const PromotionSummary = styled.div`
  margin-top: 20px;
  height: 30px;
  display: flex;
  
  & label {
    font-family: NanumBarunGothic, serif;
    font-size: 14px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 2;
    letter-spacing: normal;
    text-align: left;
    color: #175c8e;
    flex: none;
  }
  
  @media (max-width: 576px) {
    padding: 0 16px 18px;
    height: 20px;
    border-bottom: 1px solid #e7e7e7;
    
    & label {
      display: none;
    }
  }
`;

const SummaryFieldWrapper = styled.div`
  width: 757px;
  height: 28px;
  margin-left: 13px;
  flex: none;
  border: 1px solid #175c8e;
  display: flex;
  
  @media (max-width: 576px) {
    width: 100%;
    height: 20px;
    border: 0;
    margin: 0;
  }
`;

const HelpPopupWrapper = styled.div`
  margin: 5px 9px;
  width: 18px;
  height: 18px;
  flex: none;
  position: relative;
  
  @media (max-width: 576px) {
    margin: 0 4px;
  }
`;

const HelpPopupButton = styled.button`
  margin: auto;
  width: 100%;
  height: 100%;
  padding: 0;
  border: 1px solid #f7941e;
  border-radius: 9px;
  font-family: AppleSDGothicNeoEB00;
  font-size: 15px;
  text-indent: 1px;
  font-weight: bold;
  line-height: 0.6;
  color: #f7941e;
  background-color: white;
  tab-index: -1;
  cursor: pointer;
  
  ${props => props.value && css`
    color: white;
    background-color: #f7941e;
  `}
`;

const HelpPopupContainer = styled.div`
  position: relative;
  width: 375px;
  top: -1px;
  left: -366px;
  z-index: 1;
  
  @media (max-width: 576px) {
    width: 270px;
    left: -260px;
  }
`;

const HelpPopupArrow = styled.div`
  width: 12px;
  height: 16px;
  position: absolute;
  right: 0;
  background-color: #e8e7e7;
  clip-path: polygon(100% 0, 100% 100%, 0 100%);
  
  &::before {
    display: block;
    content: "";
    width: 10px;
    height: 15px;
    position: absolute;
    top: 1px;
    left: 1px;
    background-color: white;
    clip-path: polygon(100% 0, 100% 100%, 0 100%);
  }
  
  @media (max-width: 576px) {
    width: 8px;
    height: 19px;
    
    &::before {
      top: 18px;
      padding: 16px;
    }
  }
`;

const HelpPopup = styled.div`
  position: absolute;
  top: 14px;
  right: 0;
  border: 1px solid #e8e7e7;
  width: 100%;
  padding: 10px;
  background-color: #ffffff;
  font-family: NanumBarunGothic;
  font-size: 12px;
  line-height: 1.42;
  letter-spacing: normal;
  text-align: left;
  word-break: break-word;
  color: #707070;
  
  & span {
    font-weight: bold;
    color: #175c8e;
  }
  
  & span:first-child {
    display: block;
    font-family: NanumBarunGothic;
    font-size: 13px;
    line-height: 1.46;
    font-weight: normal;
    letter-spacing: normal;
    text-align: left;
    color: #252525;
    margin-bottom: 13px;
  }
  
  &::after {
    content: "";
    display: block;
    width: 100%;
    height: 145px;
    background-image: url("https://static.koreatech.in/assets/img/ic_pc-store.png");
    background-repeat: no-repeat;
    background-size: 100% 145px;
    margin-top: 15px;
  }
  
  @media (max-width: 576px) {
    top: 18px;
    padding: 16px;
    
    &::after {
      width: 141px;
      height: 174px;
      margin-right: auto;
      margin-left: auto;
      background-size: 141px 174px;
      background-image: url("https://static.koreatech.in/assets/img/ic_mobile-store.png");
    }
  }
`;

const PromotionPeriod = styled.div`
  margin-top: 20px;
  height: 30px;
  display: flex;
  line-height: 2;
  
  & span {
    font-family: NanumBarunGothic, serif;
    font-size: 14px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 2;
    letter-spacing: normal;
    text-align: left;
    color: #175c8e;
    flex: none;
    margin-right: 7px;
  }
  
  @media (max-width: 576px) {
    margin-top: 14px;
    justify-content: center;
    
    & span {
      display: none;
    }
  }
`;

const PromotionAuthor = styled.div`
  margin-top: 20px;
  height: 15px;
  display: flex;
  font-family: NanumBarunGothic, serif;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.15;
  letter-spacing: normal;
  text-align: left;
  color: rgba(133, 133, 133, 0.6);
  
  & span {
    margin-right: 32px;
    font-size: 14px;
    color: #175c8e;
    flex: none;
  }
  
  @media (max-width: 576px) {
    display: none;
  }
`;

const WarningText = styled.div`
  margin-top: 2px;
  opacity: 0.5;
  font-family: NanumBarunGothic, serif;
  font-size: 13px;
  line-height: 1.15;
  letter-spacing: normal;
  text-align: right;
  color: #f7941e;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  
  & span {
    margin-right: 8px;
    width: 13px;
    height: 13px;
    border: 1px solid #f7941e;
    border-radius: 7px;
    font-family: SegoeUI;
    font-weight: 600;
    font-size: 11px;
    text-align: center;
    text-indent: 1px;
  }
  
  @media (max-width: 576px) {
    font-size: 12px;
    position: absolute;
    top: 353px;
    width: 100%;
    text-align: center;
    justify-content: center;
    z-index: -1;
    
    & span {
      margin-right: 6px;
    }
  }
  
  @media (max-width: 498px) {
    top: 379px;
  }
`;

const DatePickerField = styled.div`
  display: flex;
  display: -ms-flexbox;
  -ms-flex-direction: row;
  justify-content: flex-start;
  width: 147px;
  border: 1px solid #175c8e;
  padding: 5px 0;
  height: 18px;
  margin: 0 7px;
  
  & label {
    display: block;
    flex: none;
    margin-left: 12px;
    margin-right: 2px;
    width: 19px;
    height: 19px;
    cursor: pointer;
    color: #707070;
    line-height: 1.7;
    background-image: url("https://static.koreatech.in/assets/img/ic_calendar%403x.png");
    background-repeat: no-repeat;
    background-size: 19px 19px;
  }
`;

const DatePicker  = styled.input.attrs({type: 'date'})`
  border: 0;
  width: 122px;
  font-family: NanumBarunGothic, serif;
  font-size: 13px;
  
  &::-webkit-inner-spin-button,
  &::-webkit-clear-button {
    display: none;
  }
  
  &::-webkit-calendar-picker-indicator {
    opacity: 100;
    visibility: visible;
  }
`;

const PromotionBody = styled.div`
  text-align: left;
  padding: 20px 5px 36px;
  font-family: NanumBarunGothic, serif;
  font-size: 15px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.73;
  letter-spacing: -0.8px;
  color: #555555;
  border-bottom: 1px solid #175c8e;
  overflow-y: hidden;
  -ms-overflow-style: none;
  height: 472px;
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  @media (max-width: 576px) {
    padding: 0;
    border: 0;
    height: auto;
  }
`;

const PromotionFooter = styled.div`
  margin-top: 38px;
  display: flex;
  justify-content: center;
  position: relative;
  
  @media (max-width: 576px) {
    position: unset;
  }
`;

const EditButton = styled.input.attrs({type: 'button'})`
  font-size: 13px;
  letter-spacing: -0.7px;
  color: white;
  background: #175c8e;
  border: 1px solid #175c8e;
  margin: 0 5px;
  padding: 0;
  width: 74px;
  height: 30px;
  cursor: pointer;
  flex: none;
  
  @media (max-width: 576px) {
    top: 0;
    height: 56px;
    margin: 0;
    position: absolute;
    color: #ffffff;
    font-size: 15px;
    font-weight: 500;
    line-height: 1.36;
    letter-spacing: -0.7px;
    padding: 16px;
    border: none;
    right: 0;
    z-index: 21;
  }
`;

const CancelButton = styled.input.attrs({type: 'button'})`
  font-size: 13px;
  letter-spacing: -0.7px;
  color: white;
  background: #909090;
  border: 1px solid #909090;
  margin: 0 5px;
  padding: 0;
  width: 74px;
  height: 30px;
  cursor: pointer;
  flex: none;
  
  @media (max-width: 576px) {
    top: 0;
    height: 56px;
    margin: 0;
    position: absolute;
    background: #175c8e;
    color: #ffffff;
    font-size: 15px;
    font-weight: 500;
    line-height: 1.36;
    letter-spacing: -0.7px;
    padding: 16px;
    border: none;
    left: 0;
    z-index: 21;
  }
`;



export default function PromotionEdit({
  type,
  title,
  summary,
  content,
  start,
  end,
  shop,
  shops,
  helpButtonFlag,
  editorRef,
  modules,
  imageUpload,
  onChangeTitle,
  onChangeSummary,
  onChangeContent,
  onChangeStart,
  onChangeEnd,
  onChangeShop,
  onClickHelpButton,
  onClickEditButton,
  onClickCancelButton
}) {
  const filterShop = (id, array) => array.find(value => String(value.shop_id) === id) || "";

  useEffect(() => {
    editorRef.current.editor.getModule("toolbar").addHandler('image', imageUpload);
  }, [editorRef])

  return (
    <>
      <PromotionHead>
        <PromotionTitle>
          <TextInput
            value={title}
            name="title"
            placeholder="제목을 입력해주세요. (20자 이내)"
            onChange={onChangeTitle} />
          <PromotionShop>
            <span>상점 선택</span>
            <ShopSelectWrapper>
              <label htmlFor="shop">{filterShop(shop, shops).name}</label>
              <ShopSelect
                id="shop"
                name="shop"
                value={shop}
                onChange={onChangeShop}>
                {shops.map(value => (
                  <option
                    value={Number(value.shop_id)}
                    key={value.shop_id}>
                    {value.name}
                  </option>
                ))}
              </ShopSelect>
            </ShopSelectWrapper>
          </PromotionShop>
        </PromotionTitle>
        <PromotionSummary>
          <label htmlFor="summary">홍보 문구</label>
          <SummaryFieldWrapper>
            <TextInput
              id="summary"
              value={summary}
              name="summary"
              type="summary"
              placeholder="홍보문구를 입력해주세요. (50자 이내)"
              onChange={onChangeSummary}/>
            <HelpPopupWrapper>
              <HelpPopupButton value={helpButtonFlag} onClick={onClickHelpButton}>?</HelpPopupButton>
              {helpButtonFlag && (
                <HelpPopupContainer>
                  <HelpPopup>
                    <span>제목과 홍보문구는 자유게시판 상단의 배너에 들어가게 됩니다.</span>
                    예시)
                    <br/>
                    <span>제목 : </span>옛날통닭 시험기간 50% 할인 이벤트!
                    <br/>
                    <span>홍보 문구 : </span>시험기간에 지친 한기대 학생들을 위해 준비한 특별 이벤트! 높치면 후회합니다 지금바로 시키세요 ~^^
                    <br/>
                    <span>행사 기간 : </span>11월 7일 ~ 22일
                  </HelpPopup>
                  <HelpPopupArrow />
                </HelpPopupContainer>
              )}
            </HelpPopupWrapper>
          </SummaryFieldWrapper>
        </PromotionSummary>
        <PromotionPeriod>
          <span>행사기간</span>
          <DatePickerField>
            <label htmlFor="start"/>
            <DatePicker
              data-testid="start"
              id="start"
              name="start"
              value={start}
              onChange={onChangeStart} />
          </DatePickerField>
          ~
          <DatePickerField>
            <label htmlFor="end"/>
            <DatePicker
              data-testid="end"
              id="end"
              name="end"
              value={end}
              onChange={onChangeEnd}/>
          </DatePickerField>
        </PromotionPeriod>
        <PromotionAuthor>
          <span>닉네임</span>
          { sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem("userInfo")).nickname : "" }
        </PromotionAuthor>
        {!content &&
        <WarningText>계정 당 하나의 게시물을 작성하여 업데이트, 수정 할 수 있습니다.<span>!</span></WarningText>
        }
      </PromotionHead>
      <PromotionBody>
        <ReactQuill
          ref={editorRef}
          value={content}
          onChange={onChangeContent}
          modules={modules}
          style={{height: '425px'}} />
      </PromotionBody>

      <PromotionFooter>
        <CancelButton
          value="취소"
          onClick={onClickCancelButton}/>
        <EditButton
          value={type}
          onClick={onClickEditButton}/>
      </PromotionFooter>
    </>
  )
}
