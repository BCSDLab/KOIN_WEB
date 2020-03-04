import React from 'react'
import styled, { css } from "styled-components";
import { NaverMap, Marker } from 'react-naver-maps';
import ReactDOMServer from 'react-dom/server';
import MarkerIcon from './MarkerIcon';

const Container = styled.div`
  border-top: #f7941e 5px solid;
  width: 100%;

  @media (max-width: 576px) {
    border: none;
  }
`;

const Row = styled.div`
  width: 1132px;
  min-height: 950px;
  margin: 68px auto 0 auto;

  @media (max-width: 576px) {
    width: 100%;
    height: 100%;
    margin: 0;
  }
`;

const Title = styled.div`
  font-family: NanumSquare, serif;
  font-size: 30px;
  font-weight: 800;
  letter-spacing: -1.5px;
  color: #175c8e;
  text-align: left;
  margin-bottom: 21px;

  @media (max-width: 576px) {
    display: none;
  }
`;

const RoomName = styled.div`
  width: 100%;
  height: 224px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: NanumBarunGothic, serif;
  font-size: 30px;
  font-weight: bold;
  color: #252525;
  border-top: 2px solid #175c8e;

  @media (max-width: 576px) {
    font-size: 20px;
    font-weight: bold;
    line-height: 1.2;
    color: #252525;
    margin-top: 50px;
    margin-bottom: 40px;
    height: auto;
    border-top: none;
  }
`;

const SectionCard = css`
  background-color: #ffffff;
  border: 1px #d2dae2 solid;
  margin-bottom: 20px;
  padding: 60px 211px;
  text-align: center;
  height: 100%;

  @media (max-width: 576px) {
    border: none;
    width: calc(100% - 32px);
    margin: 0 16px;
    padding: 0;
  }
`;

const InfoSection = styled.div`
  ${SectionCard}
`;

const OptionSection = styled.div`
  ${SectionCard}
  padding: 60px 230px;

  @media (max-width: 576px) {
    border: 1px solid #d2dae2;
    margin-top: 40px;
    padding: 25px 0 35px 0;
  }
`;

const PositionSection = styled.div`
  ${SectionCard}
  
  @media (max-width: 576px) {
    margin: 40px 0 16px 0;
    width: 100%;
  }
`;

const SectionTitle = styled.h2`
  font-family: NanumBarunGothic, serif;
  font-size: 24px;
  font-weight: 300;
  line-height: 1;
  letter-spacing: -0.5px;
  text-align: center;
  color: #252525;

  @media (max-width: 576px) {
    font-size: 16px;
    font-weight: 300;
    line-height: 0.69;
    letter-spacing: -0.3px;
    text-align: center;
    color: #252525;
    margin-bottom: 11px;
    margin-top: 0;
  }
`;

const InfoTable = styled.table`
  margin-top: 30px;
  width: 710px;
  border-top: #175c8e 1px solid;
  border-bottom: #175c8e 1px solid;
  font-family: NanumBarunGothic, serif;
  font-size: 14px;
  line-height: 1.71;
  color: #828282;
  border-collapse: collapse;
  user-select: text;

  & tr {
    border-top: #175c8e4d 1px solid;
  }

  & tr:first-child {
    border-top: none;
  }

  & th {
    text-align: left;
    padding-left: 20px;
    width: 50px;
  }

  & td {
    width: 280px;
    height: 40px;
    color: #252525;
    font-size: 15px;
    line-height: 1.6;
  }

  @media (max-width: 576px) {
    width: 100%;
    padding: 0;

    & th {
      width: 52px;
      font-size: 13px;
      line-height: 0.77;
      color: #828282;
      padding-left: 14px;
    }

    & td {
      width: auto;
      font-size: 12px;
      line-height: 0.92;
      text-align: left;
    }
  }
`;

const RoomImageSlider = styled.div`
  margin-top: 34px;
  width: 710px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 576px) {
    width: 100%;
    height: 184px;
    border: 1px solid #d2dae2;
    display: block;
  }
`;

const RoomImage = styled.img`
  max-width: 560px;
  height: 400px;

  @media (max-width: 576px) {
    width: 100%;
    height: 100%;
  }
`;

const ArrowImage = css`
  margin: 0 10px;
  cursor: pointer;

  @media (max-width: 576px) {
    position: absolute;
    width: 30px;
    height: 30px;
    margin: 0;
    top: calc(50% - 15px);
    bottom: calc(50% - 15px);
  }
`;

const PrevArrow = styled.img`
  ${ArrowImage}
  @media (max-width: 576px) {
    left: 0;
  }
`;

const NextArrow = styled.img`
  ${ArrowImage}
  @media (max-width: 576px) {
    right: 0;
  }
`;

const ImagePagination = styled.div`
  width: 54px;
  height: 23px;
  opacity: 0.8;
  border-radius: 12px;
  background-color: #252525;
  font-family: NanumBarunGothic, serif;
  font-size: 12px;
  line-height: 2;
  text-align: center;
  color: #ffffff;
  margin: 0 auto;
  position: absolute;
  bottom: 10px;
  left: calc(50% - 27px);

  @media (max-width: 576px) {
    width: 40px;
    height: 18px;
    font-size: 11px;
    line-height: 1.45;
    color: #ffffff;
    left: calc(50% - 20px);
    right: calc(50% - 20px);
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const NoImageWrapper = styled.div`
  margin-top: 34px;
  width: 710px;
  height: 400px;

  @media (max-width: 576px) {
    width: 100%;
    height: 184px;
  }
