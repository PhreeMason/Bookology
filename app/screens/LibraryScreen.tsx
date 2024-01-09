// @ts-ignore
import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, ImageStyle, View, ActivityIndicator } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { spacing } from "../theme"
import { isRTL } from "../i18n"
import {
  EmptyState,
  ListView,
  Screen,
  Text,
  Divider,
  BookCover
} from "../components"
import { Book } from "../models/Book"
import { type ContentStyle } from "@shopify/flash-list"

// import { useNavigation } from "@react-navigation/native"
import { useStores } from "app/models"

interface LibraryScreenProps extends AppStackScreenProps<"Library"> { }

export const LibraryScreen: FC<LibraryScreenProps> = observer(function LibraryScreen() {
  // Pull in one of our MST stores
  const { libaryStore } = useStores()
  // const [searching, setSearching] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    ; (async function load() {
      setIsLoading(true)
      await libaryStore.fetchMyBooks()
      setIsLoading(false)
    })()
  }, [libaryStore])

  async function manualRefresh() {
    setRefreshing(true)
    await libaryStore.fetchMyBooks()
    setRefreshing(false)
  }

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$screenContentContainer}>
      <ListView<Book>
        contentContainerStyle={$listContentContainer}
        data={libaryStore.booksForList.slice()}
        // extraData={libaryStore.favorites.length + libaryStore.episodes.length}
        refreshing={refreshing}
        estimatedItemSize={20}
        onRefresh={manualRefresh}
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator />
          ) : (
            <EmptyState
              preset="generic"
              style={$emptyState}
              button={undefined}
              buttonOnPress={manualRefresh}
              imageStyle={$emptyStateImage}
              ImageProps={{ resizeMode: "contain" }}
            />
          )
        }
        ListHeaderComponent={
          <View style={$heading}>
            <Text preset="heading" tx="libaryScreen.header" />
          </View>
        }
        renderItem={({ item, index }) => (
          <View>
            {index > 0 && <Divider />}
            <BookCover
              book={item}
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
