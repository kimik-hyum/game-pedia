import React, {useEffect} from 'react';
import { ScrollView, Text } from 'react-native';

const Detail = ({route}:any) => {
  useEffect(() => {
  }, [])
  return (
    <ScrollView>
      <Text>{route.params.id}</Text>
    </ScrollView>
  )
}

export default Detail;