`;

const NoImage = styled.img`
  @media (max-width: 576px) {
    width: 100%;
    height: 100%;
    object-fit: none;
    border: 1px solid #d2dae2;
  }
`;

const OptionWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Option = styled.div`
  opacity: ${props => props.builtIn ? 1 : 0.2};
  width: 80px;
  padding-left: 27px;
  padding-right: 27px;
  line-height: 1.71;
  text-align: center;
  color: #828282;

  @media (max-width: 576px) {
    font-size: 10px;
    line-height: 0.9;
    text-align: center;
    color: #828282;
    width: 25%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0;
  }
`;

const OptionImage = styled.img`
  width: 70px;
  height: 70px;
  margin-bottom: 8px;
  margin-top: 20px;

  @media (max-width: 576px) {
    width: 30px;
    height: 30px;
  }
`;

const RoomAddress = styled.p`
   height: 16px;
  font-family: NanumBarunGothic, serif;
  font-size: 14px;
  font-weight: 300;
  line-height: 1.71;
  text-align: center;
  color: #828282;
  margin-bottom: 30px;
  user-select: text;

  @media (max-width: 576px) {
    margin-bottom: 20px;
  }
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 400px;

  @media (max-width: 576px) {
    height: 165px;
  }
`;

export default function RoomDetail({
  room,
  loading,
  options,
  imgIdx,
  setNext,
  setPrev
}) {
  const navermaps = window.naver.maps;
  const mapOptions = {
    maxZoom: 18,
    minZoom: 14,
    logoControl: false,
    zoomControl: true,
    scrollWheel: false,
    zoomControlOptions: {
      position: navermaps.Position.TOP_LEFT
    },
    draggable: true
  }

  return (
    <Container>
      {room && <Row>
        <Title>
          복덕방
        </Title>
        <RoomName>
          {room.name}
        </RoomName>
        <InfoSection>
          <SectionTitle>원룸 정보</SectionTitle>
          <InfoTable>
            <tbody>
              <tr>
                <th>월세</th>
                <td>{room.monthly_fee ? room.monthly_fee : ' - ' }</td>
                <th>방 종류</th>
                <td>{room.room_type ? room.room_type : ' - '}</td>
              </tr>
              <tr>
                <th>전세</th>
                <td>{room.charter_fee ? `${room.charter_fee}만원` : ' - '}</td>
                <th>보증금</th>
                <td>{room.deposit ? `${room.deposit}만원` : ' - '}</td>
              </tr>
              <tr>
                <th>층수</th>
                <td>{room.floor ? `${room.floor}층` : ' - '}</td>
                <th>관리비</th>
                <td>{room.management_fee ? room.management_fee : ' - '}</td>
              </tr>
              <tr>
                <th>방 크기</th>
                <td>{room.size ? `${room.size}평` : ' - '}</td>
                <th>연락처</th>
                <td>{room.phone ? room.phone : ' - '}</td>
              </tr>
            </tbody>
          </InfoTable>
          {room.image_urls ? (
            <RoomImageSlider>
              <PrevArrow
                src={"https://static.koreatech.in/assets/ic-room/left-arrow.png"}
                onClick={setPrev}
              />
              <RoomImage src={room.image_urls[imgIdx]} />
              <NextArrow
                src={"https://static.koreatech.in/assets/ic-room/right-arrow.png"}
                onClick={() => setNext(room.image_urls.length)}
              />
              <ImagePagination>
                {imgIdx + 1} / {room.image_urls.length}
              </ImagePagination>
            </RoomImageSlider>
            ) : (
            <NoImageWrapper>
              <NoImage src={"https://static.koreatech.in/assets/ic-room/img.png"} />
            </NoImageWrapper>)
          }
        </InfoSection>
        <OptionSection>
          <SectionTitle>원룸 옵션</SectionTitle>
          <OptionWrapper>
            {options.map(option => (
              <Option
                builtIn={room[option.img_code]}
                key={option.id}>
                <OptionImage src={option.img_url} />
                {option.name}
              </Option>
            ))}
          </OptionWrapper>
          
        </OptionSection>
        <PositionSection>
          <SectionTitle>원룸 위치</SectionTitle>
          <RoomAddress>{room.address}</RoomAddress>
          <MapWrapper>
            <NaverMap
              style={{
                width: '100%',
                height: '100%',
                zIndex: '10'
              }}
              defaultCenter={{ lat: room.latitude, lng: room.longitude }}
              defaultZoom={16}
              {...mapOptions}>
              <Marker
                title={room.name}
                position={{ lat: room.latitude, lng: room.longitude }}
                icon={{
                  content: ReactDOMServer.renderToString(<MarkerIcon />)
                }}
              />
            </NaverMap>
          </MapWrapper>
        </PositionSection>
      </Row>}
      
    </Container>
  )
}
