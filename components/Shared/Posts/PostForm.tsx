import { CreatePostBody, UpdatePostBody } from "@core/modules/posts/types";
import { StyleSheet, View } from "react-native";
import ImageButton from "@design/Button/ImageButton";
import { AppSubmitButton } from "@shared/Formik";
import AppForm from "@shared/Formik/AppForm";
import AppTextField from "@shared/Formik/AppTextField";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import * as yup from 'yup';
import ImagePickerDialog from "@design/ImagePicker/ImagePickerDialog";
import isVoid from "@core/utils/isVoid";
import { createPost } from "@core/modules/posts/api";
import { useRouter } from "expo-router";

const schema = yup.object().shape({
  description: yup.string().required(),
});

type Props<T> = {
  initialValues: T;
  label: string;
}

const PostForm = <T extends CreatePostBody | UpdatePostBody>({
  initialValues,
  label }: Props<T> & { children?: React.ReactNode }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['posts'] })
    queryClient.invalidateQueries({ queryKey: ['getPostsByOwnerId'] })
    router.back()
  }

  //useState for image-picker
  const [showPicker, setShowPicker] = useState(false);
  const [image, setImage] = useState<string>("");
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createPost,
    onSuccess: handleSuccess,
  })

  const handleSubmit = (data: { description?: string; }) => {
    mutate({ image_url: image, description: data.description || "" })
  };

  //Shows imagePickerDialog when button is pressed
  const handleImageButtonPress = () => {
    setShowPicker(true);
  };

  // handles image if image is not null
  const handleImage = async (image: string) => {
    // hide picker
    setShowPicker(false);
    // save image in state
    if (!isVoid(image)) {
      setImage(image);
    }
  };

  return (
    <AppForm initialValues={initialValues} onSubmit={handleSubmit} validationSchema={schema}>
      <View style={styles.view}>
        {/* the part about the imagepicker */}
        <ImageButton onPress={handleImageButtonPress} children={"Select Image"} />
        {showPicker && <ImagePickerDialog onDismiss={() => setShowPicker(false)} onImage={handleImage} />}
        {/* the part about the description */}
        <AppTextField label="Description" name="description" />
        <AppSubmitButton disabled={isPending}>{label}</AppSubmitButton>
      </View>

    </AppForm >
  )
};

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
  },
});

export default PostForm;