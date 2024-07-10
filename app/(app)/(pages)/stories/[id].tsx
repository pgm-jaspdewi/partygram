import useTitle from "@core/hooks/useTitle";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { CenteredView, DefaultView, EmptyView } from "@design/View";
import LoadingIndicator from "@design/LoadingIndicator";
import { ErrorMessage } from "@design/Text";
import { Image, StyleSheet, } from "react-native";
import { Variables } from "@style";
import { getStories, getStoryById } from "@core/modules/stories/api";

const PostDetailScreen = () => {
  const router = useRouter();
  useTitle("");
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => getStoryById(id),
    queryKey: ["story", id],
  });
  const { data: stories } = useQuery({
    queryFn: getStories,
    queryKey: ['stories'],
  });
  if (!stories) return null;

  /* This piece of code is responsible for stories cycling after 5 seconds */
  // First it gets the owner_id's from the stories array
  const ids = stories.map(({ owner_id }) => owner_id);
  // Then it filters out the duplicate owner_id's leaving the last one in the array (the most recent) to be displayed.
  const filtered = stories.filter(({ owner_id }, index) => !ids?.includes(owner_id, index + 1));
  // Then it gets the story id's from the filtered array
  const storyIds = filtered.map(item => item.id);
  // Then it finds the current id in the storyIds array
  const CurrentId = storyIds.findIndex((object) => object === (parseInt(id)))
  // Finally it uses the CurrentId to find the next story in the array or return to the homepage when it reached the last story.
  useEffect(() => {
    const redirect = setTimeout(() => {
      if (CurrentId < storyIds.length - 1) {
        router.push(`/stories/${storyIds[CurrentId + 1]}`);
      } else {
        router.push(`/`);
      }
    }, 5000);
    return () => {
      clearTimeout(redirect);
    };
  }, []);

  if (isLoading) {
    return (
      <CenteredView>
        <LoadingIndicator />
      </CenteredView>
    );
  }

  if (isError) {
    return (
      <DefaultView>
        <ErrorMessage error={error} />
      </DefaultView>
    );
  }

  if (!data) {
    return (
      <DefaultView>
        <ErrorMessage error="Does not exist" />
      </DefaultView>
    );
  }

  if (!data.story_url) {
    return (
      <EmptyView
        icon={"exclamation-thick"}
        title={"Lost a planet, Master Obi-Wan has. How embarrassing."}
        description={"It ought to be here... but it isn't"}
        button={"Return to homepage"}
        onPress={() => router.push(`/`)}
      />
    );
  }

  return (
    <DefaultView padding={false}>
      <Image source={{ uri: data.story_url }} style={styles.image} resizeMode="cover" />
    </DefaultView>
  )

};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    marginRight: Variables.sizes.medium,
    backgroundColor: Variables.colors.grayLight,
  },
});

export default PostDetailScreen;