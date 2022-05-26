import moment from "moment";
import "moment/locale/es";

import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  ScrollView,
} from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import { Icon } from "react-native-elements";

import Constants from "expo-constants";

import List from "../commons/List";
import ItemRecord from "./ItemRecord";

import { recordStyles, cardStyles } from "../styles/record";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ConfirmCard from "./ConfirmCard";
import { setMatch } from "../state/record";
import ListHead from "./MatchListHead";
import { colorSet } from "../styles/colorSet";

const Record = () => {
  let [recordList, setRecordList] = useState([]);
  let [onDate, setOnDate] = useState(moment());
  let [showAll, setShowAll] = useState(false);
  let [dotList, setDotList] = useState([]);

  const { manifest } = Constants;
  const uri = `http://${manifest.debuggerHost.split(":").shift()}:3000`;

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const match = useSelector((state) => state.match);

  useEffect(() => {
    axios.get(`${uri}/api/user/getMatches/${user._id}`).then(({ data }) => {
      setRecordList(data.reverse());
      setDotList(data);
    });
    setOnDate(moment());
  }, [showAll]);

  const matchDateHandler = (matchDate) => {
    axios
      .get(`${uri}/api/user/${user._id}/getMatchesByDate/${matchDate}`)
      .then(({ data }) => {
        setRecordList(data.reverse());
      });
  };

  return (
    <SafeAreaView style={recordStyles.back}>
      <View style={[recordStyles.head]}>
        <View style={recordStyles.info}>
          <Text style={recordStyles.title}>History</Text>
        </View>

        <View style={[recordStyles.calendar]}>
          <CalendarStrip
            style={{ height: 110, paddingTop: 5 }}
            scrollable
            iconContainer={{ flex: 0.1 }}
            iconStyle={{}}
            calendarHeaderStyle={{ color: colorSet.text, fontSize: 15 }}
            dateNumberStyle={{ color: colorSet.text, fontSize: 14 }}
            dateNameStyle={{ color: colorSet.text }}
            highlightDateNameStyle={{ fontSize: 0 }}
            highlightDateNumberStyle={{ color: colorSet.content, fontSize: 18 }}
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
            markedDates={
              dotList && dotList[0]
                ? dotList.map((item) => {
                    return {
                      date: moment(item.date, "DD-MM-YYYY"),
                      dots: [{ color: colorSet.text }],
                    };
                  })
                : []
            }
            selectedDate={onDate}
            onDateSelected={(selected) => {
              matchDateHandler(
                moment(selected, "YYYY-MM-DDTHH:mm:ss.SSSZ").format(
                  "DD-MM-YYYY"
                )
              );
              setOnDate(moment(selected, "YYYY-MM-DDTHH:mm:ss.SSSZ"));
            }}
          />

          <TouchableOpacity
            onPress={() => setShowAll(!showAll)}
            style={recordStyles.show}
          >
            <Text style={recordStyles.showTxt}>Show all</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={recordStyles.body}>
        <ListHead
          labels={["Allies", "Info", "Rivals"]}
          styling={recordStyles.listHead}
        />

        <View style={recordStyles.list}>
          {!!recordList.length && (
            <List list={recordList} Element={ItemRecord} marginNum={0.1} />
          )}
        </View>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowCard(!showCard)}
        visible={false && match && match.id}
      >
        <View style={cardStyles.back}>
          <View>
            <ScrollView>
              <View style={cardStyles.body}>
                <Pressable
                  onPress={() => {
                    dispatch(setMatch(null));
                  }}
                  style={cardStyles.closeButton}
                >
                  <Icon name="close-circle" type="ionicon" color="red" />
                </Pressable>

                <View style={{ flex: 1 }}>
                  <ConfirmCard />
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Record;