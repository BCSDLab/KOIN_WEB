import React, { useEffect } from 'react'
import styled, { css } from 'styled-components';
import ReactQuill from 'react-quill';
import ClipLoader from 'react-spinners/ClipLoader';

const Container = styled.div`
  border-top: 2px solid #175c8e;
  @media (max-width: 576px) {
    border-top: none;
  }
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StateForm = styled.div`
  width: 100%;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 30px;
  @media (max-width: 576px) {
    display: none;
  }
`;

const Form = styled.div`
  @media (max-width: 576px) {
    display: none;
  }
`;

const Label = styled.p`
  color: #252525;
  letter-spacing: -0.8px;
  font-size: 15px;
  height: 15px;
  text-align: left;
  margin: 21.5px 40px 21.5px 0;

  @media (max-width: 576px) {
    font-size: 16px;
    margin: 0;
    width: 30%;
  }
`;

const InputField = styled.input`
  width: 506px;
  height: 41px;
  font-size: 15px;
  padding-left: 19px;
  padding-right: 19px;
  background-color: #ffffff;
  border: solid 1px #d2dae2;

  &::placeholder {
    color: #bec9d5;
  }

  @media (max-width: 576px) {
    font-size: 16px;
    width: 70%;
    height: 24px;
    border: none;
    padding: 0;
  }
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const CheckboxText = styled.label`
  display: inline-block;
  cursor: pointer;
  position: relative;
  padding-left: 20px;
  width: ${props => props.state ? '60px' : '40px'};
  font-size: 12px;
  line-height: 20px;
  /* margin: 5px 10px 0 0; */
  color: ${props => {
    if (props.state === 1) return '#175c8e';
    else if (props.state === 2) return '#ff2929';
    else if (props.state === 3) return '#858585';
  }};

  &:before {
    content: "";
    width: 16px;
    height: 16px;
    position: absolute;
    left: 0;
    bottom: 1px;
    background-color: #ffffff;
    border: ${props => {
      if (props.state === 1) return '1px solid #175c8e';
      else if (props.state === 2) return '1px solid #ff2929';
      else if (props.state === 3) return '1px solid #858585';
      else return '1px solid #d2dae2';
    }};
    line-height: 13px;
  }

  @media (max-width: 576px) {
    font-size: 16px;
    line-height: 1.5;
    letter-spacing: -0.8px;
    color: #252525;
    padding-left: 32px;
    width: auto;
    margin-right: 15px;
    padding-top: 2px;

    &:before {
      content: "";
      width: 24px;
      height: 24px;
      border: none;
      position: absolute;
      background-color: #ffffff;
    }
  }
`;

const Checkbox = styled.input`
  display: none;
  &:checked + ${CheckboxText}:before {
    content: "";
    background-image: url(${props => props.url || "https://static.koreatech.in/assets/img/check.png"});
    background-size: cover;
  }

  @media (max-width: 576px) {
    & + ${CheckboxText}:before {
      content: "";
      background-image: url("https://static.koreatech.in/assets/img/mobile__unchecked.png");
      background-size: cover;
    }
    &:checked + ${CheckboxText}:before {
      background-image: url("https://static.koreatech.in/assets/img/mobile__checked.png");
    }
  }
`;

const ImageInputDropbox = styled.div`
  outline: 1px dashed #d2dae2;
  background: transparent;
  width: 546px;
  height: 251px;
  position: relative;
  z-index: 0;
  cursor: pointer;
`;

const ImageInputField = styled.input`
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 3;
  cursor: pointer;

  @media (max-width: 576px) {
    top: 15px;
    left: 30%;
    width: 70%;
    height: 31px;
  }
`;

const ImageGuideText = styled.h2`
  text-align: center;
  position: absolute;
  top: 90px;
  left: 146px;
  letter-spacing: -0.8px;
  font-size: 15px;
  color: #175c8e;
`;

const ImageGuideButton = styled.button`
  position: absolute;
  top: 129px;
  letter-spacing: -0.8px;
  font-size: 13px;
  background: #175c8e;
  left: 211px;
  padding: 6px 14px;
  color: white;
  cursor: pointer;
  border: 1px solid #175c8e;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0.6;

  @media (max-width: 576px) {
    width: 55px;
    height: 55px;
    margin-right: 10px;
    opacity: 1;
    background: none;
  }
`;

const ImageDeleteButton = styled.button`
  position: absolute;
  top: 115px;
  left: 228px;
  padding: 6px 14px;
  font-size: 13px;
  background: #ff2929;
  color: white;
  z-index: 4;
  border: 1px solid #ff2929;
  cursor: pointer;
`;

