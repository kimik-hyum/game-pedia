import styled from 'styled-components/native';
import {Spinner, Container} from 'native-base';

const Home = {
  GameListWrap: styled(Container)`
    flex: 1;
    padding: 0px 0;
  `,
  FilterBox: styled.View`
    max-height: 48px;
    flex-direction: row;
    border: 1px solid #ddd;
    border-top-width: 0;
  `,
  List: styled.FlatList`
    width: 100%;
    flex: 1;
    padding-bottom: 50px;
  `,
  ListItem: styled.TouchableOpacity`
    margin-bottom: 10px;
  `,

  GameInfor: styled.View`
    margin: 10px 10px 0;
  `,
  GameInforText: styled.Text`
    margin-bottom: 4px;
  `,
  GamePriceSale: styled.Text`
    text-decoration: line-through;
  `,
  GameTagList: styled.ScrollView`
    margin-top: 5px;
  `,
  GameTagBox: styled.View`
    padding-right: 10px;
  `,
  GameTag: styled.View`
    color: #67c1f5;
    padding: 3px 5px;
    font-size: 12px;
    border-radius: 3px;
    background: rgba(103, 193, 245, 0.2);
  `,
  GameTagText: styled.Text`
    color:#67c1f5;FilterModal
  `,
  Loding: styled(Spinner)`
    flex: 1;
  `,
  ModalBox: styled.View`
    flex: 1;
    background: rgba(0, 0, 0, 0.7);
  `,
  TogglBox: styled.View`
    padding: 0 5px;
    justify-content: center;
    border-left-width: 1px;
    border-color: #ddd;
    border-style: solid;
  `,
};

export default Home;
