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
    const [contributors, setContributors] = useState({});
    const [totalAmount, setTotalAmount] = useState(0);
    const inputRef = useRef(null);

    const addContributor = () => {

        const parsedAmount = parseFloat(contributor.amount).toFixed(2)
        
        if(contributors[contributor.name.trim()]){

            setContributors( {...contributors, [contributor.name.trim()]: [ ...contributors[contributor.name.trim()], parsedAmount] } );
            setContributor(contributorDefault);
        }else{
            setContributors( {...contributors, [contributor.name.trim()]: [ parsedAmount ] } );
            setContributor(contributorDefault);
        }

        inputRef.current.focus();
    };

    const removeContributor = (contributor, value) => {

        const newValues = contributors[contributor].filter( val => val !== value )

        setContributors({ ...contributors, [contributor]: newValues })
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

        const contribArray = []

        Object.keys(contributors).forEach( cont => {

            if(contributors[cont].length > 0){
                contribArray.push(
                    {
                        name: cont,
                        amount: contributors[cont].reduce((ac, val) => ac + parseFloat(val), 0).toFixed(2)
                    }
                )
            }
        } )

        const eachMustPay = parseFloat(totalAmount / contribArray.length).toFixed(2);
        const debts = contribArray.map((con) => ({
            name: con.name,
            debt: parseFloat(con.amount).toFixed(2) - eachMustPay,
        }));
        const payers = debts.filter((debt) => debt.debt < 0);
        const receivers = debts.filter((debt) => debt.debt > 0);

        navigation.navigate("Balance", { eachMustPay, receivers, payers, totalAmount });
    };

    useEffect(() => {
        let total = 0;
        Object.keys(contributors).forEach((cont) => {
            contributors[cont].forEach( val => {    
                total += Number(val);
            } )
        });
        setTotalAmount(total.toFixed(2));
    }, [contributors]);

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
                        {Object.keys(contributors).map((cont, i) => {
                            let total = 0;
                            if(contributors[cont].length > 0){
                                return (
                                    <View key={i} style={styles.contributorInfo}>
                                        <View style={{width: '100%' }} >
                                            <Text textStyle={'white'} fontSize={"md"} value={cont} />
                                        </View>
                                        <View style={{ flexDirection: "column" }} >
                                            {contributors[cont].map( (value, j) => {
                                                total += Number(value)
                                                return (
                                                    <View key={j} style={{ flexDirection: "row", marginTop: 5, justifyContent: "space-between" }}>
                                                        <Text textStyle={'white'} fontSize={"md"} value={"- $" + value} />
                                                        <IconButton
                                                            onPress={() => removeContributor(cont, value)}
                                                            style={{ marginLeft: 8 }}
                                                            iconName='trash'
                                                            color='error'
                                                            fontSize='bg'
                                                        />
                                                    </View>
                                                )
                                            } )  }
                                        </View>
                                    </View>
                                );
                            }

                            return <></>
                        })}
                        <View style={{height: 20}} >

                        </View>
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
                                onPress={() => setContributors({})}
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
                                disabled={Object.keys(contributors).length < 2}
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
        alignItems: 'center',
        flex: 1,
    },
    contributorInfoScroll: {
        backgroundColor: '#000000',
        backgroundColor: theme.colors.black,
        borderTopWidth: 5,
        borderBottomWidth: 5,
        borderColor: 'white',
        height: '100%',
        width: '100%',
        paddingTop: 15,
        // marginBottom: 30
    },
    buttonContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    contributorInfo: {
        paddingHorizontal: 10,
        flexDirection: "column",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    whiteLine: {
        backgroundColor: 'white',
        width: 5,
        height: '97%',
    },
});