import { useState, useEffect } from 'react'
import { StyleProp, TextStyle, Alert, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "app/theme"
import { Text, AutoImage, Button } from "app/components"
import { supabase } from 'app/utils/supabase'
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';
import { nanoid } from 'nanoid'

export interface AvatarProps {
  /**
   * An optional style override useful for padding & margin.
   */
  size: number
  url: string | null
  onUpload: (filePath: string) => void
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const Avatar = observer(function Avatar({ style, url, size = 150, onUpload }: AvatarProps) {
  const [uploading, setUploading] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const avatarSize = { height: size, width: size }

  const $styles = [$container, style]

  const pickImageAsync = async (): Promise<ImagePicker.ImagePickerAsset | null> => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      allowsMultipleSelection: false,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      return result.assets[0];
    } else {
      return null
    }
  };

  useEffect(() => {
    if (url) downloadImage(url)
  }, [url])

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage.from('avatars').download(path)

      if (error) {
        throw error
      }

      const fr = new FileReader()
      fr.readAsDataURL(data)
      fr.onload = () => {
        setAvatarUrl(fr.result as string)
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error downloading image: ', error.message)
      }
    }
  }

  async function uploadAvatar() {
    try {
      setUploading(true)

      const image = await pickImageAsync()
      if (!image) return

      console.log({image})

      const [ext] = image.uri.split('.').slice(-1)
      const filename = image.fileName || `${nanoid()}`

      const photo = {
        uri: image.uri,
        type: "image",
        name: filename,
      }

      console.log(photo)

      const formData = new FormData()
      // @ts-ignore
      formData.append('file', photo)

      const filePath = `${filename}.${ext}`

      const { error } = await supabase.storage.from('avatars').upload(filePath, formData)

      if (error) {
        throw error
      }

      onUpload(filePath)
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      } else {
        console.log("SUPER ERROR", error)
      }
    } finally {
      setUploading(false)
    }
  }

  return (
    <View style={$styles}>
      {avatarUrl ? (
        <AutoImage
          source={{ uri: avatarUrl }}
          maxHeight={size}
          maxWidth={size} />
      ) : (
        <View style={[$noImage, avatarSize, $avatar]} />
      )}
      <View>
        <Button
          onPress={uploadAvatar}
          disabled={uploading}
          LeftAccessory={() => <Feather name="upload" size={24} color="black" />}
        >
          {uploading ? 'Uploading ...' : 'Upload'}
        </Button>
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
  flex: 1,
  alignItems: "center",
}

const $avatar: ViewStyle = {
  borderRadius: 100,
  overflow: 'hidden',
  maxWidth: '100%',
}

const $noImage: ViewStyle = {
  backgroundColor: '#333',
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: 'white',
  borderRadius: 5,
}

// const $text: TextStyle = {
//   fontFamily: typography.primary.normal,
//   fontSize: 14,
//   color: colors.palette.primary500,
// }
