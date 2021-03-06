import React, { useState } from 'react'
import {Button, StyleSheet, TextInput, TouchableHighlight} from 'react-native'

import { Text, View } from '../components/Themed'

import auth from '../db/db'
import { StackScreenProps } from '@react-navigation/stack'
import { BottomTabParamList, AuthParams } from '../types'
import { ERRORS } from '../constants'

export default function Login({ navigation }: StackScreenProps<BottomTabParamList & AuthParams, 'Login'>) {
    const [email, setEmail] = useState<string>('')
    const [emailError, setEmailError] = useState<string>('')
    const [pass, setPass] = useState<string>('')
    const [passError, setPassError] = useState<string>('')

    function onChangeEmail (value: string) {
        setEmail(value)
        setEmailError(value ? '' : ERRORS.email)
    }

    function onChangePass (value: string) {
        setPass(value)
        setPassError(value.length >= 8 ? '' : ERRORS.email)
    }

    async function SignIn () {
        try {
            const user = await auth.signInWithEmailAndPassword(email, pass)
            console.log(user)
            if (!user) {
                return
            }
            navigation.reset({
                index: 0,
                routes: [{ name: 'Welcome' }],
            })
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
            placeholder='Email'
            onChangeText={onChangeEmail}
        />
        {!!emailError && <Text style={s.error}>{emailError}</Text>}
        <TextInput
            style={[s.input, !!passError && s.error]}
            value={pass}
            placeholder='Password'
            onChangeText={onChangePass}
            secureTextEntry
        />
        {!!passError && <Text style={s.error}>{passError}</Text>}
        <Button title='Sign In' onPress={SignIn} disabled={!!emailError || !!passError} />
        <Text>No account?</Text>
        <TouchableHighlight onPress={() => navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Register')}><Text>Sign Up</Text></TouchableHighlight>
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
        width: 175,
        color: 'black',
    },
    error: {
        color: 'red',
        borderColor: 'red',
    },
})
