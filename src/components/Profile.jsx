import React from "react";
import { useState } from "react";
import { Icon } from "react-native-elements";
import { SafeAreaView } from "react-navigation";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";

let { height, width } = Dimensions.get("window");

const profile = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: "center",
    //flex: 1,
    backgroundColor: "#0e0b29",
    ...Platform.select({
      ios: {
        marginTop: -1,
      },
      android: {
        marginTop: 50,
      },
    }),
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
    color: "#FFF",
    fontSize: 22,
    fontWeight: "bold",
    paddingBottom: 8,
    textAlign: "center",
  },
  settingsIcon: {
    alignSelf: "flex-end",
    //paddingRight: 10,
    marginTop: -30,
    height: 48,
    width: 48,
  },
  containerList: {
    flex: 1,
    alignSelf: "flex-start",
    paddingTop: 22,
    //marginBottom: 50,
  },
  viewList: {
    //alignSelf: 'auto',
    flex: 2,
    justifyContent: "space-around",
  },
  item: {
    color: "#FFF",
    padding: 10,
    fontSize: 18,
  },
  /******** card **************/
  card: {
    width: width,
    height: 60,
    flexDirection: "row",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  cardImage: {
    height: 40,
    width: 40,
  },
  title: {
    flex: 1,
    color: "#FFFFFF",
    fontWeight: "bold",
    marginLeft: 40,
  },
  rank: {
    flex: 1,
    color: "#FFFFFF",
    fontWeight: "bold",
    marginLeft: 50,
    alignSelf: "center",
  },
  elo: {
    flex: 1,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

const Profile = ({ navigation }) => {
  const [items, setItems] = React.useState([
    {
      id: 1,
      title: "Grupo 1",
      color: "#FF4500",
      image: "https://img.icons8.com/pastel-glyph/344/football-net.png",
      rank: 7,
      elo: 960,
    },
    {
      id: 2,
      title: "Grupo 2",
      color: "#87CEEB",
      image: "https://img.icons8.com/ios/344/ping-pong.png",
      rank: 2,
      elo: 2600,
    },
    {
      id: 3,
      title: "Grupo 3",
      color: "#4682B4",
      image: "https://img.icons8.com/ios/344/ping-pong.png",
      rank: 13,
      elo: 500,
    },
    {
      id: 4,
      title: "Grupo 4",
      color: "#6A5ACD",
      image: "https://img.icons8.com/pastel-glyph/344/football-goal.png",
      rank: 7,
      elo: 500,
    },
    {
      id: 5,
      title: "Grupo 5",
      color: "#FF69B4",
      image: "https://img.icons8.com/ios-glyphs/344/netball.png",
      rank: 7,
      elo: 500,
    },
    {
      id: 6,
      title: "Grupo 6",
      color: "#00BFFF",
      image: "https://img.icons8.com/pastel-glyph/344/football-net.png",
      rank: 7,
      elo: 500,
    },
    {
      id: 7,
      title: "Grupo 7",
      color: "#00FFFF",
      image: "https://img.icons8.com/ios-glyphs/344/netball.png",
      rank: 7,
      elo: 500,
    },
    {
      id: 8,
      title: "Grupo 8",
      color: "#20B2AA",
      image: "https://img.icons8.com/ios/344/ping-pong.png",
      rank: 7,
      elo: 500,
    },
    {
      id: 9,
      title: "Grupo 9",
      color: "#191970",
      image: "https://img.icons8.com/ios/344/ping-pong.png",
      rank: 7,
      elo: 500,
    },
    {
      id: 10,
      title: "Grupo 10",
      color: "#008080",
      image: "https://img.icons8.com/ios-glyphs/344/netball.png",
      rank: 7,
      elo: 500,
    },
  ]);

  const onPress = () => {
    navigation.navigate("Ligas");
  };

  return (
    <View style={profile.container}>
      <TouchableOpacity style={profile.settingsIcon}>
        <Icon name="ios-settings" type="ionicon" color="white" />
      </TouchableOpacity>
      <Image
        style={profile.userImage}
        source={{
          uri: "https://cdn.pixabay.com/photo/2017/02/23/13/05/profile-2092113_960_720.png",
        }}
      />
      <Text style={profile.userNameText}>Pepe Mendez</Text>
      <Text style={profile.userNameText}>NickName</Text>
      <View style={profile.containerList}>
        <FlatList
          data={items}
          //horizontal={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={[profile.card, { backgroundColor: item.color }]}
                onPress={onPress}
              >
                <Image style={profile.cardImage} source={{ uri: item.image }} />
                <Text style={profile.title}>{item.title}</Text>
                <Text style={profile.rank}>{item.rank}</Text>
                <Text style={profile.elo}>{item.elo}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

export default Profile;
