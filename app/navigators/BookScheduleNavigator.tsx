import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
// @ts-ignore
import React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { translate } from "../i18n"
import { LibraryScreen, PlannerScreen, StatsScreen, AccountScreen, BookSearchScreen } from "../screens"
import { colors, spacing, typography } from "../theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"
import { MaterialCommunityIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';

export type BookScheduleTabParamList = {
  Library: undefined
  Planner: undefined
  Stats: undefined
  Account: undefined
  BookSearch: undefined
}

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type BookScheduleTabScreenProps<T extends keyof BookScheduleTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<BookScheduleTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createBottomTabNavigator<BookScheduleTabParamList>()

export function BookScheduleNavigator() {
  const { bottom } = useSafeAreaInsets()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [$tabBar, { height: bottom + 70 }],
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
      }}
    >
      <Tab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          tabBarLabel: translate("bookScheduleNavigator.libaryTab"),
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name="bookshelf" size={24} color={focused ? colors.tint : "black"} />
          ),
        }}
      />

      <Tab.Screen
        name="Planner"
        component={PlannerScreen}
        options={{
          tabBarLabel: translate("bookScheduleNavigator.plannerTab"),
          tabBarIcon: ({ focused }) => (
            <FontAwesome5 name="calendar-alt" size={24} color={focused ? colors.tint : "black"} />
          ),
        }}
      />

      <Tab.Screen
        name="BookSearch"
        component={BookSearchScreen}
        options={{
          tabBarLabel: translate("bookScheduleNavigator.plannerTab"),
          tabBarIcon: ({ focused }) => (
            <FontAwesome5 name="search-plus" size={24} color={colors.textDim} />
          ),
        }}
      />

      <Tab.Screen
        name="Stats"
        component={StatsScreen}
        options={{
          tabBarAccessibilityLabel: translate("bookScheduleNavigator.statsTab"),
          tabBarLabel: translate("bookScheduleNavigator.statsTab"),
          tabBarIcon: ({ focused }) => (
            <Ionicons name="stats-chart" size={24} color={focused ? colors.tint : "black"} />
          ),
        }}
      />

      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarLabel: translate("bookScheduleNavigator.acountTab"),
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name="account" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const $tabBar: ViewStyle = {
  backgroundColor: colors.background,
  borderTopColor: colors.transparent,
}

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.md,
}

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
}
