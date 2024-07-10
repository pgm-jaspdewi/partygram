import { DefaultView } from "@design/View";
import useTitle from "@core/hooks/useTitle";
import PostForm from "@shared/Posts/PostForm";


const PostCreateScreen = () => {
  useTitle("Create a new post")

  return (
    <DefaultView >
      <PostForm
        initialValues={{ description: "", image_url: "" }}
        label="Place Post"
      />
    </DefaultView>
  )

};

export default PostCreateScreen;