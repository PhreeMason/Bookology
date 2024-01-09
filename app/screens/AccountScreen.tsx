import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, Alert, View } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen, TextField, Button, Avatar } from "app/components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "app/models"
import { useState, useEffect } from 'react'
import { supabase } from "app/utils/supabase"
import { spacing } from "../theme"
import { FontAwesome5 } from '@expo/vector-icons';

interface AccountScreenProps extends AppStackScreenProps<"Account"> { }

export const AccountScreen: FC<AccountScreenProps> = observer(function AccountScreen() {
  // Pull in one of our MST stores
  const { authenticationStore: { session, user } } = useStores()

  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState('')
  const [website, setWebsite] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')

  useEffect(() => {
    if (session) getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)
      if (!user) throw new Error('No user on the session!')

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', session?.user.id)
        .single()
      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string
    website: string
    avatar_url: string
  }) {
    console.log({ username, website, avatar_url });
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      const updates = {
        id: session?.user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      }

      const { error } = await supabase.from('profiles').upsert(updates)

      if (error) {
        throw error
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }
  return (
    <Screen preset="scroll" contentContainerStyle={$container} safeAreaEdges={["top"]}>
      <View>
        <Avatar
          size={200}
          url={avatarUrl}
          onUpload={(url: string) => {
            setAvatarUrl(url)
            updateProfile({ username, website, avatar_url: url })
          }}
        />
      </View>
      <View style={[$verticallySpaced, $mt20]}>
        <TextField
          status="disabled"
          value={session?.user?.email}
          label="Email"
        />
      </View>
      <View style={$verticallySpaced}>
        <TextField
          label="Username"
          value={username || ''}
          onChangeText={(text) => setUsername(text)} />
      </View>
      <View style={$verticallySpaced}>
        <TextField
          label="Website"
          value={website || ''}
          onChangeText={(text) => setWebsite(text)} />
      </View>

      <View style={[$verticallySpaced, $mt20]}>
        <Button
          preset="filled"
          LeftAccessory={() => (
            <FontAwesome5 name="save" size={24} color="black" />
          )}
          onPress={() => updateProfile({ username, website, avatar_url: avatarUrl })}
          disabled={loading}
        > Update
        </Button>
      </View>

      <View style={$verticallySpaced}>
        <Button
          LeftAccessory={() => (
            <FontAwesome5 name="sign-out-alt" size={24} color="black" />
          )}
          onPress={() => supabase.auth.signOut()}
        >
          Sign Out
        </Button>
      </View>
    </Screen>
  )
})

const $container: ViewStyle = {
  paddingTop: spacing.lg + spacing.xl,
  paddingHorizontal: spacing.lg,
}

const $verticallySpaced: ViewStyle = {
  paddingTop: spacing.md,
  paddingBottom: spacing.md,
  alignSelf: 'stretch',
};

const $mt20: ViewStyle = {
  marginTop: spacing.xl,
};
