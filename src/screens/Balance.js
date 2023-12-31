import { View, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import { useEffect } from "react";
import Text from "../components/Text";
import { theme } from "../styles/theme";
import { useState } from "react";

const Balance = ({ navigation, route }) => {
    const { receivers, payers, notPaynotReceive, eachMustPay } = route.params;
    const [balance, setBalance] = useState([]);

    const calculate = () => {
        const resultOperations = {};

        payers.forEach((payer) => {
            resultOperations[payer.name] = [];
            while (payer.debt < 0) {
                const receiver = receivers.find((r) => r.debt > 0);
                if (!receiver) break;

                const amount = Math.min(-payer.debt, receiver.debt);
                const action = { amount, to: receiver.name };
                resultOperations[payer.name].push(action);

                payer.debt += amount;
                receiver.debt -= amount;
            }
        });

        const arrayResult = Object.keys(resultOperations).map((key) => {
            return {
                name: key,
                payments: resultOperations[key],
            };
        });
        setBalance(arrayResult);
    };

    useEffect(() => {
        if (balance.length === 0) {
            calculate();
        }
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, padding: 30, justifyContent: "space-between", backgroundColor: theme.colors.background }}>
            <View style={styles.topContainer}>
                <Text fontSize='xbg' value={"Cada uno debe pagar"} />
                <Text style={{ marginVertical: 20 }} fontSize='xxbg' value={`$${eachMustPay}`} />
            </View>
            <View style={[styles.topContainer, { flex: 1 }]}>
                <Text fontSize='xbg' value={"Para no pelearse deben pagar:"} />
                <View style={{ flex: 1, width: "100%" }}>
                    { payers.length > 0 ? balance.map((payer, i) => {
                        return (
                            <View key={i}>
                                <Text style={{ marginTop: 20, marginBotton: 20 }} fontSize='bg' value={`${payer.name} debe pagar:`} />
                                {payer.payments.map((pay, j) => {
                                    return <Text key={j} value={`$${pay.amount} a ${pay.to}`} />;
                                })}
                            </View>
                        );
                    }) : <Text fontSize='bg' style={{marginTop: 20}} value={"No hay garcas, todos aportaron lo que corresponde."} /> }
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Balance;

const styles = StyleSheet.create({
    topContainer: {
        alignItems: "center",
        paddingVertical: 50,
    },
});