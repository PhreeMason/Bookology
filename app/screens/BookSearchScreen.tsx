import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, ImageStyle, View, ActivityIndicator } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "app/models"
import { spacing } from "../theme"
import { isRTL } from "../i18n"
import {
  EmptyState,
  ListView,
  Screen,
  Text,
  Divider,
  BookCover,
  TextField,
} from "../components"
import { Book } from "../models/Book"
import { type ContentStyle } from "@shopify/flash-list"

interface BookSearchScreenProps extends AppStackScreenProps<"BookSearch"> {}

export const BookSearchScreen: FC<BookSearchScreenProps> = observer(function BookSearchScreen() {
  const [searching, setSearching] = useState(false)
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { libaryStore } = useStores()
  const navigation = useNavigation()

  const searchForBook = async () => {
    if (!query) return
    if (query.length < 3) return
    if (searching) return
    setSearching(true)
    await libaryStore.findBook(query)
    setSearching(false)
  }

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$screenContentContainer}>
      <ListView<Book>
        contentContainerStyle={$listContentContainer}
        data={libaryStore.searchForList.slice()}
        // extraData={libaryStore.favorites.length + libaryStore.episodes.length}
        refreshing={searching}
        estimatedItemSize={20}
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator />
          ) : (
            <EmptyState
              preset="generic"
              style={$emptyState}
              button={undefined}
              imageStyle={$emptyStateImage}
              ImageProps={{ resizeMode: "contain" }}
            />
          )
        }
        ListHeaderComponent={
          <View style={$heading}>
            <Text preset="heading" tx="libaryScreen.header" />
            <TextField 
              placeholder="Search"
              value={query}
              onChangeText={setQuery}
              onSubmitEditing={searchForBook}
            />
          </View>
        }
        renderItem={({ item, index }) => (
          <View>
            {index > 0 && <Divider />}
            <BookCover
              book={item}
              maxWidth={50}
            />
          </View>

        )}
      />
    </Screen>
  )
})

// #region Styles
const $screenContentContainer: ViewStyle = {
  flex: 1,
}

const $listContentContainer: ContentStyle = {
  paddingHorizontal: spacing.lg,
  paddingTop: spacing.lg + spacing.xl,
  paddingBottom: spacing.lg,
}

const $heading: ViewStyle = {
  marginBottom: spacing.md,
}

const $emptyState: ViewStyle = {
  marginTop: spacing.xxl,
}

const $emptyStateImage: ImageStyle = {
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}

const $bookCoverItem: ViewStyle = {
  justifyContent: "space-between",
}
// #endregion
