import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Pressable,
  Modal,
} from "react-native";

import axios from "axios";
import Constants from "expo-constants";

import moment from "moment";
import "moment/locale/es";
import CalendarStrip from "react-native-calendar-strip";
import { Icon } from "react-native-elements";

import List from "../commons/List";
import ItemMatch from "./ItemMatch";
import ListHead from "./MatchListHead";

import { cardStyles, matchStyles, pickerStyles } from "../styles/match";

import { useDispatch, useSelector } from "react-redux";
import { resetTeams } from "../state/teams";
import { resetChecks } from "../state/checks";
import { setMembers } from "../state/memberList";
import { setUserLeagues } from "../state/userLeague";
import MatchDetails from "./matchDetails";
import { colorSet } from "../styles/colorSet";

const Match = ({ navigation }) => {
  const { manifest } = Constants;
  const uri = `http://${manifest.debuggerHost.split(":").shift()}:3000`;

  let [memberList, setMemberList] = useState([]);
  let [actualleague, setActualLeague] = useState({});
  let [selectedValue, setSelectedValue] = useState("");
  let [match, setMatch] = useState({});

  let [onDate, setOnDate] = useState(moment());
  let [onTime, setOnTime] = useState(
    parseInt(moment().format("mm")) > 30
      ? [`${parseInt(moment().format("H")) + 1}`, "00"]
      : [moment().format("H"), "30"]
  );
  let [nicks1, setNicks1] = useState([]);
  let [nicks2, setNicks2] = useState([]);
  let [description, setDescription] = useState("");

  let [noPress, setNoPress] = useState(false);
  let [showCard, setShowCard] = useState(false);
  let [showPicker, setShowPicker] = useState(false);
  let [showTime, setShowTime] = useState(false);

  let [errMessage, setErrMessage] = useState(
    "Both teams must have equal team members number"
  );

  const dispatch = useDispatch();

  const userData = useSelector((state) => state.user);
  const leagueList = useSelector((state) => state.userLeagues);
  const teams = useSelector((state) => state.teams);

  useEffect(() => {
    setNoPress(false);
  }, [teams]);

  useLayoutEffect(() => {
    setOnTime(
      parseInt(moment().format("mm")) > 30
        ? [`${parseInt(moment().format("H")) + 1}`, "00"]
        : [moment().format("H"), "30"]
    );

    const loadData = async () => {
      const resData = await dispatch(setUserLeagues({ userId: userData._id }));
      if (!resData.payload.length) return;
      if (selectedValue === "" && resData.payload.length) {
        setSelectedValue(resData.payload[0].league._id);
      }

      const { payload } = await dispatch(
        setMembers(
          selectedValue === "" ? resData.payload[0].league._id : selectedValue
        )
      );

      let userInList;
      let members = payload.filter((member) => {
        if (member._id === userData._id) {
          userInList = member;
          return false;
        }
        return true;
      });
      members.unshift(userInList);

      setMemberList(members);

      const { data } = await axios.get(
        `${uri}/api/league/showLeague/${selectedValue}`
      );

      setActualLeague(data);
      setDescription("");

      dispatch(resetChecks());
      dispatch(resetTeams());
    };

    loadData();
    setShowPicker(false);
  }, [selectedValue]);

  const createHandler = () => {
    if (teams.teamA.length === 0 && teams.teamB.length === 0) {
      setErrMessage("You have not selected any player");
      setNoPress(true);
      return;
    }

    if (teams.teamA.length === teams.teamB.length) {
      let members1Nick = [];
      let members1Id = [];
      teams.teamA.map((item) => {
        members1Nick = [...members1Nick, item.nick];
        members1Id = [...members1Id, item.id];
        return;
      });
      let members2Nick = [];
      let members2Id = [];
      teams.teamB.map((item) => {
        members2Nick = [...members2Nick, item.nick];
        members2Id = [...members2Id, item.id];
        return;
      });

      setNicks1(members1Nick);
      setNicks2(members2Nick);

      setMatch({
        league: actualleague._id,
        team_1: members1Id,
        team_2: members2Id,
        date: moment(onDate).format("DD-MM-YYYY"),
        time: `${onTime[0]}:${onTime[1]}`,
        invitationText: "",
      });

      setShowCard(true);
    } else {
      setNoPress(true);
      setErrMessage("Both teams must have equal team members number");
    }
  };

  const confirmHandler = () => {
    match.invitationText = description;
    axios.post(`${uri}/api/match/newMatch`, match).then(() => {
      setShowCard(false);
      dispatch(resetChecks());
      dispatch(resetTeams());
      setDescription("");
      setOnTime(
        parseInt(moment().format("mm")) > 30
          ? [`${parseInt(moment().format("H")) + 1}`, "00"]
          : [moment().format("H"), "30"]
      );
      navigation.navigate("History");
    });
  };

  return (
    <SafeAreaView style={matchStyles.back}>
      <Modal animationType="fade" transparent={true} visible={showPicker}>
        <View style={pickerStyles.back}>
          <Pressable
            onPress={() => setShowPicker(false)}
            style={pickerStyles.pressArea}
          />

          <View>
            <ScrollView>
              <View style={pickerStyles.body}>
                <ScrollView>
                  {leagueList &&
                    leagueList.map((item, i) => {
                      return (
                        <TouchableOpacity
                          onPress={() => setSelectedValue(item.league._id)}
                          key={i}
                        >
                          <Text style={pickerStyles.text}>
                            {item.league.name}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                </ScrollView>
              </View>
            </ScrollView>
          </View>

          <Pressable
            onPress={() => setShowPicker(false)}
            style={pickerStyles.pressArea}
          />
        </View>
      </Modal>

      <View style={[matchStyles.head, { backgroundColor: actualleague.color }]}>

        <View style={matchStyles.info}>
          <Text style={matchStyles.title}>{actualleague.name}</Text>

          <TouchableOpacity
            onPress={() => setShowPicker(true)}
            style={matchStyles.pickerButton}
          >
            <Icon
              name="caret-down-circle"
              type="ionicon"
              color={colorSet.text}
              size={32}
            />
          </TouchableOpacity>
        </View>

        <ListHead
          labels={["Allies", "User", "Rivals"]}
          styling={matchStyles.listHead}
        />
      </View>

      <View style={matchStyles.body}>
        <View style={matchStyles.list}>
          <List list={memberList} Element={ItemMatch} />
        </View>

        <View style={[matchStyles.foot]}>
          <View style={[matchStyles.calendar]}>
            <CalendarStrip
              style={{ height: 110, paddingTop: 5 }}
              scrollable
              iconContainer={{ flex: 0.1 }}
              iconStyle={{}}
              calendarHeaderStyle={{ color: colorSet.text, fontSize: 15 }}
              dateNumberStyle={{ color: colorSet.text, fontSize: 14 }}
              dateNameStyle={{ color: colorSet.text }}
              highlightDateNameStyle={{ fontSize: 0 }}
              highlightDateNumberStyle={{
                color: colorSet.content,
                fontSize: 18,
              }}
              highlightDateContainerStyle={{ backgroundColor: colorSet.text }}
              locale={{
                name: "en",
                config: {
                  months:
                    "January_February_March_April_May_June_July_August_September_October_November_December".split(
                      "_"
                    ),
                  weekdaysShort: "SUN_MON_TUE_WED_THU_FRI_SAT".split("_"),
                },
              }}
              minDate={moment("01-01-2022", "MM-DD-YYYY")}
              maxDate={moment().add(6, "M")}
              startingDate={moment().subtract(3, "d")}
              selectedDate={onDate}
              onDateSelected={(selected) =>
                setOnDate(moment(selected, "YYYY-MM-DDTHH:mm:ss.SSSZ"))
              }
            />
            {showTime ? (
              <View style={{ width: 292, heigth: 30, alignSelf: "center" }}>
                <ScrollView horizontal={true} contentOffset={{ x: 1667, y: 0 }}>
                  {[
                    "0",
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "10",
                    "11",
                    "12",
                    "13",
                    "14",
                    "15",
                    "16",
                    "17",
                    "18",
                    "19",
                    "20",
                    "21",
                    "22",
                    "23",
                  ].map((hour, i) => {
                    return (
                      <>
                        <TouchableOpacity
                          onPress={() => {
                            setShowTime(false);
                            setOnTime([hour, "00"]);
                          }}
                          style={[
                            matchStyles.time,
                            {
                              backgroundColor:
                                i === 12 ? colorSet.text : colorSet.content,
                            },
                          ]}
                          key={i * 25}
                        >
                          <Text
                            style={[
                              matchStyles.timeTxt,
                              {
                                color:
                                  i === 12 ? colorSet.content : colorSet.text,
                              },
                            ]}
                          >
                            {hour + ":00"}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            setShowTime(false);
                            setOnTime([hour, "30"]);
                          }}
                          style={[
                            matchStyles.time,
                            { backgroundColor: colorSet.content },
                          ]}
                          key={i * 50 + 1}
                        >
                          <Text
                            style={[
                              matchStyles.timeTxt,
                              { color: colorSet.text },
                            ]}
                          >
                            {hour + ":30"}
                          </Text>
                        </TouchableOpacity>
                      </>
                    );
                  })}
                </ScrollView>
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => setShowTime(true)}
                style={matchStyles.time}
              >
                <Text style={matchStyles.timeTxt}>
                  {`${onTime[0]}:${onTime[1]}`}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity
            disabled={noPress}
            onPress={createHandler}
            style={[
              matchStyles.createButton,
              {
                backgroundColor: noPress
                  ? "grey"
                  : actualleague.color /*"#16a085"*/,
              },
            ]}
          >
            <Text style={matchStyles.buttonTxt}>NEW MATCH</Text>
          </TouchableOpacity>

          {noPress ? (
            <Text style={matchStyles.errTxt}>{errMessage}</Text>
          ) : (
            <View style={{ height: 30 }}></View>
          )}
        </View>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowCard(!showCard)}
        visible={showCard}
      >
        <View style={cardStyles.back}>
          <View>
            <ScrollView>
              <View style={cardStyles.body}>
                <Pressable
                  onPress={() => setShowCard(false)}
                  style={cardStyles.closeButton}
                >
                  <Icon name="close-circle" type="ionicon" color="red" />
                </Pressable>

                <View style={{ flex: 1 }}>
                  <MatchDetails team1={nicks1} team2={nicks2} match={match} />

                  <View style={cardStyles.inputContainer}>
                    <ScrollView>
                      <TextInput
                        style={cardStyles.input}
                        name="text"
                        keyboardType="default"
                        multiline={true}
                        numberOfLines={3}
                        placeholder="Invitation text"
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                      />
                    </ScrollView>
                  </View>

                  <View style={{ height: 115 }}>
                    <TouchableOpacity
                      onPress={confirmHandler}
                      style={[
                        cardStyles.confirmButton,
                        { backgroundColor: actualleague.color },
                      ]}
                    >
                      <Text style={cardStyles.buttonTxt}>CONFIRM</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Match;