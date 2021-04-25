import React from 'react';
import {ScrollView, Text, Platform} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

const Detail = ({route}: any) => {
  return (
    <ScrollView>
      <Text>{route.params.id}</Text>
      {Platform.OS !== 'web' ? (
        <YoutubePlayer height={300} play={true} videoId={route.params.id} />
      ) : (
        <iframe
          width="100%"
          height="300"
          src={`https://www.youtube.com/embed/${route.params.id}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      )}
    </ScrollView>
  );
};

export default Detail;
