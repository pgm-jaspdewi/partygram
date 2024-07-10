import { FlatList, StyleSheet, View } from 'react-native';
import { ErrorMessage, Text } from '@design/Text';
import { CenteredView, DefaultView } from '@design/View';
import { useAuthContext } from '@shared/Auth/AuthProvider';
import { ListItem } from '@design/List';
import UserHeader from '@shared/User/UserHeader';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { getPostsByOwnerId } from '@core/modules/posts/api';
import LoadingIndicator from '@design/LoadingIndicator';
import { ImageCards } from '@design/Card';

type Item = {
  key: string;
  title?: string;
  color?: string;
  icon?: string;
  onPress: () => void;
};

export default function ProfileScreen() {
  const router = useRouter();
  const { user } = useAuthContext();

  if (!user) return (
    <DefaultView>
      <Text style={styles.title}>Failed to retrieve profile data</Text>
    </DefaultView>
  )

  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => getPostsByOwnerId(user.id),
    queryKey: ['getPostsByOwnerId'],
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

  const items: Item[] = [
    {
      key: "profile",
      onPress: () => {
        router.push("/profile/edit")
      },
    },
  ];

  return (
    <View>
      <FlatList
        data={items}
        renderItem={({ item }) =>
          item.key === "profile" ? (
            <UserHeader onPress={item.onPress} />
          ) : (
            <ListItem
              title={item.title ?? ""}
              color={item.color}
              onPress={item.onPress}
              icon={item.icon}
              iconColor={item.color}
            />
          )
        }
      />
      <ImageCards data={data} style={styles.imageFlex} pressableStyle={styles.pressable} styleImage={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  pressable: {
    width: "33%"
  },
  imageFlex: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  image: {
    height: 130,
    width: "100%",
    marginBottom: 4,
    marginRight: 4,
  },
});
