import { StyleSheet } from "react-native";
import Title from "@design/Text/Title";
import { Variables } from "@style";
import DefaultView from "@design/View/DefaultView";
import { useMutation } from "@tanstack/react-query";
import { LoginBody, login } from "@core/modules/auth/api";
import { useRouter } from "expo-router";
import ErrorMessage from "@design/Text/ErrorMessage";
import AppForm from "@shared/Formik/AppForm";
import * as yup from "yup";
import AppTextField from "@shared/Formik/AppTextField";
import AppSubmitButton from "@shared/Formik/AppSubmitButton";
import { TextButton } from "@design/Button";

const whiteListedDomains = [
  "student.arteveldehs.be",
  "arteveldehs.be",
];

const schema = yup.object().shape({
  email: yup.string()
    .email()
    .required()
    .test(
      "is-not-whitelist",
      "Please use an Artevelde email address",
      (value) => {
        if (value) {
          const currentDomain = value.substring(
            value.indexOf("@") + 1,
          );

          return whiteListedDomains.includes(currentDomain);
        }
      }
    ),
  password: yup.string().required(),
});

const LoginScreen = () => {
  const router = useRouter();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: login,
  });

  const handleSubmit = (data: LoginBody) => {
    mutate(data, {
      onSuccess: () => {
        router.push("/(app)/(tabs)/");
      },
    });
  };

  return (
    <AppForm initialValues={{ email: "", password: "" }} validationSchema={schema} onSubmit={handleSubmit}>
      <DefaultView style={styles.container}>
        <Title style={styles.title}>Login to your account</Title>
        {isError && <ErrorMessage error={error} />}
        <AppTextField
          label="Email"
          name="email"
          placeholder="person@arteveldehs.com"
          autoComplete="email"
          keyboardType="email-address"
          disabled={isPending}
        />
        <AppTextField
          label="Password"
          name="password"
          secureTextEntry={true}
          disabled={isPending}
        />
        <AppSubmitButton disabled={isPending}>Login</AppSubmitButton>
        <TextButton style={styles.textButton} onPress={() => router.push("/auth/register")}>
          No account yet? Register here
        </TextButton>
      </DefaultView>
    </AppForm>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Variables.sizes.xxxxl * 2,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginTop: Variables.sizes.medium,
    marginBottom: Variables.sizes.xl,
  },
  textButton: {
    width: "100%",
  },
});

export default LoginScreen;