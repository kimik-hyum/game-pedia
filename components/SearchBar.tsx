import React from 'react';
import styled from 'styled-components/native';
import { Header, Item, Input, Icon, Button } from 'native-base';

const SearchBtnText = styled.Text`
 opacity:0;
`

const SearchBar = (props: any) => {
  const { text, onSubmitSearch, setSearchText, visibleButton } = props;
  return (
    <Header searchBar rounded>
      <Item>
        <Icon name="ios-search" />
        <Input 
          placeholder="Search" 
          value={text}
          onChangeText={setSearchText}
          onSubmitEditing={() => onSubmitSearch(text)}
        />
        <Icon name="ios-checkmark" />
      </Item>
      {visibleButton && <Button transparent
        onPress={() => onSubmitSearch(text)}
      >
        <SearchBtnText>Search</SearchBtnText>
      </Button>}
    </Header>
  )
}

export default SearchBar;