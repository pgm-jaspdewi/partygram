import { QueryKey } from "@tanstack/react-query";
import { FlatList, ListRenderItem } from "react-native";
import DataView from "./DataView";
import EmptyView from "@design/View/EmptyView";
import DefaultView from "@design/View/DefaultView";
import Divider from "@design/List/Divider";

// Currently not used anywhere because it causes errors.
type Props<T> = {
  name: QueryKey;
  method: () => Promise<T[] | null>;
  emptyTitle: string;
  emptyIcon: string;
  emptyDescription: string;
  emptyButton: string;
  onAddItem: () => void;
  renderItem: ListRenderItem<T>;
};

const DataListView = <T extends { id: number }>({
  method,
  name,
  renderItem,
  emptyIcon,
  emptyTitle,
  emptyDescription,
  emptyButton,
  onAddItem,
}: Props<T>) => {
  return (
    <DataView
      method={method}
      name={name}
      render={(data: T[]) => {
        if (data.length === 0) {
          return (
            <EmptyView
              icon={emptyIcon}
              title={emptyTitle}
              description={emptyDescription}
              button={emptyButton}
              onPress={onAddItem}
            />
          );
        }

        return (
          <DefaultView padding={false}>

            <FlatList
              data={data}
              keyExtractor={(item) => String(item.id)}
              ItemSeparatorComponent={() => <Divider />}
              renderItem={renderItem}
            />
          </DefaultView>
        );
      }}
    />
  );
};

export default DataListView;