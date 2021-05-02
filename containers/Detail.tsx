import React from 'react';
import {ScrollView, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {youtubeList} from '../store/ui/uiSelector';

const Detail = ({route, navigation}: any) => {
  const youtube = useSelector(youtubeList)
  const {id} = route.params;
  const navigationYoutubePage = (id: string) => {
    navigation.navigate('YoutubeDetail', {
      id: id,
    });
  };
  return (
    <ScrollView>
      <Text>{id}</Text>
      {(youtube as []).map((item: any, i:number) => {
        return (
          <Text onPress={() => navigationYoutubePage(item.youtube_ids)} key={i}>
            {item.title}
          </Text>
        )
      })}
    </ScrollView>
  );
};

export default Detail;
