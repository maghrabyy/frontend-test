import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { User } from "../types/user";
import { Avatar } from "react-native-paper";

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {
  const address = `${user.address.street}, ${user.address.city}, ${user.address.zipcode}`;

  return (
    <View style={styles.card}>
      <Avatar.Icon size={32} icon="account" style={styles.avatar} />
      <View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.address}>{address}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingVertical: 16,
    flexDirection: "row",
    gap: 12,
  },
  avatar: {
    backgroundColor: "#7D0DC3",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  email: {
    fontSize: 14,
    color: "#666",
  },
  address: {
    fontSize: 14,
    color: "#888",
  },
});

export default UserCard;
