import React, { useEffect, useState } from "react";
import { Icon } from "react-native-elements";
import { SafeAreaView } from "react-navigation";
import { profile } from "../styles/profile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import axios from "axios";
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
import { ligaStyles } from "../styles/ligaStyle";

const Profile = ({ navigation }) => {
  const [user, setUser] = useState({});
  const [items, setItems] = useState([
    {
      id: 1,
      title: "Liga 1",
      color: "#FF4500",
      image: "https://img.icons8.com/pastel-glyph/344/football-net.png",
      rank: 7,
      elo: 960,
    },
    {
      id: 2,
      title: "Liga 2",
      color: "#87CEEB",
      image: "https://img.icons8.com/ios/344/ping-pong.png",
      rank: 2,
      elo: 2600,
    },
    {
      id: 3,
      title: "Liga 3",
      color: "#4682B4",
      image: "https://img.icons8.com/ios/344/ping-pong.png",
      rank: 13,
      elo: 500,
    },
    {
      id: 4,
      title: "Liga 4",
      color: "#6A5ACD",
      image: "https://img.icons8.com/pastel-glyph/344/football-goal.png",
      rank: 7,
      elo: 500,
    },
    {
      id: 5,
      title: "Liga 5",
      color: "#FF69B4",
      image: "https://img.icons8.com/ios-glyphs/344/netball.png",
      rank: 7,
      elo: 500,
    },
    {
      id: 6,
      title: "Liga 6",
      color: "#00BFFF",
      image: "https://img.icons8.com/pastel-glyph/344/football-net.png",
      rank: 7,
      elo: 500,
    },
    {
      id: 7,
      title: "Liga 7",
      color: "#00FFFF",
      image: "https://img.icons8.com/ios-glyphs/344/netball.png",
      rank: 7,
      elo: 500,
    },
    {
      id: 8,
      title: "Liga 8",
      color: "#20B2AA",
      image: "https://img.icons8.com/ios/344/ping-pong.png",
      rank: 7,
      elo: 500,
    },
    {
      id: 9,
      title: "Liga 9",
      color: "#191970",
      image: "https://img.icons8.com/ios/344/ping-pong.png",
      rank: 7,
      elo: 500,
    },
    {
      id: 10,
      title: "Liga 10",
      color: "#008080",
      image: "https://img.icons8.com/ios-glyphs/344/netball.png",
      rank: 7,
      elo: 500,
    },
  ]);

  const { manifest } = Constants;
  const uri = `http://${manifest.debuggerHost.split(":").shift()}:3000`;

  useEffect(async () => {
    try {
      const userToken = await AsyncStorage.getItem("userInfo");
      const user = await axios.post(
        `${uri}/api/user/me`,
        {},
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      setUser(user.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const onPress = () => {
    navigation.navigate("Ligas");
  };

  const handleLogout = async () => {
    try {
      const result = await axios.post(`${uri}/api/user/logout`);
      const emptyUser = result.data;
      setUser(emptyUser);
      console.log("empty user es", emptyUser);
      navigation.navigate("Welcome");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={profile.container}>
      <TouchableOpacity style={profile.settingsIcon} onPress={handleLogout}>
        <Icon name="ios-settings" type="ionicon" color="white" />
      </TouchableOpacity>
      <Image
        style={profile.userImage}
        source={{
          uri: "https://cdn.pixabay.com/photo/2017/02/23/13/05/profile-2092113_960_720.png",
        }}
      />
      <Text style={profile.userNameText}>{`${user.name} ${user.surname}`}</Text>
      <Text style={profile.userNameText}>{`${user.nickname}`}</Text>
      <View style={profile.containerList}>
        <View style={profile.header}>
          <Text style={profile.headerList}>
            Foto
          </Text>
          <Text style={profile.headerList}>Nombre</Text>
          <Text style={profile.headerList}>Rank</Text>
          <Text style={profile.headerList}>Elo</Text>
        </View>
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
                  <Image
                    style={profile.cardImage}
                    source={{ uri: item.image }}
                  />
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
