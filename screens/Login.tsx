import React, { useState } from 'react'
import {Button, StyleSheet, TextInput} from 'react-native'

import { Text, View } from '../components/Themed'

import auth from '../db/db'
import { StackScreenProps } from '@react-navigation/stack'
import { BottomTabParamList } from '../types'

const EMAIL_ERROR_TEXT = 'Bad email'
const PASS_ERROR_TEXT = 'Password must be longer than 8 letters'

export default function Login({ navigation }: StackScreenProps<BottomTabParamList, 'Auth'>) {
    const [email, setEmail] = useState<string>('')
    const [emailError, setEmailError] = useState<string>('')
    const [pass, setPass] = useState<string>('')
    const [passError, setPassError] = useState<string>('')

    function onChangeEmail (value: string) {
        setEmail(value)
        setEmailError(value ? '' : EMAIL_ERROR_TEXT)
    }

    function onChangePass (value: string) {
        setPass(value)
        setPassError(value.length >= 8 ? '' : PASS_ERROR_TEXT)
    }

    async function SignIn () {
        try {
            const user = await auth.signInWithEmailAndPassword(email, pass)
            console.log(user)
            if (!user) {
                return
            }
            navigation.navigate('Welcome')
        } catch (e) {
            console.log(e)
            if (e.code.includes('email')) {
                setEmailError(e.message)
                return
            }
            if (e.code.includes('password')) {
                setPassError(e.message)
                return
            }
        }
    }

    return <View style={s.container}>
        <Text style={s.title}>Login</Text>
        <TextInput
            style={[s.input, !!emailError && s.error]}
            value={email}
            onChangeText={onChangeEmail}
        />
        {emailError && <Text style={s.error}>{emailError}</Text>}
        <TextInput
            style={[s.input, !!passError && s.error]}
            value={pass}
            onChangeText={onChangePass}
            secureTextEntry
        />
        {passError && <Text style={s.error}>{passError}</Text>}
        <Button title='Sign In' onPress={SignIn} disabled={!!emailError || !!passError} />
    </View>
}

const s = StyleSheet.create({
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
    input: {
        borderColor: 'black',
        borderWidth: 1,
    },
    error: {
        color: 'red',
        borderColor: 'red',
    },
})
