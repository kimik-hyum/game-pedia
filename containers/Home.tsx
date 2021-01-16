import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Platform, Text } from 'react-native';
import styled from 'styled-components/native';
import {isEmpty} from '../helper/util';
import SearchBar from '../components/SearchBar';
import {Spinner} from 'native-base';
import Filter from '../components/Filter';

const GameListWrap = styled.ScrollView`
padding:0px 0;
`
const FilterBox = styled.ScrollView`
  flex-direction:row;
`
const List = styled.FlatList`
width:100%;
padding-bottom:50px;
`
const ListItem = styled.TouchableOpacity`
margin-bottom:10px;
`
const ImageBox = styled.View`
width:100%;
${Platform.OS === 'web' && `
  padding-bottom:${(215/460)*100}%
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
aspect-ratio:${460/215};
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
const GameTagList = styled.Text`
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

const Home = ({navigation}:any) => {
  const [list, setList] = useState(null);
  const [searchText, setSearchText] = useState('')
  const data_url = 'http://192.168.0.103:1337/apps';
  const filterData = [
    {title:'출시일', options:[
      {label:'최신순', value:'recent'},
      {label:'예전순', value:'old'}
    ]},
    {title:'인기도', options:[
      {label:'인기 많은순', value:'recent'},
      {label:'인기 없는순', value:'old'}
    ]},
    {title:'장르', options:[
      {label:'액션', value:'recent'},
      {label:'아케이드', value:'old'}
    ]},
    {title:'평점', options:[
      {label:'액션', value:'recent'},
      {label:'아케이드', value:'old'}
    ]},

  ]
  useEffect(() => {
    getGameData(data_url);
  }, []);
 

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
  const navigationDetailPage = (id:number) => {
    navigation.navigate('Detail', {
      id,
    });
  }
  const getGameData = (url: string) => {
    axios.get(url).then((res:any) => {
      setList(res.data)
    }).catch((error) => {
      console.log(error)
    })
  }
  const onSubmitSearch = (text: string) => {
    const url = data_url+`?name_contains=${text}`;
    setList(null);
    getGameData(url)
  }
  const renderItem = ({item}: any) => {
    return (
      <ListItem
        key={item.appid}
        onPress={() => navigationDetailPage(item.appid)}
      >
        <ImageBox>
          <GameImage
            source={{
              uri: `https://cdn.cloudflare.steamstatic.com/steam/apps/${item.appid}/header.jpg`,
            }}
          />
        </ImageBox>
        <GameInfor>
          <GameInforText>{item.name}</GameInforText>
          {checkPrice(item.is_free, item.price, item.sale_price)}
          {!isEmpty(item.date) && <GameInforText>출시일 : {item.date}</GameInforText>}
          <GameTagList>
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
  }
  console.log(list)
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
        <Filter /> 
      </FilterBox>
      {list ? (
        <List 
          data={list}
          renderItem={renderItem}
          keyExtractor={(item:any) => item.appid.toString()}
        />
      ) : (
        <Spinner color='blue' />
      )} 
    </GameListWrap>
  )
}

export default Home;