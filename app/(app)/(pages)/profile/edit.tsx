import useTitle from "@core/hooks/useTitle";
import DefaultView from "@design/View/DefaultView";
import UserForm from "@shared/User/UserForm";
import { useAuthContext } from "@shared/Auth/AuthProvider";
import { updateUser } from "@core/modules/auth/api";
import { useRouter } from "expo-router";


const UserEditScreen = () => {
  useTitle("Edit profile");
  const router = useRouter();
  const { user } = useAuthContext();


  const handleSuccess = () => {
    router.back();
  };

  return (
    <DefaultView>
      <UserForm
        onSuccess={handleSuccess}
        initialValues={{ ...user }}
        label="Update"
        updateMethod={updateUser}
        options={{ showPassword: false }}
      />
    </DefaultView>
  );
};

export default UserEditScreen;