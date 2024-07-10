import { ColorValue, Pressable, StyleProp, View, Image, ImageSourcePropType, ImageStyle } from "react-native";
import { Variables } from "@style";

type Props = {
  onPress: () => void;
  children: string;
  style?: StyleProp<ImageStyle>;
  pressableStyle?: StyleProp<ImageStyle>;
  color?: ColorValue;
  disabled?: boolean;
  source: ImageSourcePropType;
};

const PressableImage = ({ onPress, children, style, color, disabled = false, source, pressableStyle }: Props) => {
  return (
    <Pressable
      disabled={disabled}
      accessibilityLabel={children}
      onPress={onPress}
      android_ripple={{ color: Variables.colors.ripple, foreground: true }}
      style={pressableStyle}
    >
      <View>
        <Image source={source} style={style} resizeMode="cover" />
      </View>
    </Pressable >
  );
};

export default PressableImage;