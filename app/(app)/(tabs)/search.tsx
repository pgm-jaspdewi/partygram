import { StyleSheet, View } from 'react-native';
import { DefaultView } from '@design/View';
import SearchBarField from '@design/Form/SearchBarField';
import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getPostsViaSearch } from '@core/modules/posts/api';
import { ImageCards } from '@design/Card';

export default function SearchScreen() {
  const [searchText, setSearchText] = useState('');
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryFn: () => getPostsViaSearch(searchText),
    queryKey: ['postsViaSearch', searchText],
  });
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['postsViaSearch'] })
  }, [searchText]);

  return (
    <DefaultView>
      <SearchBarField handleSearch={(text: string) => { setSearchText(text) }} searchText={searchText} />
      {searchText.length > 2 && data ? <ImageCards data={data} style={styles.imageFlex} pressableStyle={styles.pressable} styleImage={styles.image} /> : null}
    </DefaultView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  pressable: {
    width: "33%"
  },
  imageFlex: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  image: {
    height: 120,
    width: "100%",

  },
});
