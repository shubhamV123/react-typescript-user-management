import * as React from "react";
import { Table } from "antd";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "email",
    dataIndex: "email",
    key: "email"
  },
  {
    title: "username",
    dataIndex: "username",
    key: "username"
  },
  {
    title: "phone",
    dataIndex: "phone",
    key: "phone"
  },
  {
    title: "topuser",
    key: "topuser",
    render: () => <>Hello</>
  }
];

const CustomTable = ({ loading, data }) => {
  const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);
  const onSelectChange = selectedRowKeys => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    // this.setState({ selectedRowKeys });
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };

  return (
    <Table
      rowSelection={rowSelection}
      loading={loading}
      columns={columns}
      dataSource={data}
    />
  );
};

export default CustomTable;
