import { createStory, getStories } from "@core/modules/stories/api";
import isVoid from "@core/utils/isVoid";
import { PressableImage } from "@design/Button";
import ImagePickerDialog from "@design/ImagePicker/ImagePickerDialog";
import { TextIcon } from "@design/Text";
import { Variables } from "@style";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

type DataProps = {
  id: number, button?: boolean, story_url: string, created_at: string, owner_id: string
}

const StoriesView = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [showPicker, setShowPicker] = useState(false);
  const { data } = useQuery({
    queryFn: getStories,
    queryKey: ['stories'],
  });

  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['stories'] })
  }
  const { mutate } = useMutation({
    mutationFn: createStory,
    onSuccess: handleSuccess,
  });

  if (!data) return null;

  const handleStoryButtonPress = () => {
    setShowPicker(true);
  };

  const handleImage = async (image: string) => {
    // hide picker
    setShowPicker(false);
    if (!isVoid(image)) {
      mutate(image);
    }
  };

  // this is responsible for the add story button
  const button = [
    {
      id: 0,
      button: true,
      story_url: "",
      created_at: "",
      owner_id: "",
    },
  ]

  /* 
  This filters out the duplicate owner_id's leaving the last one in the array to be displayed.
  If the query uses ".order("created_at", { ascending: true })", the last one will be the users most recent story.
  */
  const ids = data.map(({ owner_id }) => owner_id);
  const filtered = data.filter(({ owner_id }, index) => !ids?.includes(owner_id, index + 1));
  /*
  This is the final array that will be used to display the stories, combining the filtered array and the button.
  */
  const stories: DataProps[] = [...button, ...filtered];

  return (
    <View style={styles.container}>
      <FlatList
        //  horizontal={true} will make the stories scrollable horizontally
        horizontal={true}
        data={stories}
        renderItem={({ item }) =>
          item.button === true ? (
            <Pressable
              disabled={false}
              accessibilityLabel="Add Story"
              onPress={handleStoryButtonPress}
              style={styles.button}
              android_ripple={{ color: Variables.colors.ripple, foreground: true }}
            >
              <TextIcon
                color={Variables.colors.gray}
                size={Variables.sizes.xl}
                name="plus"
                style={undefined}
              />
              {showPicker && <ImagePickerDialog onDismiss={() => setShowPicker(false)} onImage={handleImage} />}
            </Pressable>
          ) : (
            <PressableImage
              style={styles.image}
              key={item.id}
              onPress={() => { router.push(`/stories/${item.id}`) }}
              children={'image'}
              source={{ uri: item.story_url }}
            />
          )
        }
      />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    margin: 4,
  },
  button: {
    backgroundColor: Variables.colors.white,
    width: 80,
    height: 126,
    margin: 2,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  imageFlex: {
    flexDirection: "row",
  },
  image: {
    height: 126,
    width: 80,
    margin: 2,
    borderRadius: 10,
  },
});

export default StoriesView;