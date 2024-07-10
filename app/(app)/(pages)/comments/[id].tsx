import { useLocalSearchParams, useRouter } from "expo-router";
import { DefaultView } from "@design/View";
import CommentForm from "@shared/Comment/CommentForm";
import { createComment } from "@core/modules/comments/api";
import { useQueryClient } from "@tanstack/react-query";
import useTitle from "@core/hooks/useTitle";

const CreateCommentScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const queryClient = useQueryClient();
  useTitle("Leave a comment")


  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['comments'] })
    queryClient.invalidateQueries({ queryKey: ['posts'] })
    router.back()
  }

  return (
    <DefaultView>
      <CommentForm
        initialValues={{ comment: "", post_id: parseInt(id), }}
        onSuccess={handleSuccess}
        updateMethod={createComment}
        label={"Create"} />
    </DefaultView>
  );
};

export default CreateCommentScreen; 