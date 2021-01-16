import React, {useState, useEffect} from 'react';
import { ScrollView, Text, Platform } from 'react-native';
import axios from 'axios';
import YoutubePlayer from "react-native-youtube-iframe";

const Detail = ({route}:any) => {
  const [detail, setDetail] = useState([]);
  useEffect(() => {
    axios.get(`http://192.168.0.103:1337/youtubes?appid_eq=${route.params.id}`).then((res) => {
      const data = res.data[0].youtube_ids.split(',');
      console.log(data)
      setDetail(data)
    })
  }, [])
  return (
    <ScrollView>
      <Text>{route.params.id}</Text>
      {detail && detail.map((item: any) => {
        return Platform.OS !== 'web' ? (
          <YoutubePlayer
            height={300}
            play={true}
            videoId={item}
          />
        ) : (
          <iframe width="560" height="315" src={`https://www.youtube.com/embed/${item}`}allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
        )
      })}
    </ScrollView>
  )
}

export default Detail;