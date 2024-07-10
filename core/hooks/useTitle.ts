import { useNavigation } from "expo-router";
import { useEffect } from "react";

export const useTitle = (title: string | null) => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: title,
    });
  }, []);
};

export default useTitle;
