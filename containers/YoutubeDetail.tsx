import React, {useEffect} from 'react';
import { ScrollView, Text, Platform } from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";

const Detail = ({route}:any) => {
  useEffect(() => {
    
  }, [])
  return (
    <ScrollView>
      <Text>{route.params.id}</Text>
      {Platform.OS !== 'web' ? (
        <YoutubePlayer
          height={300}
          play={true}
          videoId={route.params.id}
        />
      ) : (
        <iframe width="560" height="315" src={`https://www.youtube.com/embed/${route.params.id}`}allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
      )}
        
    </ScrollView>
  )
}

export default Detail;