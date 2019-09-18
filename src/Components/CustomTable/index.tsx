import * as React from "react";
import { Table } from "antd";
import BlockUser from "./BlockUser";
import MarkUserTop from "./MarkUserTop";
import { LayoutContext } from "../../Provider/LayoutProvider";

const { useContext } = React;

const CustomTable = ({ loading, data }) => {
  const layoutContext = useContext(LayoutContext);
  const { banUser } = layoutContext;
  const handleOnChange = (checked, record, type) => {
    console.log(record);
    banUser(checked, record.id, type);
    // console.log(`switch to ${checked} ${record}`);
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username"
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone"
    },
    {
      title: "Ban User",
      key: "banuser",
      render: (text, record) => {
        const disableAccessToNonAdmin =
          localStorage.getItem("userType") === "admin"
            ? false
            : record.userType === "admin" && record.banUser;
        return (
          <>
            <BlockUser
              active={record.banUser}
              disabled={disableAccessToNonAdmin}
              handleOnChange={checked => handleOnChange(checked, record, "ban")}
            />
          </>
        );
      }
    },
    {
      title: "Top User",
      key: "topUser",
      render: (text, record) => (
        <>
          <MarkUserTop
            handleOnChange={checked => handleOnChange(checked, record, "mark")}
          />
        </>
      )
    }
  ];
  return <Table loading={loading} columns={columns} dataSource={data} />;
};

export default CustomTable;
