import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import PlayersListScreen from '../screens/PlayersListScreen'
import RoleRevealScreen from '../screens/RoleRevealScreen'
import { RootStackParamList } from '../types'
import { colors } from '../constants/colors'
import Text from '../components/Text'
import { ChevronLeft } from '../components/icons'

const Stack = createStackNavigator<RootStackParamList>()

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTransparent: true,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: 'transparent' },
          headerTitleAlign: 'center',
          headerTitle: '',
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
        <Stack.Screen
          name="PlayersList"
          component={PlayersListScreen}
          options={{
            headerTitle: () => <Text variant="h4">Players</Text>,
          }}
        />
        <Stack.Screen
          name="RoleReveal"
          component={RoleRevealScreen}
          options={({ navigation }) => ({
            headerLeft: () => (
              <Pressable
                style={styles.back}
                hitSlop={12}
                onPress={() => navigation.goBack()}
              >
                <ChevronLeft size={15} color={colors.dark} />
              </Pressable>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  back: {
    width: 40,
    height: 40,
    marginLeft: 18,
    justifyContent: 'center',
  },
})

export default AppNavigator
