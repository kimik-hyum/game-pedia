import React, {useEffect, useState, useRef} from 'react';
import axios from 'axios';
import {Text, Modal, Switch} from 'react-native';
import {isEmpty} from '../helper/util';
import SearchBar from '../components/SearchBar';
import FilterModal from '../components/FilterModal';
import queryString from 'query-string';
import HomeStyle from '../styled/HomeStyle';
import {useDispatch} from 'react-redux';
import ImageItem from "../components/ImageItem"
import { uiSlice } from '../store/ui/uiSlice'

const Home = ({navigation}: any) => {
  const dispatch = useDispatch()
  const [list, setList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [appType, setAppType] = useState<boolean>(true);
  const [filterModal, setFilterModal] = useState(false);
  const [filter, setFilter] = useState({tag: [], sort:''});
  const params = {_start: 0, _limit: 10};
  const page = useRef(1);
  const scroll = useRef(true);
  const data_url = 'http://192.168.219.101:1337/';
  useEffect(() => {
    getGameData(setUrl(appType));
  }, []);

  const setUrl = (plag: boolean = true, data: object = {}) => {
    const urlParams = Object.assign({}, params, data);
    const youtubeParams =
      plag ? '?' : '?korean=true&_sort=upload_date:DESC&';
    const url =
      data_url + (plag ? 'apps' : 'youtubes') + youtubeParams + queryString.stringify(urlParams);
    return url;
  };

  const toggleSwitch = () => {
    onViewType(!appType);
  };

  const onViewType = (plag: boolean) => {
    setAppType(plag);
    getGameData(setUrl(plag));
  };
  
  const onFilter = (plag: boolean = true) => {
    setFilterModal(plag);
  };

  const navigationPage = (item: any) => {
    appType && dispatch(uiSlice.actions.setYoutubeList(item.youtubes))
    navigation.navigate(appType ? 'AppDetail' : 'YoutubeDetail', {
      id: appType ? item.id : item.youtube_ids
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
      getGameData(setUrl(appType, {_start: page.current * 10}), true);
    }
  };

  const renderPrice = (free: boolean, price: number, sale: number) => {
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

  const renderItem = ({item}: any) => {
    return (
      <ImageItem item={item} appType={appType} navigationPage={navigationPage}>
        {renderPrice(item.is_free, item.price, item.sale_price)}
      </ImageItem>
    );
  };

  return (
    <HomeStyle.GameListWrap>
      <SearchBar
        onSubmitSearch={onSubmitSearch}
        setSearchText={setSearchText}
        text={searchText}
        onFilter={setFilterModal}
      />
      <HomeStyle.FilterBox>
        <HomeStyle.TogglBox>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={appType ? '#3f51b5' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={appType}
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
      <FilterModal filterModal={filterModal} onFilter={onFilter} setFilter={setFilter}/>
    </HomeStyle.GameListWrap>
  );
};

export default Home;
