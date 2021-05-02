import React, {useState} from 'react';
import {Modal, Pressable, Platform} from 'react-native';
import {Picker, Icon, Button, Text, View} from 'native-base';
import styled from 'styled-components/native';

interface FilterModalProps {
  ModalFilterType?: string;
  ModalTextType?: string;
  filterModal?: boolean;
  onFilter?: Function;
  setFilter?: Function;
}

const FilterModal: React.FC<FilterModalProps> = (props: any) => {
  const filterArray = ['무료', '멀티 플레이', '싱글 플레이', '액션', '인디', '시뮬레이션', 'VR', '캐주얼'];
  const [tag, setTag] = useState<string[]>([]);
  const {filterModal, onFilter} = props;
  const [selected, setSelected] = useState('key1');
  const onValueChange = (value: string) => {
    setSelected(value);
  };
  const removeTag = (text: string) => {
    const cloneTag = tag.slice();
    const index = tag.findIndex(item => item === text)
    cloneTag.splice(index, 1);
    setTag(cloneTag)
  }
  const addTag = (text: string) => {
    tag.indexOf(text) > -1 ? removeTag(text) : setTag(tag.concat(text))
  }
  console.log(tag)

  return (
    <Modal
      visible={filterModal}
      transparent
      onRequestClose={() => {
        onFilter(false);
      }}>
      <FilterModalBox onPress={() => onFilter(false)}>
        <FilterWrap onPress={(event) => event.stopPropagation()}>
          <ModalTitle>검색 필터</ModalTitle>
          <ModalFilterItem>
            <ModalFilterItemText>정렬 기준</ModalFilterItemText>
            <ModalFilterItemSelect
              note
              mode="dropdown"
              selectedValue={selected}
              iosIcon={<Icon name="chevron-down" />}
              onValueChange={(v) => onValueChange(v)}>
              <Picker.Item label="인기순" value="key0" />
              <Picker.Item label="출시일 순" value="key1" />
              <Picker.Item label="평점 순" value="key2" />
            </ModalFilterItemSelect>
          </ModalFilterItem>
          <ModalFilterItem>
            <ModalFilterItemText>출시 날짜</ModalFilterItemText>
            <ModalFilterItemSelect
              note
              mode="dropdown"
              selectedValue={selected}
              iosIcon={<Icon name="chevron-down" />}
              onValueChange={(v) => onValueChange(v)}>
              <Picker.Item label="이번 주" value="key0" />
              <Picker.Item label="이번 달" value="key1" />
              <Picker.Item label="올해" value="key2" />
            </ModalFilterItemSelect>
          </ModalFilterItem>
          <ModalFilterItem ModalFilterType={'column'}>
            <ModalFilterItemText ModalTextType={'column'}>
              태그
            </ModalFilterItemText>
            <ModalFilterTagList>
              {filterArray.map((item: string, i:number) => (
                <ModalFilterTag onPress={() => addTag(item)} key={i} bordered rounded light primary small>
                  <ModalFilterTagText>{item}</ModalFilterTagText>
                </ModalFilterTag>
              ))}
            </ModalFilterTagList>
          </ModalFilterItem>
          <FilterBottom>
            <ModalNormalBtn active small>
             <Text>적용</Text>
            </ModalNormalBtn>
            <ModalNormalBtn active small onPress={() => onFilter(false)}>
             <Text>취소</Text>
            </ModalNormalBtn>
          </FilterBottom>
        </FilterWrap>
      </FilterModalBox>
    </Modal>
  );
};

const FilterModalBox = styled(Pressable)`
  flex: 1;
  background: rgba(0, 0, 0, 0.7);
  justify-content: center;
  align-items: center;
`;
const FilterWrap = styled(Pressable)`
  width: 90%;
  background: #fff;
  padding: 20px;
`;
const ModalTitle = styled.Text`
  color: #333;
  font-size: 20px;
`;
const ModalFilterItem = styled.View<{ModalFilterType?: string}>`
  flex-direction: ${(props) =>
    props.ModalFilterType ? props.ModalFilterType : 'row'};
  align-items: ${(props) =>
    props.ModalFilterType === 'column' ? 'baseline' : 'center'};
  margin-top: 15px;
`;
const ModalFilterItemText = styled(Text)<{ModalTextType?: string}>`
  ${(props) => props.ModalTextType !== 'column' && 'flex:1'};
  color: #333;
  font-size: 15px;
`;
const ModalFilterItemSelect = styled(Picker)`
  font-size: 15px;
  ${Platform.OS === 'web' && 'background-color:#fff;'}
  padding-bottom: 5px;
  color: #333;
  border: 0;
  border-bottom-width: 1px;
  border-style: solid;
  border-color: #ddd;
`;
const ModalFilterTagList = styled(View)`
  margin-top: 2px;
  flex-direction: row;
  flex-wrap: wrap;
`;
const ModalFilterTag = styled(Button)`
  margin-top: 8px;
  margin-right: 8px;
`;

const FilterBottom = styled(View)`
  margin-top: 25px;
  flex-direction: row;
  justify-content: flex-end;
`

const ModalNormalBtn = styled(Button)`
  margin-left: 8px;
`

const ModalFilterTagText = styled(Text)``;


export default FilterModal;
