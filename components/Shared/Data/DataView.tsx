import LoadingIndicator from "@design/LoadingIndicator";
import ErrorMessage from "@design/Text/ErrorMessage";
import CenteredView from "@design/View/CenteredView";
import DefaultView from "@design/View/DefaultView";
import { QueryKey, useQuery } from "@tanstack/react-query";

// Currently not used anywhere because it causes errors.
type Props<T> = {
  name: QueryKey;
  method: () => Promise<T | null>;
  render: (data: T) => React.ReactNode;
};

const DataView = <T extends Object>({ name, method, render }: Props<T>) => {
  const { data, isLoading, isError, error } = useQuery({
    queryFn: method,
    queryKey: name,
  });

  if (isLoading) {
    return (
      <CenteredView>
        <LoadingIndicator />
      </CenteredView>
    );
  }

  if (isError) {
    return (
      <DefaultView>
        <ErrorMessage error={error} />
      </DefaultView>
    );
  }

  if (!data) {
    return (
      <DefaultView>
        <ErrorMessage error="Does not exist" />
      </DefaultView>
    );
  }

  return render(data);
};

export default DataView;