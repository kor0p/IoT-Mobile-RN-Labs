import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'

import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
import Login from '../screens/Login'
import Register from '../screens/Register'
import Welcome from '../screens/Welcome'
import { BottomTabParamList, AuthParams, WelcomeParams } from '../types'

const BottomTab = createBottomTabNavigator<BottomTabParamList>()

export default function BottomTabNavigator() {
    const colorScheme = useColorScheme()

    return <BottomTab.Navigator
        initialRouteName='Auth'
        tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
        <BottomTab.Screen
            name='Auth'
            component={LoginNavigator}
            options={{
                tabBarVisible: false,
                tabBarButton: () => null,
                tabBarIcon: ({ color }) => <TabBarIcon name='ios-code' color={color} />,
            }}
        />
        <BottomTab.Screen
            name='Welcome'
            component={WelcomeNavigator}
            options={{
                tabBarIcon: ({ color }) => <TabBarIcon name='ios-code' color={color} />,
            }}
        />
    </BottomTab.Navigator>
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string, color: string }) {
    return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const LoginStack = createStackNavigator<AuthParams>()

function LoginNavigator() {
    return <LoginStack.Navigator initialRouteName='Login'>
        <LoginStack.Screen
            name='Login'
            component={Login}
            options={{ headerTitle: 'Login' }}
        />
        <LoginStack.Screen
            name='Register'
            component={Register}
            options={{ headerTitle: 'Register' }}
        />
    </LoginStack.Navigator>
}

const WelcomeStack = createStackNavigator<WelcomeParams>()

function WelcomeNavigator() {
    return <WelcomeStack.Navigator>
        <WelcomeStack.Screen
            name='Welcome'
            component={Welcome}
            options={{ headerTitle: 'Welcome' }}
        />
    </WelcomeStack.Navigator>
}
