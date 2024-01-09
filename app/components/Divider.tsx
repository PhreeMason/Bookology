import * as React from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors } from "app/theme"

export interface DividerProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const Divider = observer(function Divider(props: DividerProps) {
  const { style } = props
  const $styles = [$container, style]

  return (
    <View style={$styles} />
  )
})

const $container: ViewStyle = {
  backgroundColor: colors.palette.neutral400,
  height: 1,
  width: "100%",
}
