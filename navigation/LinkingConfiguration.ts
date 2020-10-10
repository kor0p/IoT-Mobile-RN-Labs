import * as Linking from 'expo-linking'

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Auth: {
            screens: {
              Login: 'login',
              Register: 'register',
            },
          },
          Welcome: {
            screens: {
              Welcome: '/',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
}
