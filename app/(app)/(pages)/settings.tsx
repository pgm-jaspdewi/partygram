import { StyleSheet } from 'react-native';
import { DefaultView } from '@design/View';
import { SecondaryButton } from '@design/Button';
import { logout } from '@core/modules/auth/api';
import useTitle from '@core/hooks/useTitle';


export default function SettingScreen() {
  useTitle("Settings")
  return (
    <DefaultView style={styles.container}>
      <SecondaryButton onPress={() => logout()}>Logout</SecondaryButton>
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
