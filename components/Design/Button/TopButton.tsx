import { Pressable, StyleProp, StyleSheet, View } from "react-native";
import { Variables } from "@style";
import Text from "../Text/Text";

type Props = {
  onPress: () => void;
  disabled?: boolean;
  children: string;
  style?: StyleProp<Object>;
};

const TopButton = ({ onPress, children, style, disabled = false }: Props) => {
  return (
    <Pressable
      disabled={disabled}
      accessibilityLabel={children}
      onPress={onPress}
      style={style}
      android_ripple={{ color: Variables.colors.ripple, foreground: true }}
    >
      <View style={[styles.background, disabled && styles.backgroundDisabled]}>
        <Text style={[styles.title, disabled && styles.titleDisabled]}>{children}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  background: {
    margin: Variables.sizes.small,
    paddingHorizontal: Variables.sizes.medium,
    paddingVertical: Variables.sizes.medium,
    backgroundColor: Variables.colors.secondary,
    borderRadius: Variables.sizes.small,
  },
  backgroundDisabled: {
    backgroundColor: Variables.colors.grayLight,
  },
  title: {
    textAlign: "center",
    color: Variables.colors.white,
    fontSize: Variables.textSizes.default,
    fontFamily: Variables.fonts.bold,
  },
  titleDisabled: {
    opacity: 0.3,
    color: Variables.colors.text,
  },
});

export default TopButton;