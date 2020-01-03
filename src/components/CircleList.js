import React from "react";
import styled from "styled-components";
import CircleCard from "./CircleCard";

const Container = styled.div`
  border-top: #f7941e 5px solid;
  width: 100%;
`;

const ListSection = styled.div`
  width: 1132px;
  margin: 63px auto 0 auto;
  min-height: 800px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  float: left;
  font-family: NanumSquare, serif;
  font-size: 30px;
  font-weight: 800;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: -1.5px;
  color: #175c8e;
  width: 100%;
  text-align: left;
  height: 32px;
  margin-bottom: 21px;
`;

const CategoryWrapper = styled.div`
  float: left;
  width: 1052px;
  border-top: 2px #175c8e solid;
  border-bottom: 1px #175c8e solid;
  padding-left: 40px;
  padding-right: 40px;
  height: 132px;
`;

const CategoryName = styled.span`
  width: 55px;
  font-size: 15px;
  letter-spacing: -0.8px;
  color: ${props => (props.tag ? "#f7931e" : "#000000")};
  /* &:hover {
    color: #f7931e;
  } */
`;

const CategoryImage = styled.img`
  width: 55px;
  display: inline-block;
  border-radius: 90px;
  float: left;
  margin-bottom: 5px;
`;

const Category = styled.div`
  height: 100px;
  width: 58px;
  margin-left: 37px;
  margin-right: 36.5px;
  text-align: center;
  float: left;
  padding-top: 23px;
  cursor: pointer;

  &:hover {
    ${CategoryName} {
      color: #f7931e;
    }
    ${CategoryImage} {
    }
  }
`;

const ListCards = styled.div`
  margin-top: 36px;
  margin-bottom: 100px;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
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
  return (
    <Container>
      <ListSection>
        <Title>동아리 안내</Title>
        <CategoryWrapper>
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
