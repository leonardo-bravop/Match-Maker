import React, { useEffect, useState } from "react";
/* import { Icon } from "react-native-elements"; */
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
  ScrollView,
} from "react-native";
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { leagueStyles } from "../styles/league";
import { setLeague } from "../state/selectLeague";
import { setMembers } from "../state/memberList";

import { useDispatch, useSelector } from "react-redux";
import { setLeagueId } from "../state/idLeague";

import { FAB, Portal, Provider } from "react-native-paper";

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white",
  },
});

const Profile = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const leagues = useSelector((state) => state.userLeagues);
  const [userData, setUserData] = useState({});

  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  const { manifest } = Constants;
  const uri = `http://${manifest.debuggerHost.split(":").shift()}:3000`;

  const actions = [
    {
      text: "Accessibility",
      icon: require("../assets/logo.png"),
      name: "bt_accessibility",
      position: 2,
    },
    {
      text: "Language",
      icon: require("../assets/logo.png"),
      name: "bt_language",
      position: 1,
    },
    {
      text: "Location",
      icon: require("../assets/logo.png"),
      name: "bt_room",
      position: 3,
    },
    {
      text: "Video",
      icon: require("../assets/logo.png"),
      name: "bt_videocam",
      position: 4,
    },
  ];

  // useEffect(async () => {
  //   try {
  //     const userToken = await AsyncStorage.getItem("userInfo");
  //     const user = await axios.post(
  //       `${uri}/api/user/me`,
  //       {},
  //       { headers: { Authorization: `Bearer ${userToken}` } }
  //     );
  //     setUser(user.data);
  //     const leagues = await axios.get(
  //       `${uri}/api/user/getLeagues/${user.data._id}`
  //     );
  //     setLeagues(leagues.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, [navigation.state.params]);

  // const onPress = () => {
  //   navigation.navigate("Ligas");
  // };

  const handleLogout = async () => {
    try {
      const result = await axios.post(`${uri}/api/user/logout`);
      const emptyUser = result.data;
      setUserData(emptyUser);
      navigation.navigate("Welcome");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={profile.container}>
      {/*       <TouchableOpacity style={profile.settingsIcon}>
        <MenuProvider style={profile.settingsMenu}>
          <Menu>
            <MenuTrigger customStyles={profile.menu}>
              <Icon name="ios-settings" type="ionicon" color="white" />
            </MenuTrigger>
            <MenuOptions>
              <MenuOption onSelect={handleLogout}>
              <Text style={{ color: "red", fontSize: 20 }}>Salir</Text>
              </MenuOption>
              </MenuOptions>
              </Menu>
              </MenuProvider>
            </TouchableOpacity> */}
      <Provider>
        <Portal>
          <FAB.Group
            style={[profile.settingsIcon,{
              position: 'relative',
              marginTop: 20,
              
              //position: "absolute",
              // bottom: 0,
              // right: 0,
              //color: "black",
              //margin: 16,
            }]}
            open={open}
            icon={open ? "close" : "cog"}
            actions={[
              {
                icon: "bell",
                label: "NOTIFICACIONES",
                onPress: () => {},
              },
              {
                icon: "account-cog",
                label: "EDIT",
                onPress: () => handleLogout(),
              },
              {
                icon: "account-remove",
                label: "LOGOUT",
                onPress: () => handleLogout(),
              },
            ]}
            onStateChange={onStateChange}
            onPress={() => {
              if (open) {
                // do something if the speed dial is open
              }
            }}
          />
        </Portal>
      </Provider>
      <Image
        style={profile.userImage}
        source={{
          uri: "https://cdn.pixabay.com/photo/2017/02/23/13/05/profile-2092113_960_720.png",
        }}
      />
      <Text style={profile.userNameText}>{`${user.name} ${user.surname}`}</Text>
      <Text style={profile.userNameText}>{`${user.nickname}`}</Text>

      <View style={[leagueStyles.body, { width: "95%" }]}>
        <View style={leagueStyles.listHead}>
          <View style={leagueStyles.enum}>
            <View style={{ width: 50, alignItems: "center" }}>
              <Text style={{ color: "#FFFFFF" }}>Rank</Text>
            </View>
            <View style={{ width: 50, alignItems: "center" }}>
              <Text style={{ color: "#FFFFFF" }}>Foto</Text>
            </View>
            <View style={{ flex: 1, width: "auto", alignItems: "center" }}>
              <Text style={{ color: "#FFFFFF" }}>Nick</Text>
            </View>
            <View style={{ width: 100, alignItems: "center" }}>
              <Text style={{ color: "#FFFFFF" }}>ELO</Text>
            </View>
          </View>
        </View>
        {leagues[0] ? (
          <ScrollView style={profile.listContainer}>
            {leagues.map((item, i) => {
              return (
                <View key={i}>
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(setLeague(item));
                      dispatch(setMembers(item._id));
                      dispatch(setLeagueId(item._id));
                      navigation.navigate("Liga", item);
                    }}
                  >
                    <View
                      style={[
                        leagueStyles.item,
                        { backgroundColor: `${item.color}` },
                      ]}
                    >
                      <View style={leagueStyles.rank}>
                        <Text style={{ color: "#FFFFFF" }}>
                          {parseInt(Math.random() * (1 - 20 + 1) + 20)}
                        </Text>
                      </View>
                      <View
                        style={[
                          leagueStyles.img,
                          { backgroundColor: item.code },
                        ]}
                      >
                        <Image
                          style={profile.cardImage}
                          source={{ uri: item.img }}
                        />
                      </View>
                      <View style={leagueStyles.nick}>
                        <Text style={{ color: "#FFFFFF" }}>{item.name}</Text>
                      </View>
                      <View style={leagueStyles.elo}>
                        <Text style={{ color: "#FFFFFF" }}>
                          {parseInt(Math.random() * (400 - 3000 + 1) + 3000)}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        ) : null}
      </View>
    </View>
  );
};

export default Profile;
