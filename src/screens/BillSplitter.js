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
        setContributors([contributor, ...contributors]);
        setContributor(contributorDefault);
        inputRef.current.focus();
    };

    const removeContributor = (contributor) => {
        const filteredArray = contributors.filter((cont) => cont.name !== contributor.name);
        setContributors(filteredArray);
        inputRef.current.focus();
    };

    const calculate = () => {
        const eachMustPay = totalAmount / contributors.length;
        const debts = contributors.map((con) => ({
            name: con.name,
            debt: con.amount - eachMustPay,
        }));
        const payers = debts.filter((debt) => debt.debt < 0);
        const receivers = debts.filter((debt) => debt.debt > 0);
        const notPaynotReceive = debts.filter((debt) => debt === 0);

        navigation.navigate("Balance", { eachMustPay, receivers, payers, notPaynotReceive });
    };

    useEffect(() => {
        let total = 0;
        contributors.forEach((cont) => {
            total += Number(cont.amount);
        });
        setTotalAmount(total);
    }, [contributors.length]);

    return (
        <SafeAreaView style={{ flex: 1, padding: 30, justifyContent: "space-between", backgroundColor: theme.colors.background }}>
            <View style={{ flex: 1, marginTop: "10%" }}>
                <View>
                    <Input
                        reff={inputRef}
                        value={contributor.name}
                        placeholder={"Nombre"}
                        onChangeText={(value) => setContributor({ ...contributor, name: value })}
                    />

                    <Input
                        textSize={"xbg"}
                        keyboardType='numeric'
                        value={contributor.amount}
                        placeholder={"Monto"}
                        onChangeText={(value) => setContributor({ ...contributor, amount: value })}
                    />
                </View>
                <ScrollView style={{ flex: 1 }}>
                    {contributors.map((cont, i) => {
                        return (
                            <View key={i} style={styles.contributorInfo}>
                                <Text fontSize={"bg"} value={cont.name} />
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Text fontSize={"bg"} value={"$" + cont.amount} />
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
                <View style={{ ...styles.contributorInfo, marginBottom: 0 }}>
                    <Text fontSize={"bg"} value={"Total: "} />
                    <Text fontSize={"bg"} value={"$" + totalAmount} />
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
                    <View style={{ marginTop: 20 }}>
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
    buttonContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 20,
    },
    contributorInfo: {
        paddingHorizontal: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
});