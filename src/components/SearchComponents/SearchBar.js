import React from 'react'
import styled, { css } from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 80px;
  background-color: #175c8e;
  padding-right: 14px;
  z-index: 15;
  @media (max-width: 576px) {
    position: absolute;
    top: 0;
    left: 0;
    height: 56px;
    padding: 16px;
    box-sizing: border-box;
  }
`;

const Row = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const IconStyle = css`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const Icon= styled.img`
  ${IconStyle}
  @media (max-width: 576px) {
    display: none;
  }
`;

const MobileIcon = styled.img`
  display: none;
  ${IconStyle}
  @media (max-width: 576px) {
    display: block;
  }
`;

const InputField = styled.input`
  font-family: NanumSquare;
  font-size: 17px;
  text-align: left;
  color: white;
  background-color: transparent;
  border: none;
  flex: 1;
  margin-left: 10px;

  &::placeholder {
    color: #7da0b9;
  }

  @media (max-width: 576px) {
    font-size: 14px;
    color: #ffffff;
    padding: 5px 0;
    border-bottom: 1px solid #d2dae2;
    margin: 0 15px;
    &::placeholder {
      color: #d2dae2;
    }
  }
`;

const SearchWordListContainer = styled.div`
  background-color: white;
  width: 100%;
  height: 263px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  padding: 25px 30px;
  box-sizing: border-box;
  z-index: 20;

  @media (max-width: 576px) {
    position: absolute;
    top: 57px;
    left: 0;
    width: 100vw;
    height: calc(100vh - 113px);
    padding: 20px 16px 0 16px;
    box-sizing: border-box;
  }
`;

const SearchWordListHead = styled.div`
  display: flex;
  justify-content: space-between;
  color: #175c8e;
  font-family: NanumSquareB;
  font-size: 17px;
  font-weight: normal;
  line-height: 1;
  text-align: left;
  color: #175c8e;

  @media (max-width: 576px) {
    font-size: 15px;
  }
`;

const SearchWordList = styled.div`
  margin-top: 25px;
  overflow: hidden;
  @media (max-width: 576px) {
    height: 205px;
  }
`;

const SearchWord = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;

  & span {
    font-family: NanumBarunGothic;
    font-size: 15px;
    font-weight: normal;
    line-height: 1.2;
    color: #252525;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width: 576px) {
      font-size: 14px;
    }
  }
`;

const DeleteButton = styled.img`
  width: 15px;
  height: 15px;
  cursor: pointer;
`;

export default React.memo(function SearchBar({
  searchWord,
  searchWordList,
  setSearchBar,
  onClickDeleteSearchWordBtn,
  onChangeSearchWord,
  onClickSearchButton
}) {
  return (
    <>
    <Container>
      <Row>
        <Icon
          src={"https://static.koreatech.in/assets/img/ic-search.png"}
          onClick={() => onClickSearchButton(searchWord)}
        />
        <MobileIcon
          src={"https://static.koreatech.in/assets/img/back-menu.png"}
          onClick={() => setSearchBar(false)}
        />
        <InputField
          value={searchWord}
          onChange={onChangeSearchWord}
          placeholder="검색어를 입력하세요."
          autoFocus={true}
          onKeyPress={e => e.key === 'Enter' && onClickSearchButton(searchWord)}
        />
        <Icon
          src={"https://static.koreatech.in/assets/img/close.png"}
          onClick={() => setSearchBar(false)}        
        />
        <MobileIcon
          src={"https://static.koreatech.in/assets/img/ic-search.png"}
          onClick={() => onClickSearchButton(searchWord)}
        />
      </Row>
      {!!searchWordList.length && <SearchWordListContainer>
        <SearchWordListHead>
          <span>최근 검색</span>
          <span style={{ cursor: 'pointer' }} onClick={() => onClickDeleteSearchWordBtn()}>전체 삭제</span>
        </SearchWordListHead>
        <SearchWordList>
          {searchWordList && searchWordList.map((searchWord, index) => 
            <SearchWord key={index}>
              <span onClick={() => onClickSearchButton(searchWord)}>{searchWord}</span>
              <DeleteButton
                src={"https://static.koreatech.in/assets/img/ic-x.png"}
                onClick={() => onClickDeleteSearchWordBtn(searchWord)}
              />
            </SearchWord>
          )}
        </SearchWordList>
      </SearchWordListContainer>}
    </Container>
    </>
  )
})