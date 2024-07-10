import useTitle from "@core/hooks/useTitle";
import UserForm from "@shared/User/UserForm";
import { createUser } from "@core/modules/auth/api";
import { DefaultView } from "@design/View";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

const RegisterScreen = () => {
  const router = useRouter();
  useTitle("Register");

  return (
    <DefaultView>
      <StatusBar style="light" />
      <UserForm
        initialValues={{
          email: "",
          password: "",
          username: "",
          first_name: "",
          last_name: "",
          accepted_terms: false,
        }}
        onSuccess={() => { router.push("/(app)/(tabs)") }}
        updateMethod={createUser}
        label="Create account"
      />
    </DefaultView>
  );
};

export default RegisterScreen;