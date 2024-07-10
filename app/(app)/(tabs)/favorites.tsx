import { FlatList, StyleSheet } from 'react-native';
import { CenteredView, DefaultView } from '@design/View';
import { useQuery } from '@tanstack/react-query';
import { useAuthContext } from '@shared/Auth/AuthProvider';
import { getPostsByFavoriteOfUser } from '@core/modules/posts/api';
import { ErrorMessage, Text } from '@design/Text';
import LoadingIndicator from '@design/LoadingIndicator';
import { Divider, PostListItem } from '@design/List';
import { useRouter } from 'expo-router';
import LikesAndFavorites from '@shared/Posts/LikedAndFavoritedPosts';

export default function FavoritesScreen() {
  const router = useRouter();
  const { user } = useAuthContext();
  if (!user) return null;

  const userValues = LikesAndFavorites(user.id);

  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => getPostsByFavoriteOfUser(userValues.favoriteId),
    queryKey: ['postsByFavorite', userValues.favoriteId],
  });

  if (isError) {
    <CenteredView>
      <ErrorMessage error={error} />
    </CenteredView>
  };

  if (isLoading || !data) {
    <CenteredView>
      <LoadingIndicator />
    </CenteredView>
  }

  if (!data) {
    return null;
  }

  if (data.length === 0) {
    return (
      <DefaultView style={styles.container}>
        <Text style={styles.title}>No posts favorited yet</Text>
      </DefaultView>
    );
  }

  return (
    <DefaultView padding={false}>
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => <PostListItem
          title={item.description}
          /* 
          profiles.username will never be null here because a username needs to be selected when a user is registered. 
          However if username is not of type "string | null" an error will occur during user-registration.
          This has something to do with the way the trigger responsible for filling the profiles table works in supabase.
          This error does not break the code in any way, so it will be ignored for now.
          */
          poster={item.profiles.username}
          comments={item.comments.length}
          likes={item.likes.length}
          id={item.id}
          // pass the id of the posts liked by the current user to postListItem
          likedId={userValues.likedId}
          // pass the id of the posts favorited by the current user to postListItem
          favoritedId={userValues.favoriteId}
          onPress={() => router.push({
            pathname: "/posts/:id",
            params: { id: item.id },
          })}
          source={{ uri: item.image_url }} />}
      />
    </DefaultView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
