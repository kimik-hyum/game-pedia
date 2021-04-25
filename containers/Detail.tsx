import React from 'react';
import {ScrollView, Text} from 'react-native';

const Detail = ({route, navigation}: any) => {
  const {id, youtubes} = route.params;
  const navigationYoutubePage = (id: string) => {
    navigation.navigate('YoutubeDetail', {
      id: id,
    });
  };
  return (
    <ScrollView>
      <Text>{id}</Text>
      {youtubes.split(',').map((ids: string, i: number) => (
        <Text onPress={() => navigationYoutubePage(ids)} key={i}>
          {ids}
        </Text>
      ))}
    </ScrollView>
  );
};

export default Detail;
