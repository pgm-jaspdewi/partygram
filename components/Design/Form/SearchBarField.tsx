import { Variables } from '@style';
import { TextInput, View, StyleSheet } from 'react-native';

type Props = {
  handleSearch: (text: string) => void;
  searchText: string;
}

const SearchBarField = ({ handleSearch, searchText }: Props) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={searchText}
        onChangeText={handleSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: Variables.colors.gray,
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});

export default SearchBarField;
