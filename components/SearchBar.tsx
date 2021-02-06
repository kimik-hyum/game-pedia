import React from 'react';
import styled from 'styled-components/native';
import { Header, Item, Input, Icon } from 'native-base';

const FilterBox = styled.View`
  flex:1;
  justify-content:center;
  min-width:47px;
  padding:0 10px;
`
const SerachBox = styled(Item)`
  flex:90;
`
const FilterButton = styled.TouchableOpacity`
`
const Searchheader = styled(Header)`
  padding-left:10px;
  padding-right:0;
`

const SearchBar = (props: any) => {
  const { text, onSubmitSearch, setSearchText, onFilter } = props;
  return (
    <Searchheader searchBar rounded>
      <SerachBox>
        <Icon name="ios-search" />
        <Input 
          placeholder="Search" 
          value={text}
          onChangeText={setSearchText}
          onSubmitEditing={() => onSubmitSearch(text)}
        />
      </SerachBox>
      <FilterBox>
        <FilterButton onPress={() => onFilter(true)}>
          <Icon name="ios-filter" />
        </FilterButton>
      </FilterBox>
    </Searchheader>
  )
}

export default SearchBar;