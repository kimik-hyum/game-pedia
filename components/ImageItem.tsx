import React from 'react';
import HomeStyle from '../styled/HomeStyle';
import {isEmpty} from '../helper/util';
import {Platform} from 'react-native';
import styled from 'styled-components/native';


export default function ImageItem({item, appType, navigationPage, children}: any) {
  const ImageBox = styled.View`
    width: 100%;
    ${Platform.OS === 'web' &&
    `
    padding-bottom:${
      appType ? (215 / 460) * 100 : (275 / 447) * 100
    }%
  `}
  `;
  const GameImage = styled.Image`
    ${Platform.OS === 'web' &&
    `
    position:absolute;
    top:0;
    left:0;
    height:100%;
  `}
    width: 100%;
    aspect-ratio: ${appType ? 460 / 215 : 447 / 275};
  `;

  const setTag = (str: string) => {
    const arr = str.split(',');
    return arr.filter((item) => !isEmpty(item));
  };

  const renderInfor = () => {
    if(appType) {
      return (
        <>
          {children}
          {!isEmpty(item.date) && (
            <HomeStyle.GameInforText>
              출시일 : {item.date}
            </HomeStyle.GameInforText>
          )}
        </>
      )
    } else {
      return (
        !isEmpty(item.upload_date) && (
          <HomeStyle.GameInforText>
            {item.upload_date}
          </HomeStyle.GameInforText>
        )
      )
    }
  }
  
  const renderTag = (tag: string) => {
    if(isEmpty(tag)) return null;
    return setTag(tag).map((el, index) => {
      return (
        <HomeStyle.GameTagBox key={index}>
          <HomeStyle.GameTag>
            <HomeStyle.GameTagText>{el}</HomeStyle.GameTagText>
          </HomeStyle.GameTag>
        </HomeStyle.GameTagBox>
      );
    })
  }

  return (
    <HomeStyle.ListItem
      key={item._id}
      onPress={() => navigationPage(item)}>
      <ImageBox>
        <GameImage
          source={{
            uri: appType ? `https://cdn.cloudflare.steamstatic.com/steam/apps/${item.app_id}/header.jpg` : item.thumbnail,
          }}
        />
      </ImageBox>
      <HomeStyle.GameInfor>
        <HomeStyle.GameInforText>{appType ? item.name : item.title}</HomeStyle.GameInforText>
        {renderInfor()}
        <HomeStyle.GameTagList horizontal>
          {renderTag(appType ? item.genres : item.tag)}
        </HomeStyle.GameTagList>
      </HomeStyle.GameInfor>
    </HomeStyle.ListItem>
  )
}
