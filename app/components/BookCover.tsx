import * as React from "react"
import { StyleProp, View, ViewStyle, Pressable } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography, spacing } from "app/theme"
import { AutoImage } from "./AutoImage"
import { Book } from "../models/Book"
import {
  Text,
} from "../components"
import { Link } from "@react-navigation/native"

export interface BookCoverProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  book: Book
  maxWidth?: number
  onPress?: () => void
}

/**
 * Describe your component here
 */
export const BookCover = observer(function BookCover(props: BookCoverProps) {
  const { style, book, maxWidth, onPress } = props
  const { volumeInfo: { title } } = book
  const $styles = [$container, style]
  return (
    <View style={$styles}>
      <Link to={`/Modal/${book.id}`} onPress={onPress}>
        <View style={$bookCover}>
          <AutoImage source={book.bookCoverLink} maxWidth={maxWidth || 100} />
          <View style={$text}>
            <Text weight="bold" size="md" text={title} />
            <Text text={book.authorsString} size="md" weight="light"/>
          </View>
        </View>
      </Link>
    </View>
  )
})

const $container: ViewStyle = {
  marginBottom: spacing.sm,
}

const $bookCover: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  marginBottom: 5,
  marginTop: 5,
}

const $text: ViewStyle = {
  marginLeft: 10,
  flex: 1,
  flexWrap: "wrap",
  // stop words from going off screen
}
