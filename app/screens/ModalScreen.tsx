import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, ActivityIndicator } from "react-native"
import { Link, RouteProp, useRoute } from "@react-navigation/native"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "app/models"

interface ModalScreenProps extends AppStackScreenProps<"Modal"> {}
type ModalParamList = {
  Book: { bookId: string; queryIndex?: string; itemIndex?: string }
}

export const ModalScreen: FC<ModalScreenProps> = observer(function ModalScreen() {
  // Pull in one of our MST stores
  const { libaryStore } = useStores()
  const [isLoading, setIsLoading] = useState(false)
  const route = useRoute<RouteProp<ModalParamList, "Book">>()
  const params = route.params
  const navigation = useNavigation()
  const canGoBack = navigation.canGoBack()
  const { bookId } = params

  console.log({
    params,
  })
  // fetch book
  useEffect(() => {
    ; (async function load() {
      setIsLoading(true)
      await libaryStore.fetchMyBooks()
      setIsLoading(false)
    })()
  }, [bookId])

  const currentBook = libaryStore.currentBook

  return (
    <Screen style={$root} preset="scroll">
      {canGoBack && <Text text="Back" onPress={() => navigation.goBack()} />}
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Text text={currentBook?.volumeInfo.title} />
      )}
      <Text text="modal" />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
}
