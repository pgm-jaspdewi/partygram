import { Pressable, StyleSheet, View, Image, ImageSourcePropType } from "react-native";
import { Variables } from "@style";
import { Text } from "../Text";
import Icons from "@expo/vector-icons/MaterialCommunityIcons";
import { useAuthContext } from "@shared/Auth/AuthProvider";
import { ChangingIcons } from "../Button";

type Props = {
  onPress: () => void;
  id: number;
  title: string;
  poster: string;
  comments?: number;
  icon?: any;
  likes?: number;
  likedId: number[] | undefined;
  favoritedId: number[] | undefined;
  source: ImageSourcePropType;
};

const PostListItem = ({
  onPress,
  id,
  title,
  poster,
  comments,
  likes,
  likedId,
  favoritedId,
  source,
}: Props) => {
  const { user } = useAuthContext();
  if (!user) return null;

  let textContent: React.ReactNode;
  textContent = (
    <View style={styles.containerText}>
      {/* text-part */}
      <View style={styles.titleFlex}>
        <Text style={styles.poster}>{poster}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
      {/* likes & comments part */}
      <View style={styles.containerFlex}>
        <View style={styles.flex}>
          <Icons
            name="comment-outline"
            color={Variables.colors.gray}
            size={Variables.sizes.xl}
          />
          <Text style={[styles.description]}>{`${comments}`}</Text>
        </View>
        <View style={styles.flex}>
          <ChangingIcons
            id={id}
            listIds={likedId}
            iconName="cards-heart"
            type="likes"
            selectedColor={Variables.colors.error}
          />
          <Text style={[styles.description]}>{`${likes}`}</Text>
        </View>
        <View>
          <ChangingIcons
            id={id}
            listIds={favoritedId}
            iconName="star"
            type="favorites"
            selectedColor={Variables.colors.secondary}
          />
        </View>
      </View>
    </View>
  );


  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: Variables.colors.ripple, foreground: true }}
    >
      <View style={styles.container}>
        <Image source={source} style={styles.image} resizeMode="cover" />
        {textContent}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: Variables.sizes.horizontalPadding,
    paddingVertical: Variables.sizes.medium,
    backgroundColor: Variables.colors.white,
  },
  containerText: {
    flex: 1,
    width: "100%"
  },
  title: {},
  titleFlex: {
    flex: 1,
  },
  poster: {
    fontSize: Variables.sizes.small,
    color: Variables.colors.gray,
  },
  description: {
    marginLeft: Variables.sizes.xs,
    color: Variables.colors.gray,
  },
  right: {
    marginLeft: "auto",
  },
  image: {
    width: "100%",
    height: 175,
    marginRight: Variables.sizes.medium,
    backgroundColor: Variables.colors.grayLight,
  },
  icon: {
    marginLeft: Variables.sizes.xs,
    marginRight: Variables.sizes.medium,
  },
  containerFlex: {
    flexDirection: "row",
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: Variables.sizes.medium,
  }
});

export default PostListItem;