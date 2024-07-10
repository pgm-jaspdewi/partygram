import { ListHeaderAvatar } from "@design/List";
import { useAuthContext } from "../Auth/AuthProvider";
import UserEditableAvatar from "./UserAvatar";

type Props = {
  onPress: () => void;
};

const UserHeader = ({ onPress }: Props) => {
  const { user } = useAuthContext();
  if (!user) {
    return null;
  }
  return (
    <ListHeaderAvatar
      title={user.username}
      description={`${user.first_name} ${user.last_name}`}
      avatar={<UserEditableAvatar />}
      onPress={onPress}
    />
  );
};

export default UserHeader;