const MobileImageButton = styled.button`
  border: 1px solid #a1a1a1;
  font-size: 12px;
  line-height: 1.42;
  letter-spacing: -0.6px;
  color: #252525;
  background-color: #ffffff;
  padding: 6px 9.4px 5.7px 10px;
  height: 30px;
`;

const LoaderStyle = css`
  position: absolute;
  top: 73.5px;
  left: 222px;
`;

const Body = styled.div`
  text-align: left;
  height: 522px;
  border-bottom: 1px solid #175c8e;
  @media (max-width: 576px) {
    border-bottom: none;
    ${Label} { 
      display: none;
    }
  }
`;

const Footer = styled.div`
  text-align: center;
  margin-top: 22px;
  @media (max-width: 576px) {
    display: none;
  }
`;

const ButtonStyle = css`
  font-size: 13px;
  color: white;
  letter-spacing: -0.7px;
  padding: 5px 26px;
  margin: 0 6px;
  cursor: pointer;
`;

const CancelButton = styled.button`
  ${ButtonStyle}
  background: #909090;
  border: 1px solid #909090;
`;

const EditButton = styled.button`
  ${ButtonStyle}
  background: #175c8e;
  border: 1px solid #175c8e;
`;

const MobileWrapper = styled.div`
  display: none;
  @media (max-width: 576px) {
    width: 100%;    
    display: block;
  }
`;

const MobileButtonStyle = css`
  top: 0;
  height: 56px;
  position: absolute;
  background-color: #175c8e;
  color: #ffffff;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.36;
  letter-spacing: -0.7px;
  padding: 16px;
  border: none;
  z-index: 25;
`;

const MobileCancelButton = styled.button`
  ${MobileButtonStyle}
  left: 0;
`;

const MobileEditButton = styled.button`
  ${MobileButtonStyle}
  right: 0;
`;

const MobileInputFieldWrapper = styled.div`
  width: 100%;
  height: 63px;
  display: flex;
  align-items: center;
  padding: 15px 16px 17px 16px;
  box-sizing: border-box;
  border-bottom: 1px solid #ececec;
`;

