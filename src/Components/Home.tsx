import * as React from "react";
import { LayoutContext } from "../Provider/LayoutProvider";
import CustomTable from "./CustomTable";
const { useContext } = React;

const Home: React.FC<{}> = () => {
  const layoutContext = useContext(LayoutContext);
  const { modifiedData, loading, topUsersAre } = layoutContext;
  return (
    <CustomTable
      loading={loading}
      data={topUsersAre ? topUsersAre : modifiedData}
    />
  );
};

export default Home;
