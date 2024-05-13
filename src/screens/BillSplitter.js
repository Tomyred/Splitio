import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import Text from "../components/Text";
import IconButton from "../components/IconButton";
import { theme } from "../styles/theme";

const BillSplitter = ({ navigation }) => {
    const contributorDefault = { name: "", amount: "" };
    const [contributor, setContributor] = useState(contributorDefault);
    const [contributors, setContributors] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const inputRef = useRef(null);

    const addContributor = () => {

        const contributorAux = {
            ...contributor,
            amount: parseFloat(contributor.amount).toFixed(2)
        }        

        setContributors([contributorAux, ...contributors]);
        setContributor(contributorDefault);
        inputRef.current.focus();
    };

    const removeContributor = (contributor) => {
        const filteredArray = contributors.filter((cont) => cont.name !== contributor.name);
        setContributors(filteredArray);
        inputRef.current.focus();
    };

    const addName = (value) => {
        const regex = /^[a-zA-Z ]+$/;
        const textIsValid = regex.test(value)
        if(textIsValid || value.length === 0){
            setContributor({ ...contributor, name: value })
        }
    }

    const addAmount = (value) => {
        if(!isNaN(value)){
            setContributor({ ...contributor, amount: value })
        }
    }

    const calculate = () => {
        const eachMustPay = parseFloat(totalAmount / contributors.length).toFixed(2);
        const debts = contributors.map((con) => ({
            name: con.name,
            debt: parseFloat(con.amount).toFixed(2) - eachMustPay,
        }));
        const payers = debts.filter((debt) => debt.debt < 0);
        const receivers = debts.filter((debt) => debt.debt > 0);
        const notPaynotReceive = debts.filter((debt) => debt === 0);

        navigation.navigate("Balance", { eachMustPay, receivers, payers, totalAmount });
    };

    useEffect(() => {
        let total = 0;
        contributors.forEach((cont) => {
            total += Number(cont.amount);
        });
        setTotalAmount(total.toFixed(2));
    }, [contributors.length]);

    return (
        <SafeAreaView style={{ flex: 1, padding: 30, justifyContent: "space-between", backgroundColor: theme.colors.background }}>
            <View style={{ flex: 1, marginTop: "10%" }}>
                <View>
                    <Input
                        reff={inputRef}
                        value={contributor.name}
                        placeholder={"Nombre"}
                        onChangeText={addName}
                        maxLength={15}
                    />

                    <Input
                        textSize={"xbg"}
                        keyboardType='numeric'
                        value={contributor.amount}
                        placeholder={"Monto"}
                        onChangeText={addAmount}
                        maxLength={9}
                    />
                </View>
                <View style={styles.contributorInfoContainer}>
                    <View style={styles.whiteLine} />
                    <ScrollView style={styles.contributorInfoScroll}>
                        {contributors.map((cont, i) => {
                            return (
                                <View key={i} style={styles.contributorInfo}>
                                    <Text textStyle={'white'} fontSize={"md"} value={cont.name} />
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <Text textStyle={'white'} fontSize={"md"} value={"$" + cont.amount} />
                                        <IconButton
                                            onPress={() => removeContributor(cont)}
                                            style={{ marginLeft: 8 }}
                                            iconName='trash'
                                            color='error'
                                            fontSize='bg'
                                        />
                                    </View>
                                </View>
                            );
                        })}
                    </ScrollView>
                    <View style={styles.whiteLine} />
                </View>
                <View style={{ ...styles.contributorInfo, marginTop:25}}>
                    <Text textStyle={'white'} fontSize={"md"} value={"Total: "} />
                    <Text textStyle={'white'} fontSize={"md"} value={"$" + totalAmount} />
                </View>

                <View style={{ width: "100%" }}>
                    <View style={styles.buttonContainer}>
                        <View style={{ width: "40%", alignSelf: "center" }}>
                            <Button
                                type={"error"}
                                fontSize={"bg"}
                                title='Limpiar'
                                onPress={() => setContributors([])}
                            />
                        </View>
                        <View style={{ width: "40%", alignSelf: "center" }}>
                            <Button
                                disabled={contributor.name.length === 0 || contributor.amount.length === 0}
                                onPress={addContributor}
                                type={"success"}
                                fontSize={"bg"}
                                title='Agregar'
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <View style={{ width: "100%", alignSelf: "center" }}>
                            <Button
                                onPress={calculate}
                                type={"alert"}
                                fontSize={"bg"}
                                disabled={contributors.length < 2}
                                title='Calcular'
                            />
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default BillSplitter;

const styles = StyleSheet.create({
    contributorInfoContainer: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
        
    },
    contributorInfoScroll: {
        backgroundColor: '#000000',
        backgroundColor: theme.colors.black,
        borderTopWidth: 5,
        borderBottomWidth: 5,
        borderColor: 'white',
        height: '100%',
        width: '100%',
        paddingVertical: 15
    },
    buttonContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    contributorInfo: {
        paddingHorizontal: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    whiteLine: {
        backgroundColor: 'white',
        width: 5,
        height: '97%',
    },
});