import * as React from "react";
import { Layout, Row } from "antd";
import { LayoutContext } from "../Provider/LayoutProvider";
import CustomTable from "./CustomTable";
import { useFetch } from "../hooks/useFetch";
const { useContext, useEffect, useState } = React;
const { Content } = Layout;

const Home = () => {
  const layoutContext = useContext(LayoutContext);
  const { data, loading } = layoutContext;
  // useFetch(
  //   "https://jsonplaceholder.typicode.com/users"
  // );
  console.log("data", data, loading);
  return (
    // <Layout style={{ padding: '0 24px 24px' }} >
    //     <Content style={{ padding: '30px 24px', minHeight: 280 }}>

    //     </Content >
    // </Layout >
    <CustomTable loading={loading} data={data} />
  );
};

export default Home;
