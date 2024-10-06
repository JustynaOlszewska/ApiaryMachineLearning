// LanguageSelector.js
import React, { useState, useEffect } from "react";
import { Select, Row } from "antd";
import { useNavigate, useParams } from "react-router-dom";

// import { useTranslation } from "react-i18next";
// import { options } from "./dataForm"; // Import your options array
// import { useApiaryStore } from "./apiaryStore"; // Custom store hook
import i18n from "../../src/i18n.js";
import imgUrlUnited from "/assets/images/united-kingdom.png";
import imgUrlUnitedPoland from "/assets/images/icons8-poland-30.png";
const { Option } = Select;

const LanguageSelector = () => {
  const [backgroundColorInInput, setBackgroundColorInInput] = useState(false);
  const [model, setModel] = useState("pl");
  const navigate = useNavigate();
  const { lang } = useParams();

  // const { i18n } = useTranslation();
  // const apiaryStore = useApiaryStore();

  // useEffect(() => {
  //   // Set default language
  //   const defaultLang = sessionStorage.getItem("currentLang")?.toUpperCase() || i18n.language.toUpperCase();
  //   setModel(defaultLang);

  //   // Hide the current language in options
  //   options.forEach((el) => {
  //     el.hide = el.value === lang?.toUpperCase();
  //   });

  //   if (i18n.language) {
  //     const currentLang = sessionStorage.getItem("currentLang");
  //     if (currentLang) {
  //       i18n.changeLanguage(currentLang);
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const onFocusInput = () => {
    setBackgroundColorInInput(!backgroundColorInInput);
  };
  const changeLanguage = (lng: string) => {
    console.log("language", lng);
    setModel(lng);
    i18n.changeLanguage(lng);
    const newPathname = location.pathname.replace(`/${lang}`, `/${lng}`);
    navigate(newPathname + location.search);
  };
  // const handleChange = (value) => {
  //   setModel(value);
  //   options.forEach((el) => {
  //     el.hide = el.value === value;
  //   });
  //   i18n.changeLanguage(value.toLowerCase());
  //   apiaryStore.setCurrentLang(value.toUpperCase());
  //   navigate(`/${value.toLowerCase()}${window.location.pathname.slice(3)}`);
  //   setBackgroundColorInInput(false);
  // };
  // dataForm.js
  const options = [
    {
      value: "en",
      label: "English",
      // icon: "/path/to/english-flag.png",
      icon: "/assets/images/united-kingdom.png",
      description: "English Language",
      hide: false,
    },
    {
      value: "pl",
      label: "Polski",
      // icon: "/path/to/polish-flag.png",
      icon: "/assets/images/icons8-poland-30.png",
      description: "Język Polski",
      hide: false,
    },
    // Add more languages as needed
  ];

  return (
    <Row justify="end" onClick={onFocusInput}>
      <Select
        value={model}
        onChange={changeLanguage}
        style={{
          width: 120,
          backgroundColor: backgroundColorInInput ? "brown" : "#ffb74d",
          color: "white",
        }}
        dropdownStyle={{ color: "white" }}>
        {options
          .filter((opt) => !opt.hide)
          .map((opt) => (
            <Option key={opt.value} value={opt.value}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img src={opt.icon} alt="flag" style={{ width: 20, marginRight: 8 }} />
                <div>
                  <div>{opt.label}</div>
                  {/* <div style={{ fontSize: "12px" }}>{opt.description}</div> */}
                </div>
              </div>
            </Option>
          ))}
      </Select>
    </Row>
  );
};

export default LanguageSelector;

// import React from "react";

// // interface Props {

// // }

// const SelectLang = () => {
//   return <div>SelectLang</div>;
// };

// export default SelectLang;

// {
//   /* <template>
//   <q-toolbar-title @click="onFocusInput">
//     <div class="row" @click="onFocusInput">
//       <q-select
//         @click="onFocusInput"
//         v-model="model"
//         :options="options"
//         color="teal"
//         negative
//         options-selected-class="text-deep-orange"
//         :input-style="{ color: 'white' }"
//         class="col-2 row tx-white"
//         :class="[backgroundColorInInput ? 'bg-brown' : 'closed-options']"
//       >
//         <template v-slot:option="scope">
//           <q-item
//             v-bind="scope.itemProps"
//             ref="dropdownVisible"
//             :isOptionDisabled="() => false"
//             v-if="!scope.opt.hide"
//           >
//             <q-item-section avatar>
//               <q-icon>
//                 <img :src="scope.opt.icon" alt="flags" />
//               </q-icon>
//             </q-item-section>
//             <q-item-section>
//               <q-item-label>{{ scope.opt.label }}</q-item-label>
//               <q-item-label caption>{{ scope.opt.description }}</q-item-label>
//             </q-item-section>
//           </q-item>
//         </template>
//       </q-select>
//     </div>
//   </q-toolbar-title>
// </template>

// <script setup lang="ts">
// import { ref, watch, computed, onMounted } from 'vue';
// import { options } from '@constant/dataForm';
// import { ModelValueLang } from '@interfaces/form';
// import { useRouter } from 'vue-router';
// import { useApiary } from '@stores/apiary-store';
// import { useI18n } from 'vue-i18n';

// const apiaryStore = useApiary();

// const i18n = useI18n();
// const router = useRouter();
// const backgroundColorInInput = ref<boolean>(false);
// const dropdownVisible = ref<HTMLElement | null>(null);

// const defaultLang = computed(() => {
//   return (
//     sessionStorage.getItem('currentLang')?.toUpperCase() ||
//     i18n?.locale?.value.toUpperCase()
//   );
// });
// const model = ref<string | undefined>(defaultLang.value);

// const onFocusInput = () => {
//   backgroundColorInInput.value = !backgroundColorInInput.value;
// };

// onMounted(() => {
//   options?.forEach((el) => {
//     if (el.value === router.currentRoute.value.params.lang) {
//       el.hide = true;
//     } else {
//       el.hide = false;
//     }
//   });
//   if (i18n?.locale) {
//     const currentLang = sessionStorage.getItem('currentLang');
//     i18n.locale.value = currentLang;
//   }
// });
// watch(
//   () => model.value as string,
//   (newValue: ModelValueLang) => {
//     if (newValue) {
//       options.forEach((el) => {
//         if (el.value === newValue.value) {
//           el.hide = true;
//         } else {
//           el.hide = false;
//         }
//       });
//       i18n.locale.value = newValue.value;
//       apiaryStore.setCurrentLang(newValue.value.toUpperCase());
//       router.replace({ params: { lang: newValue.value } });
//       backgroundColorInInput.value = false;
//     }
//   }
// );
// </script>

// <style scoped lang="scss">
// .closed-options {
//   background-color: #ffb74d;
// }
// .row {
//   justify-content: end;
// }
// </style> */
// }
