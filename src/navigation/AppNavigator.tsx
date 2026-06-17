import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import PlayersListScreen from '../screens/PlayersListScreen'
import RoleRevealScreen from '../screens/RoleRevealScreen'
import { RootStackParamList } from '../types'

const Stack = createStackNavigator<RootStackParamList>()

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: ({ current, layouts }) => ({
            cardStyle: {
              opacity: current.progress,
              transform: [
                {
                  translateY: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.height * 0.08, 0],
                  }),
                },
              ],
            },
          }),
        }}
      >
        <Stack.Screen name="PlayersList" component={PlayersListScreen} />
        <Stack.Screen name="RoleReveal" component={RoleRevealScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
