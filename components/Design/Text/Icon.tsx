import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StyleProp, TextStyle } from 'react-native';

// built-in icon families and icons at https://icons.expo.fyi/ 

type Props = {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  style: StyleProp<TextStyle>;
  size?: number;
}

function TextIcon({ name, color, style, size = 28 }: Props) {
  return <FontAwesome size={size} style={style} color={color} name={name} />;
}

export default TextIcon;