import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import User from '../components/User';
import Colors from '../constants/Colors';
import {remove} from '../store/userSlice';
import {setSearchUser} from '../store/userListSlice';

export default function BookmarkedUsers() {
  const selectedUsers = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const {data: users, searchValue} = useSelector(
    (state: any) => state.usersList,
  );

  const handleSelect = (user: any) => {
    dispatch(remove(user));
  };

  const handleText = (text: string) => {
    console.log(text);
    dispatch(setSearchUser(text));
  };

  const filteredData = users.filter((item: any) =>
    item.login.includes(searchValue),
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      {selectedUsers.length > 0 ? (
        <>
          <TextInput
            placeholder="Search Here"
            style={styles.searchBar}
            onChangeText={text => handleText(text)}
            value={searchValue}
          />
          <FlatList
            data={searchValue.trim().length > 0 ? filteredData : selectedUsers}
            keyExtractor={(_, index) => index.toString()}
            renderItem={(item: any) => {
              return (
                <User
                  name={item.item.login}
                  avatar_url={item.item.avatar_url}
                  selected={true}
                  onPress={() => handleSelect(item.item)}
                />
              );
            }}
          />
        </>
      ) : (
        <View style={styles.noDataContainer}>
          <Text>No data is available load some data</Text>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY.BODY,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    borderWidth: 0.5,
    marginHorizontal: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
});
