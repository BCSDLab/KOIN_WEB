import React from 'react'
import styled from 'styled-components';
import RoomCard from './RoomCard';
import { NaverMap, Marker } from 'react-naver-maps';
import ReactDOMServer from 'react-dom/server';
import MarkerIcon from './MarkerIcon';

const Container = styled.div`
  width: 100%;
`;

const ListSection = styled.div`
  width: 1132px;
  min-height: 950px;
  margin: 68px auto 84px auto;

  @media (max-width: 576px) {
    width: 100%;
    height: 100%;
    margin: 0;
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

const Contents = styled.div`
  width: 1132px;
  margin-top: 21px;
  padding-top: 18px;
  border-top: 2px solid #175c8e;
  display: flex;

  @media (max-width: 576px) {
    width: 100%;
    flex-direction: column;
    border: none;
    margin: 0;
    padding: 0;
  }
`;

const MapWrapper = styled.div`
  border: 1px #d2dae2 solid;
  width: 752px;
  z-index: 0;

  @media (max-width: 576px) {
    width: 100%;
    border: none;
    height: 300px;
  }
`;

const ListCards = styled.div`
  margin-left: 13px;
  width: 363px;
  float: left;
  height: 878px;
  overflow: scroll;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 576px) {
    margin: 16px 16px 0 16px;
    width: calc(100% - 32px);
    height: 100%;
  }
`;

export default function RoomList({
  roomList,
  loading,
  history
}) {
  const navermaps = window.naver.maps;
  const mapOptions = {
    maxZoom: 18,
    minZoom: 14,
    logoControl: false,
    zoomControl: true,
    scrollWheel: false,
    zoomControlOptions: {
      position: navermaps.Position.TOP_LIFT
    },
    draggable: true
  }
  
  return (
    <Container>
      <ListSection>
        <Title>복덕방</Title>
        <Contents>
          <MapWrapper>
            <NaverMap
              style={{
                width: '100%',
                height: '100%'
              }}
              defaultCenter={{ lat: 36.764617, lng: 127.2831540 }}
              defaultZoom={15}
              {...mapOptions}
            >
              {roomList.map(room => (
                <Marker
                  key={room.id}
                  position={{ lat: room.latitude, lng: room.longitude }}
                  title={room.name}
                  icon={{
                    content: ReactDOMServer.renderToString(<MarkerIcon />)
                  }}
                  onClick={() => history.push(`/room/${room.id}`)}
                />
              ))}
            </NaverMap>
          </MapWrapper>
          <ListCards>
            {roomList.map(room => (
              <RoomCard
                key={room.id}
                room={room}
              />
            ))}
          </ListCards>
        </Contents>
        
      </ListSection>
    </Container>
  )
}
