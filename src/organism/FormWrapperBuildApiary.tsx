import React, { useState, useEffect } from "react";
import { Form, Input, InputNumber, Button, Select, Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";

// import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ModalHeaderContent from "./ModalHeaderContent";
import { foragesOptions, sunOptions, typeOptions } from "../constant/dataInput";
import "../assets/styles/main.scss";
import { Apiary, ApiaryData, ApiaryElement } from "../interfaces/apiary";
import apiaryStore from "../stores/ApiaryStore";
const { TextArea } = Input;
interface FormWrapperBuildApiaryProps {
  apiary: any;
  id: number;
  t: any;
  editedApiary?: Apiary;
  form: any;
}
const FormWrapperBuildApiary = observer(({ apiary = [], id, editedApiary, form }) => {
  const { t } = useTranslation();
  // const history = useHistory();
  const { addApiary, apiariesList, selectedApiary, dataApiaries } = apiaryStore;
  // const [form] = Form.useForm();

  const [modalVisible, setModalVisible] = useState(false);
  const [isReadyToGetCoordinate, setReadyToGetCoordinate] = useState(false);

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
      editedApiary = null;
      onReset();
    };
  }, []);

  // const onSubmit = async (data: ApiaryData) => {
  //   await addApiary(data);
  //   console.log("data", data);
  //   // const formData = {
  //   //   lat,
  //   //   lng,
  //   //   hives,
  //   //   country,
  //   //   city,
  //   //   zip,
  //   //   address,
  //   //   name,
  //   //   forages,
  //   //   type,
  //   //   sun,
  //   //   description,
  //   // };

  //   // Replace the following with your actual API calls
  //   // const dataSended = apiary.length ? await apiaryStore.updateApiaryData(formData, id) : await apiaryStore.addApiaryData(formData);

  //   // if (dataSended) {
  //   //   history.push(`/${sessionStorage.getItem("currentLang")?.toLowerCase()}/apiaries`);
  //   //   onReset();
  //   // }
  // };

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

  const setCoordinates = (coordinates) => {
    console.log("coordinates", coordinates);
    // const { lat: latitude, lng: longitude } = coordinates;
    setLat(() => coordinates.lat);
    setLng(() => coordinates.lng || coordinates.lon);
    form.setFieldsValue({ lat: coordinates.lat, lng: coordinates.lng || coordinates.lon });
    setModalVisible(false);
  };

  return (
    <div>
      {/* <Form form={form} onFinish={onSubmit} onReset={onReset} className="form-wrapper-create-apiary"> */}
      <h2>{t("formHeaders.general")}</h2>
      <div className="border">
        <div>
          <Form.Item label="Name" name="name" initialValue={editedApiary?.name}>
            <Input placeholder="Enter apiary name." value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Item>

          <Form.Item label="Forages" name="forages" initialValue={editedApiary?.forages}>
            {/* <Select placeholder="Select forages." options={foragesOptions} value={forages} onChange={(value) => setForages(value)} /> */}
            <Select placeholder="Select forages." mode="tags" onChange={(value) => setForages(value)} tokenSeparators={[","]} options={foragesOptions} />
          </Form.Item>

          <Form.Item label="Type" name="type" initialValue={editedApiary?.type}>
            <Select placeholder="Select type." options={typeOptions} value={type} onChange={(value) => setType(value)} />
          </Form.Item>

          <Form.Item label="Sun Exposure" name="sun" initialValue={editedApiary?.sun}>
            <Select placeholder="Select sun exposure." options={sunOptions} value={sun} onChange={(value) => setSun(value)} />
          </Form.Item>

          <Form.Item label="Hives" name="hives" initialValue={editedApiary?.hives}>
            <InputNumber placeholder="Number of hives." value={hives} onChange={(value) => setHives(value)} />
          </Form.Item>

          <Form.Item label="Description" name="description" initialValue={editedApiary?.description}>
            <TextArea placeholder="Enter description." value={description} onChange={(e) => setDescription(e.target.value)} />
          </Form.Item>
        </div>
      </div>

      <h2>{t("formHeaders.address")}</h2>
      <div className="border">
        <div>
          <Form.Item label="Address" name="address" initialValue={editedApiary?.address}>
            <Input placeholder="Enter address." value={address} onChange={(e) => setAddress(e.target.value)} />
          </Form.Item>

          <Form.Item label="Zip" name="zip" initialValue={editedApiary?.zip}>
            <Input placeholder="Enter zip code." value={zip} onChange={(e) => setZip(e.target.value)} />
          </Form.Item>

          <Form.Item label="City" name="city" initialValue={editedApiary?.city}>
            <Input placeholder="Enter city." value={city} onChange={(e) => setCity(e.target.value)} />
          </Form.Item>

          <Form.Item label="Country" name="country" initialValue={editedApiary?.country}>
            <Input placeholder="Enter country." value={country} onChange={(e) => setCountry(e.target.value)} />
          </Form.Item>
        </div>
      </div>

      <h2>{t("formHeaders.mapCoordinates")}</h2>
      <div className="border">
        <div>
          <div>{lat}</div>
          <Form.Item label="Latitude" name="lat" initialValue={editedApiary?.lat}>
            <InputNumber placeholder="Enter latitude." value={lat} onChange={(value) => setLat(value)} addonAfter={<CloseOutlined onClick={() => setLat(null)} />} />
          </Form.Item>
          <div>{lng}</div>

          <Form.Item label="Longitude" name="lng" initialValue={editedApiary?.lng}>
            <InputNumber placeholder="Enter longitude." value={lng} onChange={(value) => setLng(value)} addonAfter={<CloseOutlined onClick={() => setLng(null)} />} />
          </Form.Item>
        </div>
      </div>

      {/* <Form.Item className="form-buttons">
          <Button type="primary" htmlType="submit">
            {t("Submit")}
          </Button>
          <Button htmlType="reset">{t("Reset")}</Button>
        </Form.Item> */}
      {/* </Form> */}

      <div className="create-apiary-buttons">
        <Button
          icon={<img src="../../assets/images/icons8-arrow-50.png" alt="Get coordinates" />}
          onClick={async () => {
            // fetch(`https://nominatim.openstreetmap.org/search?country=${countryName}&format=json`)
            console.log("rrrrrrrrrrrrrrrrrrrrr", city, country);
            if ((city || editedApiary.city) && (country || editedApiary.country)) {
              const cityName = encodeURIComponent(city || editedApiary.city);
              const countryName = encodeURIComponent(country || editedApiary.country);

              fetch(`https://nominatim.openstreetmap.org/search?city=${cityName}&country=${countryName}&format=json`)
                .then((response) => response.json())
                .then((data) => {
                  const { lat, lon } = data[0];
                  setCoordinates(data[0]);
                  console.log(`Latitude: ${lat}, Longitude: ${lon}`);
                });
            } else {
              setReadyToGetCoordinate(true);
            }

            /* Implement getCoordinates functionality */
          }}>
          {t("Get coordinates")}
        </Button>
        <Button icon={<img src="../../assets/images/icons8-candy-50.png" alt="Select coordinates" />} onClick={() => setModalVisible(true)}>
          {t("Select coordinates")}
        </Button>
      </div>

      <Modal
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          // setCoordinates({ lat: null, lng: null });
        }}
        footer={null}>
        <ModalHeaderContent setCoordinates={(coordinates) => setCoordinates(coordinates)} coordinates={{ lat, lng }} />
      </Modal>
      <Modal visible={isReadyToGetCoordinate && (!city || !country)} onCancel={() => setReadyToGetCoordinate(false)} footer={null}>
        <div>No country and city</div>
        {/* <ModalHeaderContent setCoordinates={(coordinates) => setCoordinates(coordinates)} /> */}
      </Modal>
    </div>
  );
});

export default FormWrapperBuildApiary;
