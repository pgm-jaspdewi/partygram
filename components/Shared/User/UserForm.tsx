import * as yup from "yup";
import { View } from "react-native";
import { useMutation } from "@tanstack/react-query";
import AppTextField from "../Formik/AppTextField";
import ErrorMessage from "@design/Text/ErrorMessage";
import AppForm from "../Formik/AppForm";
import AppSubmitButton from "../Formik/AppSubmitButton";
import { CreateUserBody, UpdateUserBody } from "@core/modules/auth/types";

const whiteListedDomains = [
  "student.arteveldehs.be",
  "arteveldehs.be",
];

const getSchema = (options: Options) => {
  return yup.object().shape({
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
    ...(options.showPassword ? { password: yup.string().min(8).required() } : {}),
    username: yup.string().required(),
    first_name: yup.string().required(),
    last_name: yup.string().required(),
  });
};

type Options = {
  showPassword: boolean;
};

const defaultOptions = {
  showPassword: true,
};

type Props<T> = {
  initialValues: T;
  onSuccess: () => void;
  updateMethod: (values: T) => Promise<any>;
  label: string;
  options?: Partial<Options>;
};

const UserForm = <T extends CreateUserBody | UpdateUserBody>({
  initialValues,
  onSuccess,
  updateMethod,
  label,
  options = {},
}: Props<T>) => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: updateMethod,
    onSuccess: onSuccess,
  });

  const handleSubmit = async (values: T) => {
    mutate(values);
  };

  const formOptions = { ...defaultOptions, ...options };

  return (
    <AppForm
      initialValues={{ ...initialValues }}
      validationSchema={getSchema(formOptions)}
      onSubmit={handleSubmit}
    >
      <View>
        {isError && <ErrorMessage error={error} />}
        <AppTextField
          name="email"
          label="Email"
          placeholder="person@arteveldehs.com"
          autoComplete="email"
          keyboardType="email-address"
          disabled={isPending}
        />
        {formOptions.showPassword && (
          <AppTextField name="password" label="Password" secureTextEntry={true} disabled={isPending} />
        )}
        <AppTextField name="username" label="Username" disabled={isPending} />
        <AppTextField name="first_name" label="First name" disabled={isPending} />
        <AppTextField name="last_name" label="Last name" disabled={isPending} />
        <AppSubmitButton disabled={isPending}>{label}</AppSubmitButton>
      </View>
    </AppForm>
  );
};

export default UserForm;