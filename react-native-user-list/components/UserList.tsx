import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../redux/user_slice";
import UserCard from "./UserCard";
import { RootState, AppDispatch } from "../redux/store";
import { Searchbar, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const UserList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.users);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = data.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedUsers = filteredUsers.slice(0, page * itemsPerPage);

  const loadMore = () => {
    setPage(page + 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Searchbar
          style={styles.searchBar}
          placeholder="Search by name"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <FlatList
          data={paginatedUsers}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <UserCard user={item} />}
          ItemSeparatorComponent={() => (
            <View style={{ borderTopWidth: 1, borderTopColor: "#ccc" }} />
          )}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
        />
        {paginatedUsers.length < filteredUsers.length && (
          <Button mode="contained" style={styles.button} onPress={loadMore}>
            Load More
          </Button>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    gap: 8,
    paddingTop: 30,
    paddingBottom: 16,
    paddingHorizontal: 16,
    marginTop: 30,
    marginHorizontal: 16,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: "#f5f5f5",
  },
  searchBar: {
    backgroundColor: "white",
    borderWidth: 0.5,
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#7D0DC3",
    borderRadius: 8,
    height: 40,
    color: "white",
  },
});

export default UserList;
