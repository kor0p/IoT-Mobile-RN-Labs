import * as React from 'react'
import {StyleSheet, TouchableHighlight} from 'react-native'

import { Text, View } from '../components/Themed'
import { StackScreenProps } from '@react-navigation/stack'
import { WelcomeParams, BottomTabParamList } from '../types'
import auth from '../db/db'

export default function Welcome({ navigation }: StackScreenProps<BottomTabParamList & WelcomeParams, 'Welcome'>) {
    const [name, phone]: string[] = auth.currentUser?.displayName?.split('\n') || []
    async function SignOut () {
        await auth.signOut()
        navigation.reset({
            index: 0,
            routes: [{ name: 'Auth' }],
        })
    }

    return <View style={styles.container}>
        <Text style={styles.title}>Welcome, {name}</Text>
        <Text>Your phone: {phone}</Text>
        <TouchableHighlight onPress={SignOut}><Text>Sign out</Text></TouchableHighlight>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
})
