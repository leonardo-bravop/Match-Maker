import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ImageBackground } from "react-native";
import List from "../commons/List";

import { leagueStyles } from "../styles/league";
import FootLigue from "./FootLeague";
import Constants from "expo-constants";
import axios from "axios";
import ItemLeague from "./ItemLeague";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { useDispatch, useSelector } from "react-redux";

const League = ({ navigation }) => {
  const dispatch = useDispatch()
  const { state, navigate } = navigation;

  const userData = useSelector((state) => state.user)
  const selectLeague = useSelector((state) => state.selectLeague)
  const members = useSelector((state) => state.members)

  let [memberList, setMemberList] = useState([]);
  let [leagueList, setLeagueList] = useState([]);
  let [actualleague, setActualLeague] = useState({});
  let [user, setUser] = useState({})
  let [selectedValue, setSelectedValue] = useState(" ");

  const { manifest } = Constants;
  const uri = `http://${manifest.debuggerHost.split(":").shift()}:3000`;

  // const getUser = async () => {
  //   try {
  //     const userString = await AsyncStorage.getItem("userInfo");

  //     const result = await axios.post(
  //       `${uri}/api/user/me`,
  //       {},
  //       { headers: { Authorization: `Bearer ${userString}` } }
  //     );

  //     setUser({
  //       id: result.data._id,
  //       rank: 0,
  //       color: "red",
  //       nickname: result.data.nickname,
  //       elo: 2931,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const getMembers = async () => {
  //   try {
  //     const userString = await AsyncStorage.getItem("userInfo");

  //     const result = await axios.post(
  //       `${uri}/api/user/me`,
  //       {},
  //       { headers: { Authorization: `Bearer ${userString}` } }
  //     );

  //     const { data } = await axios.get(
  //       `${uri}/api/league/getUsers/${state.params._id}`
  //     );

  //     console.log("DATA =====>", data);

  //     setMemberList(
  //       data.map((element, i) => {
  //         if (result.data._id === element._id) {
  //           setUser({
  //             id: result.data._id,
  //             rank: i + 1,
  //             color: "red",
  //             nickname: result.data.nickname,
  //             elo: 2931,
  //           });
  //         }
  //         return {
  //           id: element._id,
  //           rank: i + 1,
  //           color: "blue",
  //           nickname: element.nickname,
  //           elo: 2931,
  //         };
  //       })
  //     );
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const getLeagues = async () => {
    try {
      const userString = await AsyncStorage.getItem("userInfo");

      const result = await axios.post(
        `${uri}/api/user/me`,
        {},
        { headers: { Authorization: `Bearer ${userString}` } }
      );

      const res = await axios.get(
        `${uri}/api/user/getLeagues/${result.data._id}`
      );

      setLeagueList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(async () => {
    try {
      const userString = await AsyncStorage.getItem("userInfo");

      const result = await axios.post(
        `${uri}/api/user/me`,
        {},
        { headers: { Authorization: `Bearer ${userString}` } }
      );

      setUser({
        id: result.data._id,
        rank: 7,
        color: "red",
        nickname: result.data.nickname,
        elo: 2931,
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(async () => {
    if (state.params) {
      try {
        const { data } = await axios.get(
          `${uri}/api/league/getUsers/${state.params._id}`
        );

        setMemberList(
          data.map((element, i) => {
            if (data._id === element._id) {
              setUser({
                id: data._id,
                rank: i + 1,

                color: "red",
                nickname: data.nickname,
                elo: 2931,
              });
            }
            return {
              id: element._id,
              rank: i + 1,
              color: "blue",
              nickname: element.nickname,
              elo: 2931,
            };
          })
        );
      } catch (err) {
        console.log(err);
      }
    }
    // return;
    //getUser();
    getLeagues();
  }, [members]);

  // useEffect(() => {
  //   getLeagues();
  // }, []);

  const changeHandler = (itemValue) => {
    axios.get(`${uri}/api/league/showLeague/${itemValue}`).then(({ data }) => {
      setActualLeague(data);
    });
  };
  return (
    <SafeAreaView style={leagueStyles.back}>
      <View
        style={[leagueStyles.head, { backgroundColor: actualleague.color }]}
      >
        {/* <View style={leagueStyles.menu}>
          <Picker
            selectedValue={selectedValue}
            style={{
              height: 50,
              width: 40,
              alignSelf: "flex-end",
              color: actualleague.color,
            }}
            itemStyle={{ height: 50 }}
            onValueChange={(itemValue, itemIndex) => {
              changeHandler(itemValue);
              setSelectedValue(itemValue);
            }}
          >
            {navigation.state.params && (
              <Picker.Item
                label={navigation.state.params.name}
                value={navigation.state.params._id}
                key={0}
              />
            )}
            {leagueList.map((element, i) => (
              <Picker.Item
                label={element.name}
                value={element._id}
                key={i + 1}
              />
            ))}
          </Picker>
        </View> */}
        {state.params ?
        <ImageBackground resizeMode="cover" source={{uri: state.params.img}} style={{flex: 1}}>
          <View style={leagueStyles.info}>
            <Text style={leagueStyles.title}>
              {state.params.name}
            </Text>
          </View>
        </ImageBackground>
        : null}
      </View>

      <View style={leagueStyles.body}>
        <View style={leagueStyles.listHead}>
          <View style={leagueStyles.enum}>
            <View
              style={{ width: 50, alignItems: "center", marginVertical: 5 }}
            >
              <Text style={{ color: "#FFFFFF" }}>Rank</Text>
            </View>
            <View
              style={{ width: 50, alignItems: "center", marginVertical: 5 }}
            >
              <Text style={{ color: "#FFFFFF" }}></Text>
            </View>
            <View
              style={{
                flex: 1,
                width: "auto",
                alignItems: "center",
                marginVertical: 5,
              }}
            >
              <Text style={{ color: "#FFFFFF" }}>Nick</Text>
            </View>
            <View
              style={{ width: 100, alignItems: "center", marginVertical: 5 }}
            >
              <Text style={{ color: "#FFFFFF" }}>ELO</Text>
            </View>
          </View>
        </View>

        {state.params ? (
          <>
            <List list={memberList} Element={ItemLeague} />
            <FootLigue ligueId={selectLeague._id} userData={userData} />
          </>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default League;
