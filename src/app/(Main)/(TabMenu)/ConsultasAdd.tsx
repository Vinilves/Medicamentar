import { useState, useEffect, useCallback, useRef } from "react";
import {
    SafeAreaView,
    View,
    StatusBar,
    Text,
    StyleSheet,
    Platform,
    Button,
    TextInput,
    TouchableOpacity,
    Image
} from "react-native";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import DateTimerPicker from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

import {
    bgThemeColor,
    fgThemeColor,
    secBgThemeColor,
    textThemeColor,
  } from "@/src/constants/ColorTheming";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

function ConsultasAdd() {

    const navigation = useNavigation();

    const AbrirNavMenu = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    };


    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState("date");
    const [show, setShow] = useState(false);
    const [text, setText] = useState("");

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === "ios");
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + "/" + (tempDate.getMonth() + 1) + "/" + tempDate.getFullYear();
        let fTime = "Horário: " + tempDate.getHours() + ":" + tempDate.getMinutes();
        setText(fDate + "\n" + fTime);

        console.log(fDate + " (" + fTime + ")");
    }
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }

            /* -- Carregamento da fonte -- */
    const [fontsLoaded, fontError] = useFonts({
        "armata-regular-400": require("../../../fonts/armata-regular-400.ttf"),
      });   

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded || fontError) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);
    
    if (!fontsLoaded && !fontError) {
        return null;
    }
    
    return(
        <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
            <View style={styles.containerTopoItems}>
                <TouchableOpacity onPress={AbrirNavMenu}>
                <Image
                    source={require("@/src/assets/menu-lateral.png")}
                    style={styles.containerTopoMenuLat}
                ></Image>
                </TouchableOpacity>
                <Text style={styles.containerTopoTexto}>CONSULTAS E EXAMES</Text>
                <Image
                source={require("@/src/assets/perfil.png")}
                style={styles.containerTopoImagem}
                ></Image>
            </View>
               
            <View>
                {/*<Text style={styles.dateTimeText}>{text}</Text>*/}
                <View>
                    <Button title="Escolher Data" onPress={() => showMode("date")}/>
                </View>
                <View>
                    <Button title="Escolher Hora" onPress={() => showMode("time")}/>
                </View>
            </View>
            {show && (
                <DateTimerPicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
                />
            )}

            <View style={styles.containerInput}>
                <View style={styles.inputOne}>
                    <Text style={styles.labelTextInput}>Especialidade</Text>
                    <TextInput style={styles.textInput}></TextInput>
                </View>
                <View>
                    <Text style={styles.labelTextInput}>Clínica/Hospital:</Text>
                    <TextInput style={styles.textInput}></TextInput>
                </View>
                <View>
                    <Text style={styles.labelTextInput}>Descrição</Text>
                    <TextInput
                    style={{backgroundColor:"#E8E8E8", borderRadius:10, height:"auto", padding:10, marginHorizontal: 26,}} 
                    multiline={true} 
                    numberOfLines={4}
                    maxLength={300}
                    >
                    </TextInput>
                </View>        
                <TouchableOpacity><Text>Adicionar Lembrete</Text></TouchableOpacity>        
                <TouchableOpacity style={styles.botaoConcluido}>
                    <Text style={styles.textoBotaoConcluido}>Concluido</Text>
                </TouchableOpacity>

                {/* Teste exemplo de notificação/}
                {/*<Button title="teste notifi" onPress={() => Notifications.scheduleNotificationAsync({
                        content: {title: "teste", body:"teste"}, trigger:null
                    })
                }>
                
                </Button>
                */}
            </View>
            <View style={styles.footer}></View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    containerTopoItems: {
        backgroundColor: `${fgThemeColor}`,
        justifyContent: "space-between",
        paddingHorizontal: 20,
        alignItems: "center",
        flexDirection: "row",
        height: 88,
    },
    containerTopoMenuLat: {
        height: 25,
        width: 35,
    },
    containerTopoTexto: {
        flex:1,
        textAlign:"center",
        fontWeight: "400",
        color: "#FFFFFF",
        fontSize: 24,
      },
    containerTopoImagem: {
        resizeMode: "contain",
        height: 60,
        width: 60,
    },
    selectContainer: {
        paddingHorizontal: 30,
        paddingVertical: 30,
    },
    dateTimeText: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
        fontFamily: "armata-regular-400",
    },
    containerInput: {
        paddingVertical: 30,
        paddingHorizontal: 10,
    },
    labelTextInput: {
        fontFamily: "armata-regular-400",
        marginHorizontal: 26,
    },
    textInput: {
        backgroundColor: "#E8E8E8",
        height: 40,
        borderRadius: 10,
        marginHorizontal: 26,
    },
    inputOne: {
        marginBottom: 20,
    },
    botaoConcluido:{
        backgroundColor: "#58C0F3", // #58C0F3 PARA DISABLED
        width: 310,
        height: 59,
        alignSelf:"center",
        borderRadius:5,
        marginTop: 15,
    },
    textoBotaoConcluido:{
        margin:"auto",
        fontSize:24,
        color: "#ffffff",
        fontWeight: "400",
        lineHeight: 30,
        opacity: 0.6
    },
    footer: {
        height: 31,
        width: "100%",
        backgroundColor: "#20A2EB",
        position: "absolute",
        bottom: 0,
    },
});

export default ConsultasAdd;