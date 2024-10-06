// CreateApiary.tsx
import React, { useEffect, useState, createContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Spin } from "antd";
// import FormWrapperCreateApiary from "./FormWrapperCreateApiary";
import apiaryStore from "../stores/ApiaryStore";
// import styles from "./CreateApiary.module.scss";
import "../assets/styles/main.scss";
import FormWrapperCreateApiary from "../organism/FormWrapperBuildApiary";
// Kontekst do udostępniania stanu
export const PermissionContext = createContext<boolean | undefined>(undefined);

interface CreateApiaryProps {
  idApiary?: string;
  apiary?: string[];
  edit: boolean;
}

// const CreateApiary: React.FC<CreateApiaryProps> = ({ idApiary, apiary }) => {
const CreateApiary: React.FC<CreateApiaryProps> = ({ edit }) => {
  const { idApiary } = apiaryStore;
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();
  const [permissionToValidate, setPermissionToValidate] = useState(false);

  const comeBackToApiariesList = () => {
    const currentLang = sessionStorage.getItem("currentLang")?.toLowerCase() || lang || "pl";
    navigate(`/${currentLang}/apiaries`);
  };

  const handleSubmit = () => {
    // Implementuj logikę zapisu tutaj
    setPermissionToValidate(true);
  };

  useEffect(() => {
    setPermissionToValidate(false);
    // Resetowanie formularza, jeśli jest potrzebne
  }, []);

  return (
    <PermissionContext.Provider value={permissionToValidate}>
      <div className="wrapeerCreateApiary">
        <div className="createApiary">
          <div>
            <Button type="primary" htmlType="submit" form="myForm" onClick={handleSubmit} style={{ marginRight: "8px" }}>
              {idApiary ? "Save" : "Create"}
            </Button>
            <Button onClick={comeBackToApiariesList} type="text" style={{ background: "none", color: "#000000" }}>
              Cancel
            </Button>
          </div>
        </div>
        <div className="scrollArea">
          <Spin spinning={false}>
            <FormWrapperCreateApiary apiary={apiary} id={idApiary} />
          </Spin>
        </div>
      </div>
    </PermissionContext.Provider>
  );
};

export default CreateApiary;
