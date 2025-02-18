import React, { useState, useEffect, useMemo, SetStateAction } from "react";
import { ConfigProvider, Calendar, Modal, Form, Input, Checkbox, Divider, Select, DatePicker, theme, Badge } from "antd";
import { Button } from "antd";
import { addDoc, collection, doc, getDoc, getDocs, setDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import apiaryStore from "../stores/ApiaryStore";
import { db } from "../firebase/firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import dayjs from "dayjs";

// import "antd/dist/antd.css";

const CalendarApiariesPlans = () => {
  const { addPlans, apiariesList, getPlans } = apiaryStore;
  const { t } = useTranslation();
  const { token } = theme.useToken();
  const [form] = Form.useForm(); // Tworzenie instancji form
  const fetchEvents = async () => {
    const auth = getAuth();
    const userId = auth?.lastNotifiedUid;

    const querySnapshot = await getDocs(collection(db, "Users", userId, "Calendar"));
    const eventData = {};
    querySnapshot.forEach((doc) => {
      const data = doc.data();

      const date = data.date; // Date in YYYY-MM-DD format
      console.log("aaaaaaaaaaaaaaaaaaaa", data, eventData[date]);

      if (!eventData[date]) {
        eventData[date] = [];
      }
      eventData[date].push(data); // Store full data for modal use
    });

    setTasks(eventData); // Save organized data in state
  };
  useEffect(() => {
    fetchEvents();
  }, []);
  // useEffect(() => {
  //   getListData
  // }, [third])

  const getListData = (value: any) => {
    // // const clickedDate = new Date(value).toISOString();
    // const correctDate = dayjs(value).format("YYYY-MM-DD");

    // // const date = correctDate.format("YYYY-MM-DD");
    // console.log("eeeeeeeeeeeeeeeee", value, correctDate, tasks);
    // return tasks[correctDate] || [];
    console.log("Fetching data for date:", value);
    return tasks[value] || [];
  };
  const hives = [
    { label: "Dadana", value: "Dadana" },
    { label: "Wielkopolskie", value: "Wielkopolskie" },
  ];
  const types = [
    { label: "Success", value: "success" },
    { label: "Warning", value: "warning" },
    { label: "Error", value: "error" },
  ];
  // const navigate = useNavigate();

  const [selectedView, setSelectedView] = useState("day");
  const [dateFromCalendar, setDate] = useState<SetStateAction<null>>(null);
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [listData, setListDate] = useState([]);

  // const [selectedDate, setSelectedDate] = useState(new Date());
  // const setSelectedDate = (date: any, { source }: any) => {
  //   if (source === "date") {
  //     setEventModalOpen(true);
  //     const dateStr = date.format("YYYY-MM-DD");
  //     setDate(dateStr);
  //     const listData = getListData(date);
  //     setListDate(listData);
  //     console.log("Panel Select:", listData);
  //   }
  // };
  const setSelectedDate = (date: { format: (arg0: string) => any }, { source }: any) => {
    if (source === "date") {
      const dateStr = date.format("YYYY-MM-DD");
      setDate(dateStr);

      const eventDataForDate = tasks[dateStr] || []; // Get events for the selected date
      setListDate(eventDataForDate);

      // Ustaw dane w formularzu, jeśli istnieją
      if (eventDataForDate.length > 0) {
        const firstEvent = eventDataForDate[0]; // Example: load the first event into the modal
        form.setFieldsValue({
          completed: firstEvent.completed || false,
          apiary: firstEvent.apiary || undefined,
          hive: firstEvent.hive || undefined,
          type: firstEvent.type || undefined,
          content: firstEvent.content || "",
          from: firstEvent.from ? dayjs(firstEvent.from) : null,
          to: firstEvent.to ? dayjs(firstEvent.to) : null,
          fromHour: firstEvent.fromHour || "",
          toHour: firstEvent.toHour || "",
          description: firstEvent.description || "",
          addRemind: firstEvent.addRemind || false,
          remind: firstEvent.remind || undefined,
        });
      } else {
        // Reset form if no data for this date
        form.resetFields();
      }

      setEventModalOpen(true); // Open modal
    }
  };

  const [tasks, setTasks] = useState({});

  // const [disabled, setDisabled] = useState(false);
  const [disabledApiary, setDisabledApiary] = useState(false);
  const [disabledHive, setDisabledHive] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleDisable = (hive = false, apiary = false) => {
    setDisabledApiary(apiary);
    setDisabledHive(hive);
  };
  const onChange = (date: any, dateString: any) => {
    console.log(date, dateString);
  };

  const handleExternalSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const valuesWithDate = {
          ...values,
          date: dateFromCalendar,
        };
        addPlans(valuesWithDate);
        form.submit();
        fetchEvents();
      })
      .catch((errors) => {
        console.error("Błędy walidacji:", errors);
      });
  };
  return (
    <>
      {/* // <div */}
      {/* //   style={{ */}
      {/* //     display: "flex",
    //     flexDirection: "column",
    //     overflow: "auto",
    //     height: "100%",
    //   }}> */}
      <Calendar
        // style={{ flex: 1 }} // Ensure the calendar takes up available space
        onSelect={setSelectedDate}
        cellRender={(date) => {
          const dateStr = date.format("YYYY-MM-DD");
          const listData = getListData(dateStr);

          if (listData?.length === 0) {
            // Jeśli brak danych, nie renderuj nic
            return null;
          }

          return (
            <ul>
              {listData.map((item: { type: string; content: string }, index: number) => (
                <li key={index}>
                  <Badge status={item.type} text={item.content} />
                </li>
              ))}
            </ul>
          );
        }}
      />
      <Modal
        style={{ height: "80vh", top: "5vh" }}
        styles={{
          body: {
            maxHeight: "70vh",
            overflowY: "auto",
          },
        }}
        footer={[
          <Button key="back" onClick={() => setEventModalOpen(false)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={() => {
              setEventModalOpen(false);
              handleExternalSubmit();
              getPlans();
            }}>
            Save
          </Button>,
        ]}
        title="Add event"
        open={eventModalOpen}
        onClose={() => setEventModalOpen(false)}
        onOk={() => setEventModalOpen(false)}
        onCancel={() => setEventModalOpen(false)}>
        <Form name="basic" form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} style={{ maxWidth: 600 }} initialValues={{ remember: true }} autoComplete="off">
          <Form.Item label="Completed" name="completed">
            <Checkbox />
          </Form.Item>
          <Divider variant="dotted" style={{ borderColor: "#7cb305" }}>
            Category
          </Divider>
          <Button type="primary" size="small" onClick={() => toggleDisable()}>
            General
          </Button>
          <Button style={{ margin: "0 10px" }} type="primary" size="small" onClick={() => toggleDisable(false, true)}>
            Apiary
          </Button>
          <Button style={{ margin: "0 10px" }} type="primary" size="small" onClick={() => toggleDisable(true)}>
            Hive{" "}
          </Button>
          <Form.Item label="Apiary" name="apiary" rules={[{ required: !disabledApiary, message: "Please input your username!" }]}>
            <Select disabled={disabledApiary} options={apiariesList} />
          </Form.Item>
          <Form.Item label="Hive" name="hive" rules={[{ required: !disabledHive, message: "Please input your username!" }]}>
            <Select disabled={disabledHive} options={hives} />
          </Form.Item>
          <Divider variant="dotted" style={{ borderColor: "#7cb305" }}>
            Activity
          </Divider>
          <Form.Item label="Priority" name="type" rules={[{ required: false, message: "Please input your username!" }]}>
            <Select options={types} />
          </Form.Item>
          <Form.Item label="Title" name="content" rules={[{ required: false, message: "Please input your username!" }]}>
            <Input />
          </Form.Item>
          <Divider variant="dotted" style={{ borderColor: "#7cb305" }}>
            Duration
          </Divider>
          <Form.Item label="From" name="from" rules={[{ required: false, message: "Please input your username!" }]}>
            <DatePicker onChange={onChange} />
          </Form.Item>
          <Form.Item name="fromHour" rules={[{ required: false, message: "Please input your username!" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="To" name="to" rules={[{ required: false, message: "Please input your username!" }]}>
            <DatePicker onChange={onChange} />
          </Form.Item>
          <Form.Item label="toHour" name="toHour" rules={[{ required: false, message: "Please input your username!" }]}>
            <Input />
          </Form.Item>
          <Divider variant="dotted" style={{ borderColor: "#7cb305" }}>
            Note
          </Divider>
          <Form.Item label="Description" name="description">
            <Checkbox />
          </Form.Item>
          <Divider variant="dotted" style={{ borderColor: "#7cb305" }}>
            Reminder
          </Divider>
          <Form.Item label="Add remind" name="addRemind">
            <Checkbox />
          </Form.Item>
          <Form.Item label="Remind me" name="remind" rules={[{ required: false, message: "Please input your username!" }]}>
            <Select />
          </Form.Item>
          {/* <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please input your password!" }]}>
              <Input.Password />
            </Form.Item> */}
          {/* 
            <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
              <Checkbox>Remember me</Checkbox>
            </Form.Item> */}

          {/* <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item> */}
        </Form>
      </Modal>
    </>
    // </div>
  );
};

export default CalendarApiariesPlans;
