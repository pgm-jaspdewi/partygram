import useTitle from "@core/hooks/useTitle";
import { getComments } from "@core/modules/comments/api";
import { Divider, ListItem } from "@design/List";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useEffect } from "react";
import HeaderButton from "@design/Button/HeaderButton";
import { useQuery } from "@tanstack/react-query";
import { CenteredView, DefaultView, EmptyView } from "@design/View";
import LoadingIndicator from "@design/LoadingIndicator";
import { ErrorMessage, Text } from "@design/Text";
import { FlatList, Image, StyleSheet, View, } from "react-native";
import { getPostById } from "@core/modules/posts/api";
import { Variables } from "@style";
import { CommentWithRelations } from "@core/modules/comments/types";
import LikesAndFavorites from "@shared/Posts/LikedAndFavoritedPosts";
import { useAuthContext } from "@shared/Auth/AuthProvider";
import { ChangingIcons } from "@design/Button";

const PostDetailScreen = () => {
  const navigation = useNavigation();
  const router = useRouter();
  useTitle("")
  const { user } = useAuthContext();
  if (!user) return null;
  const { id } = useLocalSearchParams<{ id: string }>();
  const userValues = LikesAndFavorites(user.id);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderButton onPress={() => router.push(`/comments/${id}`)} title="Add comment" icon="comment-plus-outline" />,
    });
  }, [navigation]);

  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => getPostById(id),
    queryKey: ["post", id],
  });

  const { data: comments, isLoading: isLoadingComments, isError: isErrorComments, error: errorComments } = useQuery({
    queryFn: () => getComments(id),
    queryKey: ["comments", id],
  });

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

  if (data.length === 0) {
    return (
      <EmptyView
        icon={"comment-processing-outline"}
        title={"There's nothing here yet"}
        description={"Be the first to leave a comment!"}
        button={"Leave a comment"}
        onPress={() => router.push(`/comments/${id}`)}
      />
    );
  }



  const commentsList = (comments: CommentWithRelations[] | null | undefined) => {
    if (!comments || comments.length === 0) {
      return (
        <EmptyView
          icon={"comment-processing-outline"}
          title={"There's nothing here yet"}
          description={"Be the first to leave a comment!"}
          button={"Leave a comment"}
          onPress={() => router.push(`/comments/${id}`)}
        />
      );
    } else {
      return (
        <FlatList
          data={comments}
          keyExtractor={(item) => String(item.id)}
          ItemSeparatorComponent={() => <Divider />}
          /*
          profiles.username will never be null here because a username needs to be selected when a user is registered. 
          However if username is not of type "string | null" an error will occur during user-registration.
          This has something to do with the way the trigger responsible for filling the profiles table works in supabase.
          This error does not break the code in any way, so it will be ignored for now.
          */
          renderItem={({ item }) => <ListItem title={item.profiles.username} description={item.comment} onPress={() => { }} />}
        />
      )
    }
  }
  const likes = data.likes.length;
  return (

    <DefaultView padding={false}>
      <Image source={{ uri: data.image_url }} style={styles.image} resizeMode="cover" />
      <View style={styles.container}>
        <View style={styles.flex}>
          <Text style={styles.poster}>{data.profiles.username}</Text>
          <View style={styles.innerFlex}>
            <View style={styles.innerFlex}>
              <ChangingIcons id={parseInt(id)} listIds={userValues.likedId} iconName={"cards-heart"} type={"likes"} selectedColor={Variables.colors.error} />
              <Text style={[styles.description]}>{`${likes}`}</Text>
            </View>


            <ChangingIcons id={parseInt(id)} listIds={userValues.favoriteId} iconName="star" type="favorites" selectedColor={Variables.colors.secondary} />
          </View>
        </View>

        <Text style={styles.description}>{data.description}</Text>

      </View>
      <Text style={styles.title} >Comments</Text>
      {commentsList(comments)}
    </DefaultView>
  )

};

const styles = StyleSheet.create({
  container: {
    padding: Variables.sizes.small,
  },
  poster: {
    fontSize: Variables.sizes.small,
    color: Variables.colors.gray,
  },
  description: {
    marginLeft: Variables.sizes.xs,
    color: Variables.colors.gray,
  },
  title: {
    backgroundColor: Variables.colors.primary,
    color: Variables.colors.white,
    padding: Variables.sizes.small,
    fontSize: Variables.sizes.large,
  },
  image: {
    width: "100%",
    height: 300,
    marginRight: Variables.sizes.medium,
    backgroundColor: Variables.colors.grayLight,
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  innerFlex: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: Variables.sizes.medium,
  }
});

export default PostDetailScreen;