
import { StyleSheet } from 'react-native';
import { Text } from '../../../components/Themed';
import { DefaultView } from '@design/View';
import useTitle from '@core/hooks/useTitle';


export default function ChatScreen() {
  useTitle("Chat")
  return (
    <DefaultView style={styles.container}>
      <Text style={styles.title}>Hello Chat</Text>
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
