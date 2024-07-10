import * as yup from "yup";
import { View } from "react-native";
import { useMutation } from "@tanstack/react-query";
import AppTextField from "@shared/Formik/AppTextField";
import ErrorMessage from "@design/Text/ErrorMessage";
import AppForm from "@shared/Formik/AppForm";
import AppSubmitButton from "@shared/Formik/AppSubmitButton";
import { CreateCommentBody } from "@core/modules/comments/types";

const schema = yup.object().shape({
  comment: yup.string().min(2).required(),
});

type Props<T, U> = {
  initialValues: T;
  onSuccess: (data: U) => void;
  updateMethod: (values: T) => Promise<U>;
  label: string;
};

const CommentForm = <T extends CreateCommentBody, U>({
  initialValues,
  onSuccess,
  updateMethod,
  label,
}: Props<T, U>) => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: updateMethod,
    onSuccess: onSuccess,
  });

  const handleSubmit = async (values: T) => {
    mutate(values);
  };

  return (
    <AppForm initialValues={{ ...initialValues }} validationSchema={schema} onSubmit={handleSubmit}>
      <View>
        {isError && <ErrorMessage error={error} />}
        <AppTextField name="comment" label="Comment" disabled={isPending} />
        <AppSubmitButton disabled={isPending}>{label}</AppSubmitButton>
      </View>
    </AppForm>
  );
};

export default CommentForm;