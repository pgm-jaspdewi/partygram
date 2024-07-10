import { ColorValue } from "react-native";
import { Variables } from "@style";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLike, deleteLike } from "@core/modules/likes/api";
import { createFavorite, deleteFavorite } from "@core/modules/favorites/api";
import IconButton from "./IconButton";

/* The color-changing icons used as like- and favorite-buttons on posts*/

type Props = {
  id: number;
  listIds: number[] | undefined;
  iconName: string;
  type: "likes" | "favorites";
  selectedColor: ColorValue;
};

const ChangingIcons = ({
  id,
  listIds,
  iconName,
  type,
  selectedColor,
}: Props) => {
  const queryClient = useQueryClient();

  // mutations to add and remove likes from database
  const { mutate } = useMutation({
    mutationFn: createLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['likes'] })
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      queryClient.invalidateQueries({ queryKey: ['post'] })
    }
  });
  const { mutate: mutateDelete } = useMutation({
    mutationFn: () => deleteLike(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['likes'] })
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      queryClient.invalidateQueries({ queryKey: ['post'] })
    }
  });

  // mutations to add and remove favorites from database
  const { mutate: mutateCreateFavorite } = useMutation({
    mutationFn: createFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] })
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      queryClient.invalidateQueries({ queryKey: ['post'] })
      queryClient.invalidateQueries({ queryKey: ['postsByFavorite'] })
    }
  });
  const { mutate: mutateDeleteFavorite } = useMutation({
    mutationFn: () => deleteFavorite(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] })
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      queryClient.invalidateQueries({ queryKey: ['post'] })
      queryClient.invalidateQueries({ queryKey: ['postsByFavorite'] })
    }
  });

  // check if the id is included in the list of id's passed as props and return the icon accordingly
  if (listIds?.includes(id)) {
    return (
      <IconButton
        icon={iconName}
        color={selectedColor}
        title={type}
        onPress={() => {
          if (type === "likes") {
            mutateDelete()
          } else {
            mutateDeleteFavorite()
          }
        }}
      />)
  }
  return (
    <IconButton
      icon={`${iconName}-outline`}
      color={Variables.colors.gray}
      title={type}
      onPress={() => {
        if (type === "likes") {
          mutate({ post_id: id })
        } else {
          mutateCreateFavorite({ post_id: id })
        }
      }}
    />);
};

export default ChangingIcons;
