import { Post } from "@core/modules/posts/types";
import { PressableImage } from "@design/Button";
import { Text } from '@design/Text';
import { useRouter } from "expo-router";
import { View, StyleProp, ViewStyle, ImageStyle } from "react-native";

type Props = {
  data: Post[];
  style: StyleProp<ViewStyle>;
  styleImage: StyleProp<ImageStyle>;
  pressableStyle?: StyleProp<ImageStyle>;
};

export const ImageCards = ({ data, style, styleImage, pressableStyle }: Props) => {
  const router = useRouter();
  if (data.length === 0) {
    return (
      <View>
        <Text>No posts found matching your search</Text>
      </View>
    );
  }
  return (
    <View style={style}>
      {data.map((item: Post) => (
        <PressableImage
          style={styleImage}
          pressableStyle={pressableStyle}
          key={item.id}
          onPress={() => router.push({
            pathname: "/posts/:id",
            params: { id: item.id },
          })}
          children={'image'}
          source={{ uri: item.image_url }}
        />
      ))}
    </View>
  )
};