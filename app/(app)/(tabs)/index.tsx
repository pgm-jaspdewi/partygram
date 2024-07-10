import LoadingIndicator from '@design/LoadingIndicator';
import { FlatList, View } from 'react-native';
import { getPosts } from '@core/modules/posts/api';
import { CenteredView, DefaultView, EmptyView } from '@design/View';
import { ErrorMessage } from '@design/Text';
import { Divider, PostListItem } from '@design/List';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { TopButton } from '@design/Button';
import { useAuthContext } from '@shared/Auth/AuthProvider';
import LikesAndFavorites from '@shared/Posts/LikedAndFavoritedPosts';
import StoriesView from '@design/Stories/StoriesView';

export default function TabOneScreen() {
  const router = useRouter();
  const { user } = useAuthContext();
  if (!user) return null;
  const { data, isLoading, isError, error } = useQuery({
    queryFn: getPosts,
    queryKey: ['posts'],
  });


  const userValues = LikesAndFavorites(user.id);

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
      <EmptyView
        title="No posts yet"
        description="A short time ago in an App not particularly far away...There were no posts."
        onPress={() => router.push("/posts/create")}
        icon="camera-plus-outline"
        button={'Place a post'} />
    );
  }



  return (
    <DefaultView padding={false}>
      <View>
        <StoriesView />
      </View>
      <TopButton onPress={() => router.push("/posts/create")}>
        Place a post
      </TopButton>
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
          // id-array of the posts liked by the current user
          likedId={userValues.likedId}
          // id-array of the posts favorited by the current user
          favoritedId={userValues.favoriteId}
          onPress={() => router.push({
            pathname: "/posts/:id",
            params: { id: item.id },
          })}
          source={{ uri: item.image_url }} />}
      />
    </DefaultView>
  );
};
