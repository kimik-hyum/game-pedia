import React from 'react';
import {Platform} from 'react-native';
import {Button, Text, Icon} from 'native-base';
import styled from 'styled-components/native';

const FilterItem = styled.View`
  flex-direction:row;
  padding:8px 0;
`
const FilterButton = styled(Button)`
    height:30px;
    margin-left:8px;
    color:#000;
    background-color:#fff;
    border:1px solid #ddd;
`
const FilterIcon = styled(Icon)`
  font-size:14px;
`

const Filter = (props:any) => {
  return (
    <FilterItem>
      <FilterButton rounded light>
        <Text>무료</Text>
      </FilterButton>
      <FilterButton rounded light>
        <Text>인기순</Text>
      </FilterButton>
      <FilterButton rounded light>
        <Text>출시순</Text>
      </FilterButton>
      <FilterButton rounded light>
        <Text>
          장르 
          <FilterIcon name="ios-chevron-down-outline"></FilterIcon>
        </Text>
      </FilterButton>

    </FilterItem>
  )
}
export default Filter;