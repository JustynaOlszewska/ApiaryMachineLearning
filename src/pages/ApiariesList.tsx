import React, { useEffect, useState } from "react";
import { Table, Input, Button, Select, Space, TableProps, Flex } from "antd";
import { observer } from "mobx-react-lite";
import apiaryStore from "../stores/ApiaryStore"; // Import Store
import { SearchOutlined, PlusOutlined, ReloadOutlined, ToolOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { filter } from "lodash";
import "../assets/styles/main.scss";
// import i18n from "../../src/i18n.js";
import i18next from "i18next";
import { Link } from "react-router-dom";
import { Apiary, ApiaryElement, ApiaryData } from "../interfaces/apiary";

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
const ApiaryTable = observer(() => {
  const { t } = useTranslation();

  const { dataApiaries, apiariesList, selectedApiary, setSelectedApiary } = apiaryStore;

  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});
  const [apiaries, setApiaries] = useState<ApiaryData[]>([]);
  const [filteredValue, setFilteredValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setApiaries(() => {
      const r = filter(dataApiaries, (apiary: Apiary) => {
        // console.log("apiaryyyyyy", apiary.id, selectedApiary, apiary.id === selectedApiary);
        return apiary.id === selectedApiary || !selectedApiary;
      });
      return filter(r, (y) => {
        return y.name.includes(filteredValue);
      });
    });
  }, [selectedApiary, filteredValue, dataApiaries]);

  const columns: TableProps<DataType>["columns"] = [
    {
      // title: <h1>{t("Welcome to React")}</h1>,
      title: t("apiaries.table.name"),
      dataIndex: "name",
      key: "name",
      // filters: [
      //   { text: "London", value: "London" },
      //   { text: "New York", value: "New York" },
      // ],
      // filteredValue: filteredInfo.address || null,
      // onFilter: (value, record) => record.address.includes(value as string),
      // sorter: (a, b) => a.name.length - b.name.length,
      // sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: t("apiaries.table.address"),
      dataIndex: "address",
      key: "address",
    },
    {
      title: t("apiaries.table.type"),
      dataIndex: "type",
      key: "type",
    },
    {
      title: t("apiaries.table.sun"),
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
      title: t("apiaries.table.hives"),
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
      title: t("apiaries.table.action"),
      key: "action",
      render: (
        _: any,
        record: {
          name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined;
          key: number | string;
        }
      ) => {
        return (
          <Space size="middle">
            {/* <a>Invite {record.name}</a> */}
            <Button
              onClick={() => {
                apiaryStore.deleteApiary(record.identifier);
                // apiaryStore.getInitApiaryData();
              }}>
              {t("apiaries.table.delete")}
            </Button>
            <Link
              to={`/${i18next.language}/apiaries/${record.id}/edit`}
              onClick={() => {
                console.log("record", record);

                apiaryStore.idChosenApiary = record.key;
                apiaryStore.editedApiary = record;
              }}>
              {t("apiaries.table.edit")}
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
  const selectApiary = (apiary: ApiaryElement) => {
    setSelectedApiary(apiary);
  };
  const setFilter = (value: string) => {
    setFilteredValue(value);
    // setFilteredList(() => {
    //   return filter(apiaries, (apiary) => {
    //     return apiary.name.includes(value);
    //   });
    // });
  };
  return (
    <div>
      <div style={{ marginBottom: "16px", display: "flex", gap: "10px" }}>
        {/* Pole do wyszukiwania */}
        {/* value={apiaryStore.filter}  */}
        <Input placeholder="Szukaj" value={filteredValue} onChange={(e) => setFilter(e.target.value)} prefix={<SearchOutlined />} style={{ width: "200px" }} />

        {/* Dropdown z pasiekami */}
        {/* <Select style={{ width: 200 }} placeholder="Wybierz pasiekę" onChange={(value) => apiaryStore.selectApiary(value)}>
          {apiaryStore.dataApiaries.map((apiary: any) => (
            <Option key={apiary.id} value={apiary.id}>
              {apiary.name}
            </Option>
          ))}
        </Select> */}
        {/* odkomentuję to wyzejjak juz dane będa pochodizły z backendu */}
        <Select allowClear style={{ width: 200 }} placeholder={t("apiaryList.chooseApiary")} onChange={(value) => selectApiary(value)} options={apiariesList} value={selectedApiary}></Select>

        {/* Przycisk reset */}
        <Button
          onClick={() => {
            setFilteredValue("");
            selectApiary(null);
            apiaryStore.resetSelectedData;
          }}
          icon={<ReloadOutlined />}>
          {t("apiaries.reset")}
        </Button>

        {/* Przycisk do dodania */}
        <Button type="primary" icon={<PlusOutlined />}>
          <Link
            to={`/${i18next.language}/apiaries/create`}
            onClick={() => {
              apiaryStore.idChosenApiary = null;
              apiaryStore.editedApiary = null;
            }}>
            {t("apiaries.add")}
          </Link>
        </Button>

        {/* Przycisk do przełączania widoczności ikon */}
        <Button onClick={apiaryStore.toggleIconsVisibility} icon={<ToolOutlined />}>
          {t("apiaries.showIcon")}
        </Button>
      </div>
      <Flex>
        <Table columns={columns} dataSource={apiaries} loading={loading} scroll={{ y: 55 * 5 }} pagination={{ pageSize: 5 }} />
      </Flex>
      {/* Tabela */}
      {/* {apiaryStore.loading ? <Spin /> : <Table dataSource={cloneDeep(apiaryStore.dataApiaries)} columns={columns} rowKey="id" />} */}
    </div>
  );
});

export default ApiaryTable;
