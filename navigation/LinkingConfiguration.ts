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
