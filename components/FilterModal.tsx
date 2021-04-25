import React, {useState} from 'react';
import {Modal, Pressable, Platform} from 'react-native';
import {Picker, Icon, Button, Text, View} from 'native-base';
import styled from 'styled-components/native';

interface FilterModalProps {
  ModalFilterType?: string;
  ModalTextType?: string;
  filter?: boolean;
  onFilter?: Function;
}

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
const ModalFilterTagText = styled(Text)``;

const FilterModal: React.FC<FilterModalProps> = (props: any) => {
  const {filter, onFilter} = props;
  const [selected, setSelected] = useState('key1');
  const onValueChange = (value: string) => {
    setSelected(value);
  };
  return (
    <Modal
      visible={filter}
      transparent
      onRequestClose={() => {
        onFilter(false);
      }}>
      <FilterModalBox onPress={() => onFilter(false)}>
        <FilterWrap onPress={(event) => event.stopPropagation()}>
          <ModalTitle>검색 필터</ModalTitle>
          <ModalFilterItem>
            <ModalFilterItemText>정렬기준</ModalFilterItemText>
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
              <ModalFilterTag bordered rounded light primary small>
                <ModalFilterTagText>무료</ModalFilterTagText>
              </ModalFilterTag>
              <ModalFilterTag bordered rounded light primary small>
                <ModalFilterTagText>멀티 플레이</ModalFilterTagText>
              </ModalFilterTag>
              <ModalFilterTag bordered rounded light primary small>
                <ModalFilterTagText>싱글 플레이</ModalFilterTagText>
              </ModalFilterTag>
              <ModalFilterTag bordered rounded light primary small>
                <ModalFilterTagText>액션</ModalFilterTagText>
              </ModalFilterTag>
              <ModalFilterTag bordered rounded light primary small>
                <ModalFilterTagText>인디</ModalFilterTagText>
              </ModalFilterTag>
              <ModalFilterTag bordered rounded light primary small>
                <ModalFilterTagText>시뮬레이션</ModalFilterTagText>
              </ModalFilterTag>
              <ModalFilterTag bordered rounded light primary small>
                <ModalFilterTagText>VR</ModalFilterTagText>
              </ModalFilterTag>
              <ModalFilterTag bordered rounded light primary small>
                <ModalFilterTagText>캐주얼</ModalFilterTagText>
              </ModalFilterTag>
            </ModalFilterTagList>
          </ModalFilterItem>
        </FilterWrap>
      </FilterModalBox>
    </Modal>
  );
};
export default FilterModal;
