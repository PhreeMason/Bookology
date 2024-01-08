import * as React from "react"
import { StyleProp, View, ViewStyle, Pressable } from "react-native"
import { observer } from "mobx-react-lite"
// import { colors, typography } from "app/theme"
import { AutoImage } from "./AutoImage"
import { Book } from "../models/Book"
import {
  Text,
} from "../components"

export interface BookCoverProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  book: Book
}

/**
 * Describe your component here
 */
export const BookCover = observer(function BookCover(props: BookCoverProps) {
  const { style, book } = props
  const { volumeInfo: { title } } = book
  const $styles = [$container, style]
  return (
    <View style={$styles}>
      <Pressable onPress={() => console.log('book selected')}>
        <View style={$bookCover}>
          <AutoImage source={book.bookCoverLink} maxWidth={100} />
          <View style={$text}>
            <Text weight="bold" size="md" text={title} />
            <Text text={book.authorsString} size="md" weight="light"/>
          </View>
        </View>
      </Pressable>
    </View>
  )
})

const $container: ViewStyle = {

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
}
