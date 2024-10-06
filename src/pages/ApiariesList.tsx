import React, { useEffect, useState } from "react";
import { Table, Input, Button, Select, Spin, Space, Tag, TableProps } from "antd";
import { observer } from "mobx-react-lite";
import apiaryStore from "../stores/ApiaryStore"; // Import Store
import { SearchOutlined, PlusOutlined, ReloadOutlined, ToolOutlined } from "@ant-design/icons";
import { withNamespaces } from "react-i18next";

import { cloneDeep } from "lodash";
import "../assets/styles/pages/_apiariesList.scss";
const { Option } = Select;
import i18n from "../../src/i18n.js";
import i18next from "i18next";
import { Link } from "react-router-dom";

type OnChange = NonNullable<TableProps<DataType>["onChange"]>;
type Filters = Parameters<OnChange>[1];

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

interface DataType {
  key: string;
  name: string;
  type: string;
  address: string;
  sun: number;
  hives: string;
}
interface ApiaryProps {
  t: any;
}
const ApiaryTable = observer(({ t }: ApiaryProps) => {
  // const { i18n } = useTranslation();

  const { dataApiary } = apiaryStore;
  useEffect(() => {
    // apiaryStore.getInitApiaryData();
  }, []);
  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});
  const columns: TableProps<DataType>["columns"] = [
    {
      // title: "Name",
      title: <h1>{t("Welcome to React")}</h1>,
      dataIndex: "name",
      key: "name",
      filters: [
        { text: "London", value: "London" },
        { text: "New York", value: "New York" },
      ],
      filteredValue: filteredInfo.address || null,
      onFilter: (value, record) => record.address.includes(value as string),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Sun exposure",
      key: "sun",
      dataIndex: "sun",
      // render: (_: any, { tags }: any) => (
      //   <>
      //     {tags.map((tag: any) => {
      //       let color = tag.length > 5 ? "geekblue" : "green";
      //       if (tag === "loser") {
      //         color = "volcano";
      //       }
      //       return (
      //         <Tag color={color} key={tag}>
      //           {tag.toUpperCase()}
      //         </Tag>
      //       );
      //     })}
      //   </>
      // ),
    },
    {
      title: "Hives",
      key: "hives",
      dataIndex: "hives",
      // render: (_: any, { tags }: any) => (
      //   <>
      //     {tags.map((tag: any) => {
      //       let color = tag.length > 5 ? "geekblue" : "green";
      //       if (tag === "loser") {
      //         color = "volcano";
      //       }
      //       return (
      //         <Tag color={color} key={tag}>
      //           {tag.toUpperCase()}
      //         </Tag>
      //       );
      //     })}
      //   </>
      // ),
    },
    {
      title: "Action",
      key: "action",
      render: (
        _: any,
        record: {
          name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined;
          key: number | string;
        }
      ) => {
        console.log("record", record);
        return (
          <Space size="middle">
            <a>Invite {record.name}</a>
            <a>Delete</a>
            <Link
              to={`/${i18next.language}/apiaries/${record.key}/edit`}
              onClick={() => {
                apiaryStore.idApiary = record.key;
              }}>
              Edit
            </Link>
          </Space>
        );
      },
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      name: "Apiary Pierzchały",
      type: "Migratory",
      address: "New York No. 1 Lake Park",
      sun: 20,
      hives: "Wielkopolskie",
    },
    {
      key: "2",
      name: "Apiary Kadyny",
      type: "Migratory",
      address: "London No. 1 Lake Park",
      sun: 60,
      hives: "Wielkopolskie",
    },
    {
      key: "3",
      name: "Apiary 2",
      type: "Migratory",
      address: "Sydney No. 1 Lake Park",
      sun: 30,
      hives: "Wielkopolskie",
    },
  ];

  const handleChange: OnChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter as Sorts);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  const setAgeSort = () => {
    setSortedInfo({
      order: "descend",
      columnKey: "age",
    });
  };

  // const columns = [
  //   {
  //     title: "Nazwa",
  //     dataIndex: "name",
  //     key: "name",
  //   },
  //   {
  //     title: "Akcje",
  //     key: "actions",
  //     render: (_: any, record: any) =>
  //       apiaryStore.permissionshowRemoveAndEditIcons && (
  //         <div>
  //           <Button type="link" icon={<ToolOutlined />} onClick={() => apiaryStore.removeApiary(record.id)}>
  //             Usuń
  //           </Button>
  //         </div>
  //       ),
  //   },
  // ];

  return (
    <div>
      <div style={{ marginBottom: "16px", display: "flex", gap: "10px", paddingTop: "100px" }}>
        {/* Pole do wyszukiwania */}
        <Input placeholder="Szukaj" value={apiaryStore.filter} onChange={(e) => apiaryStore.setFilter(e.target.value)} prefix={<SearchOutlined />} style={{ width: "200px" }} />

        {/* Dropdown z pasiekami */}
        {/* <Select style={{ width: 200 }} placeholder="Wybierz pasiekę" onChange={(value) => apiaryStore.selectApiary(value)}>
          {apiaryStore.dataApiary.map((apiary: any) => (
            <Option key={apiary.id} value={apiary.id}>
              {apiary.name}
            </Option>
          ))}
        </Select> */}
        {/* odkomentuję to wyzejjak juz dane będa pochodizły z backendu */}
        <Select
          style={{ width: 200 }}
          placeholder="Wybierz pasiekę"
          onChange={(value) => apiaryStore.selectApiary(value)}
          options={[
            { value: "Pierzchały", label: "p" },
            { value: "Kadyny", label: "k" },
            { value: "Czechowo", label: "c" },
          ]}></Select>

        {/* Przycisk reset */}
        <Button onClick={apiaryStore.resetSelectedData} icon={<ReloadOutlined />}>
          Reset
        </Button>

        {/* Przycisk do dodania */}
        <Button type="primary" icon={<PlusOutlined />}>
          <Link
            to={`/${i18next.language}/apiaries/create`}
            onClick={() => {
              apiaryStore.idApiary = null;
            }}>
            Dodaj Pasiekę
          </Link>
        </Button>

        {/* Przycisk do przełączania widoczności ikon */}
        <Button onClick={apiaryStore.toggleIconsVisibility} icon={<ToolOutlined />}>
          Pokaż Ikony
        </Button>
      </div>
      <Table columns={columns} dataSource={dataApiary} />
      {/* Tabela */}
      {/* {apiaryStore.loading ? <Spin /> : <Table dataSource={cloneDeep(apiaryStore.dataApiary)} columns={columns} rowKey="id" />} */}
    </div>
  );
});

export default withNamespaces()(ApiaryTable);
