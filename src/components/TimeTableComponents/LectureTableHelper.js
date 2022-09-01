import React, { useState } from "react";
import styled from "styled-components";
import OutsideClickHandler from "../OutsideClickHandler";

const TableInfo = styled.div`
  height: 45px;
  display: flex;
  justify-content: space-between;
`;

const SearchBarWrapper = styled.div`
  border: 1px solid #d2dae2;
  width: 322px;
  height: 42px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-right: 10px;
`;

const SearchBar = styled.input`
  border: none;
  width: 249px;
  height: 32px;
  font-size: 15px;
  text-align: left;
  color: #252525;
  margin-right: 0;
  background-color: #fff;
  position: relative;

  &::placeholder {
    color: #bec9d5;
  }
`;

const DropdownWrapper = styled.div`
  width: 199px;
  height: ${(props) => (props.dropdown ? "470px" : "44px")};
  position: relative;
`;

const DropdownButton = styled.button`
  border: 1px #d2dae2 solid;
  width: 100%;
  height: 44px;
  float: right;
  font-size: 15px;
  color: #252525;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  background: #fff;
`;

const DropdownContentWrapper = styled.div`
  position: absolute;
  top: 49px;
  width: 100%;
  z-index: 5;
`;

const DropdownContent = styled.button`
  box-sizing: border-box;
  padding: 10px 20px;
  width: 199px;
  height: 42px;
  text-align: left;
  background: #ffffff;
  border: 1px #d2dae2 solid;
  font-family: NanumBarunGothic;
  font-size: 15px;
  font-weight: ${(props) => (props.selected ? "bold" : "normal")};
  color: ${(props) => (props.selected ? "#252525" : "#858585")};
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.11), 0 5px 15px 0 rgba(0, 0, 0, 0.08);
  border-collapse: collapse;
  cursor: pointer;

  &:hover {
    font-weight: bold;
    color: #252525;
  }
`;

const IconImage = styled.img`
  width: 24px;
  cursor: pointer;
`;

export default React.memo(function LectureTableHelper({
  selectLecturesByMajor,
  searchLecturesByName,
}) {
  const [searchWord, setSearchWord] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const majors = [
    "전체",
    "컴퓨터공학부",
    "메카트로닉스공학부",
    "전기ㆍ전자ㆍ통신공학부",
    "에너지신소재화학공학부",
    "기계공학부",
    "디자인ㆍ건축공학부",
    "산업경영학부",
    "교양학부",
    "HRD학과",
    "융합학과",
    "고용서비스정책학과",
  ];
  const [selectedMajor, setSelectedMajor] = useState("전체");

  const onSearchWordChange = (e) => {
    setSearchWord(e.target.value);
  };

  const selectMajor = (major) => {
    setSelectedMajor(major);
    setDropdown(!dropdown);
    selectLecturesByMajor(major);
  };

  const searchLectures = () => {
    searchLecturesByName(searchWord);
  };

  return (
    <TableInfo>
      <SearchBarWrapper>
        <SearchBar
          placeholder="교과명을 입력하세요."
          value={searchWord}
          onChange={onSearchWordChange}
          onKeyPress={(e) => (e.key === "Enter" ? searchLectures() : null)}
        />
        <IconImage
          onClick={searchLectures}
          src={"https://static.koreatech.in/assets/img/ic-search-gray.png"}
        />
      </SearchBarWrapper>
      <OutsideClickHandler
        Container={DropdownWrapper}
        dropdown={dropdown}
        onOutsideClick={() => setDropdown(false)}
      >
        <DropdownButton type="button" onClick={() => setDropdown(!dropdown)}>
          {selectedMajor}
          <IconImage
            src={"https://static.koreatech.in/assets/img/ic-arrow-up-down.png"}
          />
        </DropdownButton>
        {dropdown && (
          <DropdownContentWrapper>
            {majors.map((major) => (
              <DropdownContent
                key={major}
                type="button"
                selected={major === selectedMajor}
                onClick={() => selectMajor(major)}
              >
                {major}
              </DropdownContent>
            ))}
          </DropdownContentWrapper>
        )}
      </OutsideClickHandler>
    </TableInfo>
  );
});
