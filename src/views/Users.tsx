import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  RefreshControl,
  SafeAreaView,
  TextInput,
  Button,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '../constants/Colors';
import User from '../components/User';
import {useDispatch, useSelector} from 'react-redux';
import {select} from '../store/userSlice';
import {fetchUsers, setPageLimit, setSearchUser} from '../store/userListSlice';
import {STATUS} from '../store/userListSlice';

const wait = (timeout: any) => {
  return new Promise((resolve: any) => setTimeout(resolve, timeout));
};

export default function Users() {
  const dispatch = useDispatch();
  const {
    data: users,
    limit,
    status,
    searchValue,
  } = useSelector((state: any) => state.usersList);
  const [selected, setSelected] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers(limit));
  }, [limit]);

  const handleSelect = (user: any) => {
    dispatch(select(user));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      dispatch(setPageLimit(5));
      setRefreshing(false);
    });
  }, []);

  const loadMore = () => {
    console.log('loadMore clicked');
    console.log(limit);
    dispatch(setPageLimit());
  };

  const renderFooter = () => {
    return (
      //Footer View with Load More button
      <View style={styles.footer}>
        <Button title="Load More" onPress={() => loadMore()} />
      </View>
    );
  };

  if (status === STATUS.LOADING) {
    return (
      <View style={styles.statusContainer}>
        <ActivityIndicator />
      </View>
    );
  }

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
          <TextInput
            placeholder="Search Here"
            style={styles.searchBar}
            onChangeText={text => handleText(text)}
            value={searchValue}
          />
          <FlatList
            data={searchValue.trim().length > 0 ? filteredData : users}
            keyExtractor={(_, index) => index.toString()}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={(item: any) => {
              return (
                <User
                  name={item.item.login}
                  avatar_url={item.item.avatar_url}
                  selected={selected}
                  onPress={() => handleSelect(item.item)}
                />
              );
            }}
            ListFooterComponent={renderFooter}
          />
      </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY.BODY,
  },
  searchBar: {
    borderWidth: 0.5,
    marginHorizontal: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  statusContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
