import { ColorValue, Pressable, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Variables } from "@style";
import Icons from "@expo/vector-icons/MaterialCommunityIcons";

type Props = {
  onPress: () => void;
  children: string;
  style?: StyleProp<ViewStyle>;
  color?: ColorValue;
  disabled?: boolean;
};

const ImageButton = ({ onPress, children, style, color, disabled = false }: Props) => {
  return (
    <Pressable
      disabled={disabled}
      accessibilityLabel={children}
      onPress={onPress}
      style={style}
      android_ripple={{ color: Variables.colors.ripple, foreground: true }}
    >
      <View
        style={[
          styles.background,
          { backgroundColor: color ?? Variables.colors.secondary },
          disabled && styles.backgroundDisabled,
        ]}
      >
        <Icons name="camera-plus-outline" size={Variables.sizes.xxxl} color={Variables.colors.white} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  background: {
    alignItems: "center",
    width: "50%",
    paddingHorizontal: Variables.sizes.large,
    paddingVertical: Variables.sizes.medium,
    borderRadius: Variables.sizes.xs,
  },
  backgroundDisabled: {
    backgroundColor: Variables.colors.grayLight,
  },
});

export default ImageButton;