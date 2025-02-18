// CreateApiary.tsx
import React, { useEffect, useState, createContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Spin } from "antd";
// import FormWrapperCreateApiary from "./FormWrapperCreateApiary";
import apiaryStore from "../stores/ApiaryStore";
// import styles from "./CreateApiary.module.scss";
import "../assets/styles/main.scss";
import FormWrapperCreateApiary from "../organism/FormWrapperBuildApiary";
import { foragesOptions, sunOptions, typeOptions } from "../constant/dataInput";
import { ApiaryData } from "../interfaces/apiary";
// Kontekst do udostępniania stanu
export const PermissionContext = createContext<boolean | undefined>(undefined);

interface CreateApiaryProps {
  idChosenApiary?: string;
  apiary?: string[];
  edit?: boolean;
}

// const CreateApiary: React.FC<CreateApiaryProps> = ({ idChosenApiary, apiary }) => {
const CreateApiary: React.FC<CreateApiaryProps> = ({ edit }) => {
  const { addApiary, updateApiaryData, idChosenApiary, editedApiary } = apiaryStore;

  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();
  const [permissionToValidate, setPermissionToValidate] = useState(false);
  const [form] = Form.useForm();

  // const [modalVisible, setModalVisible] = useState(false);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [country, setCountry] = useState(null);
  const [city, setCity] = useState(null);
  const [zip, setZip] = useState(null);
  const [address, setAddress] = useState(null);
  const [description, setDescription] = useState(null);
  const [name, setName] = useState(null);
  const [forages, setForages] = useState(null);
  const [type, setType] = useState(null);
  const [sun, setSun] = useState(null);
  const [hives, setHives] = useState(null);
  // const w = async () => {
  //   console.log("idididididid", selectedApiary);

  //   await getApiary(id);
  // };
  // useEffect(() => {
  //   w();
  // }, []);

  useEffect(() => {
    // getApiary(id);
    console.log("rrrrrrrrrrrrrrrrr1", editedApiary);

    // if (editedApiary) {
    //   // const apiaryData = dataApiaries.filter((apiary: Apiary) => apiary.id === id)[0];
    //   // const apiaryData = apiary[0];
    //   // idChosenApiary
    //   console.log("rrrrrrrrrrrrrrrrr", editedApiary);
    //   setLat(editedApiary.lat);
    //   setLng(editedApiary.lng);
    //   setHives(editedApiary.hives);
    //   setCountry(editedApiary.country);
    //   setCity(editedApiary.city);
    //   setZip(editedApiary.zip);
    //   setAddress(editedApiary.address);
    //   setName(editedApiary.name);
    //   setForages(editedApiary.forages);
    //   setType(editedApiary.type);
    //   setSun(editedApiary.sun);
    //   setDescription(editedApiary.description);
    // }
    return () => {
      // editedApiary = null;
      onReset();
    };
  }, []);

  const onSubmit = async (data: ApiaryData) => {
    console.log("data");

    // console.log("data", editedApiary, data);

    !editedApiary && (await addApiary(data));

    if (editedApiary) {
      data.identifier = editedApiary.identifier;
      // const updatedApiary = { data, identifier: editedApiary.identifier };
      await updateApiaryData(data);
    }
    comeBackToApiariesList();
    // apiaryStore.getInitApiaryData();
    // const formData = {
    //   lat,
    //   lng,
    //   hives,
    //   country,
    //   city,
    //   zip,
    //   address,
    //   name,
    //   forages,
    //   type,
    //   sun,
    //   description,
    // };

    // Replace the following with your actual API calls
    // const dataSended = apiary.length ? await apiaryStore.updateApiaryData(formData, id) : await apiaryStore.addApiaryData(formData);

    // if (dataSended) {
    //   history.push(`/${sessionStorage.getItem("currentLang")?.toLowerCase()}/apiaries`);
    //   onReset();
    // }
  };

  const onReset = () => {
    setLat(null);
    setLng(null);
    setHives(null);
    setCountry(null);
    setCity(null);
    setZip(null);
    setAddress(null);
    setName(null);
    setForages(null);
    setType(null);
    setSun(null);
    setDescription(null);
    form.resetFields();
  };

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
      <Form form={form} onFinish={onSubmit} onReset={onReset} className="form-wrapper-create-apiary">
        <div className="wrapeerCreateApiary">
          <div className="createApiary">
            <div>
              {/* form="myForm" onClick={handleSubmit} */}
              <Button type="primary" htmlType="submit" style={{ marginRight: "8px" }}>
                {editedApiary ? "Update" : "Create"}
              </Button>
              <Button onClick={comeBackToApiariesList} type="text" style={{ background: "none", color: "#000000" }}>
                Cancel
              </Button>
            </div>
          </div>
          <div className="scrollArea">
            <Spin spinning={false}>
              <FormWrapperCreateApiary id={idChosenApiary} editedApiary={editedApiary} form={form} />
            </Spin>
          </div>
        </div>
      </Form>
    </PermissionContext.Provider>
  );
};

export default CreateApiary;
