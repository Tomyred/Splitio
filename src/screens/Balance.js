import { View, SafeAreaView, StyleSheet, Share } from "react-native";
import React from "react";
import { useEffect } from "react";
import Text from "../components/Text";
import { theme } from "../styles/theme";
import { useState } from "react";
import Button from "../components/Button";

const Balance = ({ route }) => {
    const { receivers, payers, totalAmount, eachMustPay } = route.params;
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

    const onShare = () => {

        let text = `El total fue: $${totalAmount} \nCada uno debe pagar $${eachMustPay}.\nCuentas pendientes: \n`

        balance.forEach( payer => {
            text += `${payer.name} debe: \n`
            payer.payments.forEach( pay => {
                text += `- $${pay.amount.toFixed(2)} a ${pay.to} \n`
            } )
        } )
        Share.share({message: text})
    }

    useEffect(() => {
        if (balance.length === 0) {
            calculate();
        }
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, padding: 30, justifyContent: "space-between", backgroundColor: '#212529' }}>
            <View style={styles.topContainer}>
                <Text center fontSize='bg' textStyle='white' value={"Cada uno debe pagar"} />
                <Text style={{ marginVertical: 20 }} textStyle='white' fontSize='xbg' value={`$${eachMustPay}`} />
            </View>
            <View style={[styles.balanceContainer, { flex: 1 }]}>
                <View style={styles.whiteLine} />
                <View style={styles.horizontalLines} >
                    <Text textStyle='white' fontSize='bg' value={"Cuentas pendientes:"} />
                    <View style={{marginVertical: 20}} >
                        { payers.length > 0 ? balance.map((payer, i) => {
                            return (
                                <View key={i} style={{marginBottom: 10}}>
                                    <Text textStyle='white' fontSize='md' value={`${payer.name} debe`} />
                                    {payer.payments.map((pay, j) => {
                                        return <Text textStyle='white' key={j} value={`- $${pay.amount.toFixed(2)} a ${pay.to}`} />;
                                    })}
                                </View>
                            );
                        }) : <Text textStyle='white' fontSize='md' style={{marginTop: 20}} value={"Todos aportaron lo que corresponde."} /> }
                    </View>
                </View>
                <View style={styles.whiteLine} />
            </View>
            <Button
                type={""}
                fontSize={"bg"}
                title='Compartir'
                onPress={onShare}
            />
        </SafeAreaView>
    );
};

export default Balance;

const styles = StyleSheet.create({
    topContainer: {
        alignItems: "center",
    },
    balanceContainer: {
        display: 'flex',
        flexDirection:'row',
        alignItems: "center",
        justifyContent: 'space-between',
        paddingVertical: 5,
    },
    horizontalLines: {
        backgroundColor: theme.colors.black,
        borderTopWidth: 5,
        borderBottomWidth: 5,
        borderColor: 'white',
        flex: 1,
        height: '100%',
        width: '100%',
        padding: 20
    },
    whiteLine: {
        backgroundColor: 'white',
        width: 5,
        height: '98%',
    },
});