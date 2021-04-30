import React, {useEffect, useState, useRef} from 'react';
import axios from 'axios';
import {Platform, Text, Modal, Switch} from 'react-native';
import styled from 'styled-components/native';
import {isEmpty} from '../helper/util';
import SearchBar from '../components/SearchBar';
import FilterModal from '../components/FilterModal';
import queryString from 'query-string';
import HomeStyle from '../styled/HomeStyle';
import {useDispatch} from 'react-redux';
import { uiSlice } from '../store/ui/uiSlice'

const Home = ({navigation}: any) => {
  const dispatch = useDispatch()
  const [list, setList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [viewType, setViewType] = useState('apps');
  const [filter, setFilter] = useState(false);
  //const [filter, setFilter] = {is_free:false, }
  const params = {_start: 0, _limit: 10};
  const page = useRef(1);
  const scroll = useRef(true);
  const data_url = 'http://0.0.0.0:1337/';
  useEffect(() => {
    getGameData(setUrl(viewType));
  }, []);

  const ImageBox = styled.View`
    width: 100%;
    ${Platform.OS === 'web' &&
    `
    padding-bottom:${
      viewType === 'apps' ? (215 / 460) * 100 : (275 / 447) * 100
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
    aspect-ratio: ${viewType === 'apps' ? 460 / 215 : 447 / 275};
  `;

  const setUrl = (type: string = 'apps', data: object = {}) => {
    const urlParams = Object.assign({}, params, data);
    const youtubeParams =
      type === 'youtubes' ? '?korean=true&_sort=upload_date:DESC&' : '?';
    const url =
      data_url + type + youtubeParams + queryString.stringify(urlParams);
    return url;
  };

  const onViewType = (type: string) => {
    setViewType(type);
    getGameData(setUrl(type));
  };
  const onFilter = (plag: boolean = true) => {
    setFilter(plag);
  };
  const checkPrice = (free: boolean, price: number, sale: number) => {
    const final_price =
      sale > 0 ? (
        <HomeStyle.GameInforText>
          <HomeStyle.GamePriceSale>
            {price * (100 / (100 - sale))},
          </HomeStyle.GamePriceSale>
          <Text>₩ {price}</Text>
        </HomeStyle.GameInforText>
      ) : (
        <HomeStyle.GameInforText>₩ {price}</HomeStyle.GameInforText>
      );
    return free ? (
      <HomeStyle.GameInforText>무료</HomeStyle.GameInforText>
    ) : (
      final_price
    );
  };

  const setTag = (str: string) => {
    const arr = str.split(',');
    return arr.filter((item) => !isEmpty(item));
  };
  const navigationDetailPage = (item: any) => {
    dispatch(uiSlice.actions.setYoutubeList(item.youtubes))
    navigation.navigate('AppDetail', {
      id: item.app_id
    });
  };

  const navigationYoutubePage = (id: string) => {
    navigation.navigate('YoutubeDetail', {
      id: id,
    });
  };

  const getGameData = (url: string, assign: boolean = false) => {
    setLoading(true);
    axios
      .get(url)
      .then((res: any) => {
        if (!isEmpty(res.data)) {
          const data = assign ? list.concat(res.data) : res.data;
          setList(data);
        } else {
          scroll.current = false;
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onSubmitSearch = (text: string) => {
    const url = data_url + `apps?name_contains=${text}`;
    setList([]);
    getGameData(url);
  };
  const onMore = () => {
    if (scroll.current) {
      page.current++;
      getGameData(setUrl(viewType, {_start: page.current * 10}), true);
    }
  };
  const toggleSwitch = () => {
    onViewType(viewType === 'apps' ? 'youtubes' : 'apps');
  };
  const renderItem = ({item}: any) => {
    if (viewType === 'apps') {
      return (
        <HomeStyle.ListItem
          key={item._id}
          onPress={() => navigationDetailPage(item)}>
          <ImageBox>
            <GameImage
              source={{
                uri: `https://cdn.cloudflare.steamstatic.com/steam/apps/${item.app_id}/header.jpg`,
              }}
            />
          </ImageBox>
          <HomeStyle.GameInfor>
            <HomeStyle.GameInforText>{item.name}</HomeStyle.GameInforText>
            {checkPrice(item.is_free, item.price, item.sale_price)}
            {!isEmpty(item.date) && (
              <HomeStyle.GameInforText>
                출시일 : {item.date}
              </HomeStyle.GameInforText>
            )}
            <HomeStyle.GameTagList horizontal>
              {!isEmpty(item.genres) &&
                setTag(item.genres).map((el, index) => {
                  return (
                    <HomeStyle.GameTagBox key={index}>
                      <HomeStyle.GameTag>
                        <HomeStyle.GameTagText>{el}</HomeStyle.GameTagText>
                      </HomeStyle.GameTag>
                    </HomeStyle.GameTagBox>
                  );
                })}
            </HomeStyle.GameTagList>
          </HomeStyle.GameInfor>
        </HomeStyle.ListItem>
      );
    } else {
      return (
        <HomeStyle.ListItem
          key={item._id}
          onPress={() => navigationYoutubePage(item.youtube_ids)}>
          <ImageBox>
            <GameImage
              source={{
                uri: item.thumbnail,
              }}
            />
          </ImageBox>
          <HomeStyle.GameInfor>
            <HomeStyle.GameInforText>{item.title}</HomeStyle.GameInforText>
            {!isEmpty(item.upload_date) && (
              <HomeStyle.GameInforText>
                {item.upload_date}
              </HomeStyle.GameInforText>
            )}
            <HomeStyle.GameTagList horizontal>
              {item.tag &&
                setTag(item.tag).map((item, index) => {
                  return (
                    <HomeStyle.GameTagBox key={index}>
                      <HomeStyle.GameTag>
                        <HomeStyle.GameTagText>{item}</HomeStyle.GameTagText>
                      </HomeStyle.GameTag>
                    </HomeStyle.GameTagBox>
                  );
                })}
            </HomeStyle.GameTagList>
          </HomeStyle.GameInfor>
        </HomeStyle.ListItem>
      );
    }
  };
  return (
    <HomeStyle.GameListWrap>
      <SearchBar
        onSubmitSearch={onSubmitSearch}
        setSearchText={setSearchText}
        text={searchText}
        onFilter={onFilter}
      />
      <HomeStyle.FilterBox>
        <HomeStyle.TogglBox>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={viewType === 'apps' ? '#3f51b5' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={viewType === 'apps'}
          />
        </HomeStyle.TogglBox>
      </HomeStyle.FilterBox>
      {!isEmpty(list) ? (
        <>
          <HomeStyle.List
            data={list}
            renderItem={renderItem}
            keyExtractor={(item: any) => item._id}
            onEndReached={onMore}
            onEndReachedThreshold={0.8}
          />
          <Modal visible={loading} transparent>
            <HomeStyle.ModalBox>
              <HomeStyle.Loding color="blue" />
            </HomeStyle.ModalBox>
          </Modal>
        </>
      ) : (
        <HomeStyle.Loding color="blue" />
      )}
      <FilterModal filter={filter} onFilter={onFilter} />
    </HomeStyle.GameListWrap>
  );
};

export default Home;
