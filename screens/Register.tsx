import React, { useState } from 'react'
import {Button, StyleSheet, TextInput, TouchableHighlight} from 'react-native'

import { Text, View } from '../components/Themed'

import auth from '../db/db'
import { StackScreenProps } from '@react-navigation/stack'
import { BottomTabParamList, AuthParams } from '../types'
import { ERRORS } from '../constants'

const PHONE_FORMAT: string = '+38'
const MASK_LENGTH: number = 10
// const MASK : string = '(___) ___ __ __'
// const MASK_REGEXP : RegExp = new RegExp(MASK.replace(/_/g, '[0-9]').replace(/\(/g, '\\(').replace(/\)/g, '\\)'))
//
// function parsePhone(value: string) {
//     return value.replace(/[ ()\-_]/g, '')
// }

export default function Login({ navigation }: StackScreenProps<BottomTabParamList & AuthParams, 'Register'>) {
    const [name, setName] = useState<string>('')
    const [nameError, setNameError] = useState<string>('')
    const [phone, setPhone] = useState<string>(PHONE_FORMAT)
    const [phoneError, setPhoneError] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [emailError, setEmailError] = useState<string>('')
    const [pass, setPass] = useState<string>('')
    const [passError, setPassError] = useState<string>('')

    function onChangeName (value: string) {
        setName(value)
        setNameError(value ? '' : ERRORS.name)
    }

    function onChangePhone (value: string) {
        if (value.length < PHONE_FORMAT.length) {
            value = PHONE_FORMAT
        }
        setPhone(value)
        setPhoneError(PHONE_FORMAT.length + MASK_LENGTH == value.length ? '' : ERRORS.phone)
        // setPhoneError(MASK_REGEXP.test(value) ? '' : ERRORS.phone)
    }

    function onChangeEmail (value: string) {
        setEmail(value)
        setEmailError(value ? '' : ERRORS.email)
    }

    function onChangePass (value: string) {
        setPass(value)
        setPassError(value.length >= 8 ? '' : ERRORS.pass)
    }

    async function SignUp () {
        try {
            const data = await auth.createUserWithEmailAndPassword(email, pass)
            console.log(data)
            await auth.currentUser?.updateProfile({ displayName: `${name}\n${phone}` })
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
        <Text style={s.title}>Register</Text>
        <TextInput
            style={[s.input, !!nameError && s.error]}
            value={name}
            placeholder='Name'
            onChangeText={onChangeName}
        />
        {!!nameError && <Text style={s.error}>{nameError}</Text>}
        <TextInput
            style={[s.input, !!phoneError && s.error]}
            value={phone}
            onChangeText={onChangePhone}
        />
        {!!phoneError && <Text style={s.error}>{phoneError}</Text>}
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
        <Button title='Sign Up' onPress={SignUp} disabled={!!nameError || !!phoneError || !!emailError || !!passError} />
        <Text>Has account?</Text>
        <TouchableHighlight onPress={() => navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Login')}><Text>Sign In</Text></TouchableHighlight>
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
