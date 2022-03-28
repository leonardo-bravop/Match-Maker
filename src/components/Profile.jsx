import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: "transparent",
    alignItems: "center",
    elevation: 1,
    marginTop: -1,
    backgroundColor: "#090717"
  },
  userImage: {
    borderColor: "#FFF",
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
  },
    userNameText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 8,
    textAlign: 'center',
  },
});

const Profile = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.userImage}
        source={{
          uri: "https://cdn.pixabay.com/photo/2017/02/23/13/05/profile-2092113_960_720.png",
        }}
      />
      <Text style={styles.userNameText}>Pepe Mendez</Text>
    </View>
  );
};

export default Profile;
