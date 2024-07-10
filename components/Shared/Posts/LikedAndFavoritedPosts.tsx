import { getFavoritesOfUser } from "@core/modules/favorites/api";
import { getLikesByOwnerId } from "@core/modules/likes/api";
import { useQuery } from "@tanstack/react-query";

const LikesAndFavorites = (uid: number | string) => {
  //get likes of current user
  const { data: likes } = useQuery({
    queryFn: () => getLikesByOwnerId(uid),
    queryKey: ['likes'],
  });
  //get post_id of posts current user liked
  const likedId: number[] = likes?.map((x) => x.post_id) as number[];

  //get favorites of current user
  const { data: favorites } = useQuery({
    queryFn: () => getFavoritesOfUser(uid),
    queryKey: ['favorites'],
  });

  //get post_id of posts current user favorited
  const favoriteId: number[] = favorites?.map((x) => x.post_id) as number[];

  return { likedId, favoriteId };
}

export default LikesAndFavorites;