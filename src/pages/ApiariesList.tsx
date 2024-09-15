import React, { useEffect } from "react";
import { Table, Input, Button, Select, Spin } from "antd";
import { observer } from "mobx-react-lite";
import apiaryStore from "../stores/ApiaryStore"; // Import Store
import { SearchOutlined, PlusOutlined, ReloadOutlined, ToolOutlined } from "@ant-design/icons";
import { cloneDeep } from "lodash";
const { Option } = Select;

const ApiaryTable = observer(() => {
  useEffect(() => {
    // apiaryStore.getInitApiaryData();
  }, []);

  const columns = [
    {
      title: "Nazwa",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Akcje",
      key: "actions",
      render: (_, record: any) =>
        apiaryStore.permissionshowRemoveAndEditIcons && (
          <div>
            <Button type="link" icon={<ToolOutlined />} onClick={() => apiaryStore.removeApiary(record.id)}>
              Usuń
            </Button>
          </div>
        ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: "16px", display: "flex", gap: "10px" }}>
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
          Dodaj Pasiekę
        </Button>

        {/* Przycisk do przełączania widoczności ikon */}
        <Button onClick={apiaryStore.toggleIconsVisibility} icon={<ToolOutlined />}>
          Pokaż Ikony
        </Button>
      </div>

      {/* Tabela */}
      {/* {apiaryStore.loading ? <Spin /> : <Table dataSource={cloneDeep(apiaryStore.dataApiary)} columns={columns} rowKey="id" />} */}
    </div>
  );
});

export default ApiaryTable;