export default function ItemEdit({
  history,
  item,
  content,
  isOpen,
  editorRef,
  modules,
  loading,
  setItem,
  imageUpload,
  onChangeItem,
  onChangeContent,
  onClickCheckbox,
  onClickEditButton
}) {
  const marketId = parseInt(sessionStorage.getItem("marketId"));
  useEffect(() => {
    editorRef.current.editor.getModule("toolbar").addHandler('image', imageUpload);
  }, [editorRef])

  return (
    <Container>
      <StateForm>
        <Label style={{ marginBottom: '10px' }}>{marketId ? "구매" : "판매"} 상태 변경</Label>
        <CheckboxWrapper>
          <Checkbox
            type="radio"
            checked={item.state === 0}
            readOnly
          />
          <CheckboxText
            state={1}
            onClick={() => setItem({ ...item, state: 0 })}>
            {marketId ? "구매" : "판매"}중
          </CheckboxText>
          <Checkbox
            type="radio"
            url={"https://static.koreatech.in/upload/88cd3530e535c023230c2ded38506bbe.png"}
            checked={item.state === 1}
            readOnly
          />
          <CheckboxText
            state={2}
            onClick={() => setItem({ ...item, state: 1 })}>
            {marketId ? "구매" : "판매"}중지
          </CheckboxText>
          <Checkbox
            type="radio"
            url={"https://static.koreatech.in/upload/6c394b1918ae1ac29533fd151187e21b.png"}
            checked={item.state === 2}
            readOnly
          />
          <CheckboxText
            state={3}
            onClick={() => setItem({ ...item, state: 2 })}>
            {marketId ? "구매" : "판매"}완료
          </CheckboxText>
        </CheckboxWrapper>
      </StateForm>
      <Head>
        <Form>
          <Label>{marketId ? "구매글" : "판매글"} 제목</Label>
          <InputField
            type="text"
            name="title"
            value={item.title}
            onChange={onChangeItem}
            placeholder="ex) 샘숭 노트북 팝니다!"
          />
          <Label>{marketId ? "구매" : "판매"} 물품 가격</Label>
          <InputField
            type="number"
            name="price"
            value={item.price}
            onChange={onChangeItem}
            placeholder="가격을 입력해주세요"
          />
          <CheckboxWrapper>
            <Label>{marketId ? "구매자" : "판매자"} 연락처</Label>
            <Checkbox
              type="radio"
              checked={isOpen}
              readOnly
            />
            <CheckboxText onClick={() => onClickCheckbox(true)}>공개</CheckboxText>
            <Checkbox
              type="radio"
              checked={!isOpen}
              readOnly
            />
            <CheckboxText onClick={() => onClickCheckbox(false)}>비공개</CheckboxText>
          </CheckboxWrapper>
          <InputField
            type="text"
            name="phone"
            value={item.phone}
            onChange={onChangeItem}
            placeholder="ex)010-1234-5678"
            disabled={!isOpen}
          />
        </Form>
        <Form>
          <Label>대표 이미지 등록</Label>
          <ImageInputDropbox>
            {!item.image && !loading
              && (
                <>
                  <ImageInputField
                    accept="image/*"
                    enctype="multipart/form-data"
                    type="file"
                    name="image"
                    onChange={onChangeItem}
                    onDrop={onChangeItem}
                  />
                  <ImageGuideText>해당 영역에 사진을 드래그하여 첨부해주세요.</ImageGuideText>
                  <ImageGuideButton>내 컴퓨터에서 선택</ImageGuideButton>
                </>
            )}
            {item.image && !loading 
              && (
                <>
                  <PreviewImage src={item.image} />
                  <ImageDeleteButton onClick={() => setItem({ ...item, image: '' })}>
                    이미지 삭제
                  </ImageDeleteButton>
                </>
            )}
            <ClipLoader
              size={100}
              color={"#175c8e"}
              css={LoaderStyle}
              loading={loading}
            />            
          </ImageInputDropbox>
        </Form>
        <MobileWrapper>
          <MobileCancelButton onClick={() => history.goBack()}>취소</MobileCancelButton>
          <MobileEditButton onClick={onClickEditButton}>수정</MobileEditButton>
          <MobileInputFieldWrapper>
            <InputField
              type="text"
              name="title"
              value={item.title}
              onChange={onChangeItem}
              placeholder="제목을 입력해주세요."
              style={{ width: '100%' }}
            />
          </MobileInputFieldWrapper>
          <MobileInputFieldWrapper>
            <Label>가격</Label>
            <InputField
              type="number"
              name="price"
              value={item.price}
              onChange={onChangeItem}
              placeholder="가격을 입력해주세요."
            />
          </MobileInputFieldWrapper>
          <MobileInputFieldWrapper style={{ position: 'relative', padding: '0 16px' }}>
            <Label>대표 이미지</Label>
            {!item.image && !loading 
              && (
                <>
                  <ImageInputField
                    accept="image/*"
                    enctype="multipart/form-data"
                    type="file"
                    name="image"
                    onChange={onChangeItem}
                    onDrop={onChangeItem}
                  />
                  <MobileImageButton>이미지 첨부</MobileImageButton>
                </>
              )
            }
            {item.image && !loading
              && (
                <>
                  <PreviewImage src={item.image} />
                  <MobileImageButton onClick={() => setItem({ ...item, image: '' })}>이미지 삭제</MobileImageButton>
                </>
              )
            }
          </MobileInputFieldWrapper>
          <MobileInputFieldWrapper>
            <Label>연락처</Label>
            <CheckboxWrapper>
              <Checkbox
                type="radio"
                checked={isOpen}
                readOnly
              />
              <CheckboxText onClick={() => onClickCheckbox(true)}>공개</CheckboxText>
              <Checkbox
                type="radio"
                checked={!isOpen}
                readOnly
              />
              <CheckboxText onClick={() => onClickCheckbox(false)}>비공개</CheckboxText>
            </CheckboxWrapper>
          </MobileInputFieldWrapper>
          <MobileInputFieldWrapper>
            <Label></Label>
            <InputField
              type="text"
              name="phone"
              value={item.phone}
              onChange={onChangeItem}
              placeholder="연락처를 입력해주세요."
              disabled={!isOpen}
            />
          </MobileInputFieldWrapper>
        </MobileWrapper>
      </Head>
      <Body>
        <Label>상세정보 입력</Label>
        <ReactQuill
          ref={editorRef}
          value={content}
          modules={modules}
          onChange={content => onChangeContent(content)}
          style={{ height: '400px' }}
        />
      </Body>
      <Footer>
        <CancelButton onClick={() => history.goBack()}>취소</CancelButton>
        <EditButton onClick={onClickEditButton}>수정</EditButton>
      </Footer>
    </Container>
  )
}
