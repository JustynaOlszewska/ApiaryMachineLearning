import React, { useState, useEffect } from "react";
import { Form, Input, InputNumber, Button, Select, Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { withNamespaces } from "react-i18next";

// import { useHistory } from "react-router-dom";
// import { useTranslation } from "react-i18next";
import ModalHeaderContent from "./ModalHeaderContent";
import { foragesOptions, sunOptions, typeOptions } from "../constant/dataInput";
import "../assets/styles/main.scss";

const { TextArea } = Input;
interface FormWrapperBuildApiaryProps {
  apiary: any;
  id: number;
  t: any;
}
const FormWrapperBuildApiary = observer(({ apiary = [], id, t }) => {
  // const { t } = useTranslation();
  // const history = useHistory();
  const [form] = Form.useForm();

  const [modalVisible, setModalVisible] = useState(false);
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

  useEffect(() => {
    if (apiary.length > 0) {
      const apiaryData = apiary[0];
      setLat(apiaryData.lat);
      setLng(apiaryData.lng);
      setHives(apiaryData.hives);
      setCountry(apiaryData.country);
      setCity(apiaryData.city);
      setZip(apiaryData.zip);
      setAddress(apiaryData.address);
      setName(apiaryData.name);
      setForages(apiaryData.forages);
      setType(apiaryData.type);
      setSun(apiaryData.sun);
      setDescription(apiaryData.description);
    }
  }, [apiary]);

  const onSubmit = async () => {
    const formData = {
      lat,
      lng,
      hives,
      country,
      city,
      zip,
      address,
      name,
      forages,
      type,
      sun,
      description,
    };

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

  const setCoordinates = (coordinates) => {
    const { lat: latitude, lng: longitude } = coordinates;
    setLat(latitude);
    setLng(longitude);
  };

  return (
    <div>
      <Form form={form} onFinish={onSubmit} onReset={onReset} className="form-wrapper-create-apiary">
        <h2>{t("formHeaders.general")}</h2>
        <div className="border">
          <div>
            <Form.Item label="Name" name="name" initialValue={name}>
              <Input placeholder="Enter apiary name." value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Item>

            <Form.Item label="Forages" name="forages" initialValue={forages}>
              <Select placeholder="Select forages." options={foragesOptions} value={forages} onChange={(value) => setForages(value)} />
            </Form.Item>

            <Form.Item label="Type" name="type" initialValue={type}>
              <Select placeholder="Select type." options={typeOptions} value={type} onChange={(value) => setType(value)} />
            </Form.Item>

            <Form.Item label="Sun Exposure" name="sun" initialValue={sun}>
              <Select placeholder="Select sun exposure." options={sunOptions} value={sun} onChange={(value) => setSun(value)} />
            </Form.Item>

            <Form.Item label="Hives" name="hives" initialValue={hives}>
              <InputNumber placeholder="Number of hives." value={hives} onChange={(value) => setHives(value)} />
            </Form.Item>

            <Form.Item label="Description" name="description" initialValue={description}>
              <TextArea placeholder="Enter description." value={description} onChange={(e) => setDescription(e.target.value)} />
            </Form.Item>
          </div>
        </div>

        <h2>{t("formHeaders.address")}</h2>
        <div className="border">
          <div>
            <Form.Item label="Address" name="address" initialValue={address}>
              <Input placeholder="Enter address." value={address} onChange={(e) => setAddress(e.target.value)} />
            </Form.Item>

            <Form.Item label="Zip" name="zip" initialValue={zip}>
              <Input placeholder="Enter zip code." value={zip} onChange={(e) => setZip(e.target.value)} />
            </Form.Item>

            <Form.Item label="City" name="city" initialValue={city}>
              <Input placeholder="Enter city." value={city} onChange={(e) => setCity(e.target.value)} />
            </Form.Item>

            <Form.Item label="Country" name="country" initialValue={country}>
              <Input placeholder="Enter country." value={country} onChange={(e) => setCountry(e.target.value)} />
            </Form.Item>
          </div>
        </div>

        <h2>{t("formHeaders.mapCoordinates")}</h2>
        <div className="border">
          <div>
            <Form.Item label="Latitude" name="lat" initialValue={lat}>
              <InputNumber placeholder="Enter latitude." value={lat} onChange={(value) => setLat(value)} addonAfter={<CloseOutlined onClick={() => setLat(null)} />} />
            </Form.Item>

            <Form.Item label="Longitude" name="lng" initialValue={lng}>
              <InputNumber placeholder="Enter longitude." value={lng} onChange={(value) => setLng(value)} addonAfter={<CloseOutlined onClick={() => setLng(null)} />} />
            </Form.Item>
          </div>
        </div>

        <Form.Item className="form-buttons">
          <Button type="primary" htmlType="submit">
            {t("Submit")}
          </Button>
          <Button htmlType="reset">{t("Reset")}</Button>
        </Form.Item>
      </Form>

      <div className="create-apiary-buttons">
        <Button
          icon={<img src="../../assets/images/icons8-arrow-50.png" alt="Get coordinates" />}
          onClick={() => {
            /* Implement getCoordinates functionality */
          }}>
          {t("Get coordinates")}
        </Button>
        <Button icon={<img src="../../assets/images/icons8-candy-50.png" alt="Select coordinates" />} onClick={() => setModalVisible(true)}>
          {t("Select coordinates")}
        </Button>
      </div>

      <Modal visible={modalVisible} onCancel={() => setModalVisible(false)} footer={null}>
        <ModalHeaderContent setCoordinates={setCoordinates} />
      </Modal>
    </div>
  );
});

export default withNamespaces()(FormWrapperBuildApiary);
