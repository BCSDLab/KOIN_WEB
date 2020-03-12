import React from "react";
import styled from "styled-components";
import CircleCard from "./CircleCard";

const Container = styled.div`
  width: 100%;
`;

const ListSection = styled.div`
  width: 1132px;
  margin: 63px auto 0 auto;
  min-height: 800px;
  display: flex;
  flex-direction: column;

  @media (max-width: 576px) {
    width: calc(100% - 32px);
    margin: 30px auto auto auto;
  }
`;

const Title = styled.h1`
  font-family: NanumSquare, serif;
  font-size: 30px;
  font-weight: 800;
  letter-spacing: -1.5px;
  color: #175c8e;
  text-align: left;
  margin: 0 0 21px 0;

  @media (max-width: 576px) {
    display: none;
  }
`;

const CategoryWrapper = styled.div`
  width: 1052px;
  border-top: 2px #175c8e solid;
  border-bottom: 1px #175c8e solid;
  padding: 0 40px;
  height: 132px;

  @media (max-width: 576px) {
    padding: 0;
    width: 100%;
    height: 100%;
    padding: 12px 0 20px 0;
  }
`;

const MobileTitle = styled.div`
  display: none;
  
  @media (max-width: 576px) {
    display: block;
    font-family: NanumSquare;
    font-size: 15px;
    font-weight: 800;
    line-height: 1;
    letter-spacing: normal;
    color: #252525;
    text-align: left;
  }
`;

const Categories = styled.div`
  width: 100%;
  height: 100%;
  
  @media (max-width: 576px) {
    display: flex;
    flex-wrap: wrap;
  }
`

const CategoryName = styled.span`
  width: 55px;
  font-size: 15px;
  letter-spacing: -0.8px;
  color: ${props => (props.tag ? "#f7931e" : "#000000")};

  @media (max-width: 576px) {
    width: auto;
    font-size: 13px;
    font-weight: 400;
    line-height: 1.15;
    letter-spacing: -.3px;
    color: ${props => (props.tag ? "#f7931e" : "#252525")};
  }
`;

const CategoryImage = styled.img`
  width: 55px;
  display: inline-block;
  border-radius: 90px;
  margin-bottom: 5px;

  @media (max-width: 576px) {
    width: 50px;
    hieght: 50px;
  }
`;

const Category = styled.div`
  height: 100px;
  width: 58px;
  margin: 16px 36.5px;
  text-align: center;
  cursor: pointer;
  float: left;

  &:hover {
    ${CategoryName} {
      color: #f7931e;
    }
  }

  @media (max-width: 576px) {
    width: 20%;
    height: auto;
    margin: 0 2.5%;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const ListCards = styled.div`
  margin-top: 36px;
  margin-bottom: 100px;
  height: 100%;
  display: flex;
  flex-wrap: wrap;

  @media (max-width: 576px) {
    margin-top: 20px;
    margin-bottom: 16px;
  }
`;

export default function CircleList({
  tag,
  categories,
  circleList,
  loading,
  error,
  selectCategory,
  onMouseOverCategory,
  onMouseOutCategory,
  categoryIndex
}) {
  // console.log(tag);
  return (
    <Container>
      <ListSection>
        <Title>동아리 안내</Title>
        <CategoryWrapper>
          <MobileTitle>CATEGORY</MobileTitle>
          <Categories>
            {categories.map((category, index) => (
              <Category
                key={category.tag}
                onMouseOver={() => onMouseOverCategory(index)}
                onMouseOut={onMouseOutCategory}
                onClick={() => selectCategory(category.tag)}
              >
                <CategoryImage
                  src={
                    categoryIndex !== index && category.tag !== tag
                      ? category.img
                      : category.on_img
                  }
                />
                <CategoryName tag={tag === category.tag}>
                  {category.title}
                </CategoryName>
              </Category>
            ))}
          </Categories>
        </CategoryWrapper>
        <ListCards>
          {circleList.map((circle, index) => (
            <CircleCard circle={circle} key={circle.id} index={index} />
          ))}
        </ListCards>
      </ListSection>
    </Container>
  );
}
