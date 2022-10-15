import React, { useState } from 'react'
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { TextInput } from 'react-native-gesture-handler';
import PartyCalendar from '../../pages/Party/CreateParty/PartyCalendar';

const AgeModal = () => {
    const [modalVisible, setModalVisible] = useState(true);
    const [openCalendar, setOpenCalender] = useState(false);
    const [birthdate, setBirthdate] = useState(null);

    // set user's birthdate when the user pressed confirm
    const onSetBirthdate = (birthdate) => {
        console.log(birthdate);
    }

    return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Please Enter You Birthdate</Text>
              <View className="flex-row px-5 items-center space-x-5">
                <Text
                className="text-green-500"
                style={{ fontSize: 16, fontWeight: "500" }}
                >
                    Date of Birth
                </Text>
                <View>
                <PartyCalendar
                    setOpenCalendar={setOpenCalender}
                    openCalendar={openCalendar}
                    partyStartDate={birthdate}
                    setPartyStartDate={setBirthdate}
                />
                </View>
              </View>
              <View className="mt-3">
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                    onSetBirthdate(birthdate)
                    setModalVisible(!modalVisible)
                }}
              >
                <Text style={styles.textStyle}>Confirm</Text>
              </Pressable>
              </View>
            </View>
          </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 10,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 25,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 15,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2CBB54",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
      fontSize: 16,
      fontWeight: "500",
      color: "#2CBB54"
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
  });

export default AgeModal