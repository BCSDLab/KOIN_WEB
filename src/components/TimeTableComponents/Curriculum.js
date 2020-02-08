import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
  width: 336px;
`;

const Title = styled.div`
  font-family: NanumSquare,serif;
  font-weight: 800;
  font-size: 20px;
  line-height: 1.2;
  text-align: left;
  color: #175c8e;
  margin-bottom: 27px;
`;

const LinkWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const CurriculumLink = styled.a`
  text-decoration: none;
  text-align: center;
  line-height: 40px;
  font-size: 12px;
  letter-spacing: -.2px;
  color: #252525;
  width: 158px;
  height: 38px;
  border: 1px solid #f7941e;
  background-color: #fff;
  margin-bottom: 17px;
  cursor: pointer;
`;

export default React.memo(function Curriculum() {
  const curricula = [
    {
      name: "컴퓨터공학부",
      link: "https://cse.koreatech.ac.kr/page_izgw21"
    },
    {
      name: "기계공학부",
      link: "https://cms3.koreatech.ac.kr/me/795/subview.do"
    },
    {
      name: "메카트로닉스공학부",
      link: "https://cms3.koreatech.ac.kr/mechatronics/2746/subview.do"
    },
    {
      name: "전기ㆍ전자ㆍ통신공학부",
      link: "https://cms3.koreatech.ac.kr/ite/842/subview.do"
    },
    {
      name: "디자인ㆍ건축공학부",
      link: "https://cms3.koreatech.ac.kr/ide/1047/subview.do"
    },
    {
      name: "에너지신소재화학공학부",
      link: "https://cms3.koreatech.ac.kr/ace/992/subview.do"
    },
    {
      name: "산업경영학부",
      link: "https://www.koreatech.ac.kr/kor/sub03_01_08_07.do"
    },
    {
      name: "대학 입학 요람",
      link: "https://www.koreatech.ac.kr/kor/sub01_03_02.do"
    },
  ]
  return (
    <Container>
      <Title>커리큘럼</Title>
      <LinkWrapper>
        {curricula.map((curriculum, index) => 
          <CurriculumLink
            key={index}
            target="_blank"
            href={curriculum.link}>
            {curriculum.name}
          </CurriculumLink>)}
      </LinkWrapper>
    </Container>
  )
})