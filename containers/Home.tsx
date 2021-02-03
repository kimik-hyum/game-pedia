import React, {useEffect, useState, useRef} from 'react';
import axios from 'axios';
import { Platform, Text, Modal } from 'react-native';
import styled from 'styled-components/native';
import {isEmpty} from '../helper/util';
import SearchBar from '../components/SearchBar';
import {Spinner} from 'native-base';
import Filter from '../components/Filter';
import queryString from 'query-string';

const GameListWrap = styled.View`
flex:1;
padding:0px 0;
`
const FilterBox = styled.ScrollView`
  max-height:48px;
  flex-direction:row;
  border:1px solid #ddd;
  border-top-width:0;
`

const List = styled.FlatList`
width:100%;
flex:1;
padding-bottom:50px;
`
const ListItem = styled.TouchableOpacity`
margin-bottom:10px;
`

const GameInfor = styled.View`
margin:10px 10px 0;
`

const GameInforText = styled.Text`
margin-bottom:4px;
`
const GamePriceSale = styled.Text`
text-decoration:line-through;
`
const GameTagList = styled.ScrollView`
margin-top:5px;
`
const GameTagBox = styled.View`
padding-right:10px;
`
const GameTag = styled.View`
color:#67c1f5;
padding:3px 5px;
font-size:12px;
border-radius:3px;
background:rgba( 103, 193, 245, 0.2 );
`
const GameTagText = styled.Text`
color:#67c1f5;
`

const Loding = styled(Spinner)`
  flex:1;
`
const ModalBox = styled.View`
  flex:1;
  background:rgba(0, 0, 0, 0.7);
  
`

const Home = ({navigation}:any) => {
  const [list, setList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [viewType, setViewType] = useState('apps');
  //const [filter, setFilter] = {is_free:false, }
  const params = {_start:0, _limit:10};
  const page = useRef(1);
  const scroll = useRef(true);
  const data_url = `http://192.168.0.103:1337/`;
  useEffect(() => {
    getGameData(setUrl(viewType));
  }, []);

  const ImageBox = styled.View`
  width:100%;
  ${Platform.OS === 'web' && `
    padding-bottom:${viewType === 'apps' ? (215/460)*100 : (275/447)*100}%
  `}
  `
  const GameImage = styled.Image`
  ${Platform.OS === 'web' && `
    position:absolute;
    top:0;
    left:0;
    height:100%;
  `}
  width:100%;
  aspect-ratio:${viewType === 'apps' ? 460/215 : 447/275};
  `

  const setUrl = (type: string = 'apps', data: object = {}) => {
    const urlParams = Object.assign({}, params, data);
    const youtubeParams = type === "youtubes" ? '?korean=true&' : '?'
    const url = data_url + type + youtubeParams + queryString.stringify(urlParams);
    return url;
  }

  const onViewType = (type: string) => {
    setViewType(type);
    getGameData(setUrl(type));
  }
  const checkPrice = (free: boolean, price:number, sale:number) => {
   const final_price = sale > 0 ? (
      <GameInforText>
        <GamePriceSale>{price*(100/(100-sale))}</GamePriceSale>,
        <Text>₩ {price}</Text>
      </GameInforText>
    ) : (
      <GameInforText>₩ {price}</GameInforText>
    );
    return free ? (
      <GameInforText>무료</GameInforText>
    ) : (
      final_price
    );
  }
  const setTag = (str: string) => {
    const arr = str.split(",");
    return arr;
  }
  const navigationDetailPage = (id:number = 0) => {
    navigation.navigate('Detail', {
      id,
    });
  }
  const getGameData = (url: string, assign: boolean = false) => {
    setLoading(true)
    axios.get(url).then((res:any) => {
      if(!isEmpty(res.data)){
        const data = assign ? list.concat(res.data) : res.data;
        setList(data)
      } else {
        scroll.current = false
      }
      setLoading(false)
    }).catch((error) => {
      console.log(error)
    })
  }
  const onSubmitSearch = (text: string) => {
    const url = data_url+`&name_contains=${text}`;
    setList([]);
    getGameData(url)
  }
  const onMore = () => {
    if(scroll.current) {
      page.current ++;
      getGameData(setUrl(viewType, {_start:page.current * 10}), true);
    }
  }
  const renderItem = ({item}: any) => {
    console.log(item)
    if(viewType === 'apps') {
      return (
        <ListItem
          key={item._id}
          onPress={() => navigationDetailPage(item.app_id)}
        >
          <ImageBox>
            <GameImage
              source={{
                uri: `https://cdn.cloudflare.steamstatic.com/steam/apps/${item.app_id}/header.jpg`,
              }}
            />
          </ImageBox>
          <GameInfor>
            <GameInforText>{item.name}</GameInforText>
            {checkPrice(item.is_free, item.price, item.sale_price)}
            {!isEmpty(item.date) && <GameInforText>출시일 : {item.date}</GameInforText>}
            <GameTagList
              horizontal
            >
              {item.genres && setTag(item.genres).map((item, index) => {
                return (
                  <GameTagBox key={index}>
                    <GameTag>
                      <GameTagText>{item}</GameTagText>
                    </GameTag>
                  </GameTagBox>
                )
              })}
            </GameTagList>
          </GameInfor>
        </ListItem>
      )
    } else {
      return (
        <ListItem
          key={item._id}
          onPress={() => navigationDetailPage()}
        >
          <ImageBox>
            <GameImage
              source={{
                uri: item.thumbnail,
              }}
            />
          </ImageBox>
          <GameInfor>
            <GameInforText>{item.title}</GameInforText>
            {!isEmpty(item.upload_date) && <GameInforText>{item.upload_date}</GameInforText>}
            <GameTagList
              horizontal
            >
              {item.tag && setTag(item.tag).map((item, index) => {
                return (
                  <GameTagBox key={index}>
                    <GameTag>
                      <GameTagText>{item}</GameTagText>
                    </GameTag>
                  </GameTagBox>
                )
              })}
            </GameTagList>
          </GameInfor>
        </ListItem>
      )
    }
    
  }
  return (
    <GameListWrap>
      <SearchBar 
        onSubmitSearch={onSubmitSearch}
        setSearchText={setSearchText}
        text={searchText}
      />
      <FilterBox
        horizontal
      >
        <Filter 
          onViewType={onViewType}
        /> 
      </FilterBox>
      {!isEmpty(list) ? (
        <>
          <List 
            data={list}
            renderItem={renderItem}
            keyExtractor={(item:any) => item._id}
            onEndReached={onMore}
            onEndReachedThreshold={0.8}
          />
          <Modal
            visible={loading}
            transparent
          >
            <ModalBox>
              <Loding color='blue' />
            </ModalBox>
            
          </Modal>
        </>
      ) : (
        <Loding color='blue' />
      )} 
    </GameListWrap>
  )
}

export default Home;