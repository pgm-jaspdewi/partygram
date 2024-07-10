import Colors from '../../../constants/Colors';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme, StyleSheet } from 'react-native';
import { TextIcon } from '@design/Text';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tabIconSelected,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Partygram',
          tabBarIcon: ({ color }) => <TextIcon name="home" color={color} style={styles.TabBarIcon} />,
          headerRight: () => (
            <Link href="/chat" asChild>
              <Pressable>
                {({ pressed }) => (
                  <TextIcon
                    name="comments-o"
                    color={Colors[colorScheme ?? 'light'].tabIconSelected}
                    style={[styles.HeaderIcon, { opacity: pressed ? 0.5 : 1 }]}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <TextIcon name="search" color={color} style={styles.TabBarIcon} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color }) => <TextIcon name="star" color={color} style={styles.TabBarIcon} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TextIcon name="user" color={color} style={styles.TabBarIcon} />,
          headerRight: () => (
            <Link href="/settings" asChild>
              <Pressable>
                {({ pressed }) => (
                  <TextIcon
                    name="gear"
                    color={Colors[colorScheme ?? 'light'].tabIconSelected}
                    style={[styles.HeaderIcon, { opacity: pressed ? 0.5 : 1 }]}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  TabBarIcon: {
    marginBottom: -3,
  },
  HeaderIcon: {
    marginRight: 15,
  }
});