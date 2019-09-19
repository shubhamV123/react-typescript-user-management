import * as React from "react";
import { Table, Input, Row, Col } from "antd";
import BlockUser from "./BlockUser";
import MarkUserTop from "./MarkUserTop";
import { LayoutContext } from "../../Provider/LayoutProvider";

const { useContext } = React;

interface CustomTableProps {
  loading?: boolean;
  data?: any;
}
const CustomTable: React.FC<CustomTableProps> = ({ loading, data }) => {
  const layoutContext = useContext(LayoutContext);
  const { toggleSwitch, searchUser } = layoutContext;
  const handleOnChange = (checked: boolean, id: number, type: string) => {
    toggleSwitch(checked, id, type);
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
      render: (_: any, record: any) => {
        const disableAccessToNonAdmin =
          localStorage.getItem("userType") === "admin"
            ? false
            : record.userType === "admin" && record.banUser;

        return (
          <>
            <BlockUser
              active={record.banUser}
              disabled={disableAccessToNonAdmin}
              handleOnChange={(checked: boolean) =>
                handleOnChange(checked, record.id, "banUser")
              }
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
            active={record.markTopUser}
            handleOnChange={(checked: boolean) =>
              handleOnChange(checked, record.id, "markTopUser")
            }
          />
        </>
      )
    }
  ];

  return (
    <>
      <Row>
        <Col span={8}>
          {" "}
          <Input
            placeholder="Search with email or name"
            allowClear
            onChange={searchUser}
          />
        </Col>
      </Row>

      <Table
        className={"custom-table"}
        rowKey="name"
        loading={loading}
        columns={columns}
        dataSource={data}
      />
    </>
  );
};

export default CustomTable;
