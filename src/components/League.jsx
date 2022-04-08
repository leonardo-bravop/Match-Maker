import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Pressable,
  Modal,
} from "react-native";

import axios from "axios";
import Constants from "expo-constants";

import "moment/locale/es";
import { Icon } from "react-native-elements";

import { leagueStyles } from "../styles/league";

import List from "../commons/List";
import { useDispatch, useSelector } from "react-redux";
import ItemLeague from "./ItemLeague";
import FootLigue from "./FootLeague";
import { setLeagueId } from "../state/idLeague";

const League = ({ navigation }) => {
  const { manifest } = Constants;
  const uri = `http://${manifest.debuggerHost.split(":").shift()}:3000`;

  let [memberList, setMemberList] = useState([]);
  let [leagueList, setLeagueList] = useState([]);
  let [actualleague, setActualLeague] = useState({});
  let [user, setUser] = useState({});
  let [showCard, setShowCard] = useState(false);

  const dispatch = useDispatch();

  const userData = useSelector((state) => state.user);

  const leagueId = useSelector((state) => state.leagueId);

  const resetData = useSelector((state) => state.checks);

  useEffect(() => {
    let rank = 0;

    axios.get(`${uri}/api/user/getLeagues/${userData._id}`).then(({ data }) => {
      setLeagueList(data);
      if (leagueId === "") dispatch(setLeagueId(data[0]._id));
    });

    axios
      .get(`${uri}/api/league/getUsers/${leagueId}`)
      .then(({ data }) => {
        setMemberList(
          data.rankedUsers.map((element, i) => {
            if (userData._id === element._id) rank = i + 1;
            return {
              id: element._id,
              rank: i + 1,
              color: "blue",
              nickname: element.nickname,
              elo: 2931,
            };
          })
        );
      })
      .then(() => {
        setUser({
          id: userData._id,
          rank: rank,
          color: "red",
          nickname: userData.nickname,
          elo: 2931,
        });
      });

    axios.get(`${uri}/api/league/showLeague/${leagueId}`).then(({ data }) => {
      setActualLeague(data);
    });
  }, [leagueId, resetData]);

  const pressHandler = (id) => {
    dispatch(setLeagueId(id));
    setShowCard(!showCard);
  };

  return (
    <SafeAreaView style={leagueStyles.back}>
      <Modal animationType="fade" transparent={true} visible={showCard}>
        <Pressable
          onPress={() => {
            setShowCard(false);
          }}
          style={{
            height: "100%",
            backgroundColor: "rgba(30,30,50,0.85)",
            justifyContent: "center",
          }}
        >
          <View>
            <ScrollView>
              <View
                style={{
                  flex: 1,
                  marginHorizontal: 16,
                  backgroundColor: "#0e0b29",
                  padding: 10,
                  borderRadius: 10,
                }}
              >
                <View style={{ flex: 1 }}>
                  <ScrollView>
                    <View>
                      {leagueList.map((item, i) => {
                        return (
                          <TouchableOpacity
                            style={{ margin: 7 }}
                            onPress={() => pressHandler(item._id)}
                          >
                            <Text
                              style={{
                                color: "#FFFFFF",
                                fontSize: 16,
                                textAlign: "center",
                              }}
                            >
                              {item.name}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </ScrollView>
                </View>
              </View>
            </ScrollView>
          </View>
        </Pressable>
      </Modal>

      <View
        style={[leagueStyles.head, { backgroundColor: actualleague.color }]}
      >
        <ImageBackground
          resizeMode="cover"
          source={{ uri: actualleague.img }}
          style={{ flex: 1 }}
        >
          <TouchableOpacity
            style={[
              leagueStyles.menu,
              { alignSelf: "flex-end", justifyContent: "center" },
            ]}
            onPress={() => setShowCard(true)}
          >
            <Icon
              name="caret-down-circle"
              type="ionicon"
              color="green"
              size={32}
            />
          </TouchableOpacity>

          <View style={leagueStyles.info}>
            <Text style={leagueStyles.title}>{actualleague.name}</Text>
          </View>
        </ImageBackground>
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

        <List list={memberList} Element={ItemLeague} />

        <FootLigue leagueId={actualleague._id} user={user} />
      </View>
    </SafeAreaView>
  );
};

export default League;
