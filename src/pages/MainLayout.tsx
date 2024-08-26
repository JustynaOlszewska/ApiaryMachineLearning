import React, { useRef, useState } from "react";
import { Breadcrumb, Button, Drawer, DrawerProps, Layout, Menu, RadioChangeEvent, theme } from "antd";
import { MenuOutlined } from "@ant-design/icons";

const { Header, Content, Footer } = Layout;
import SelectLang from "../organism/SelectLang";
import Sider from "antd/es/layout/Sider";
import { apiaryStore } from "../stores/ApiaryStore";
import EssentialLink from "../organism/EssentialLink";
import { NavLink } from "react-router-dom";
// interface MainLayoutProps {}
const siderStyle: React.CSSProperties = {
  paddingTop: "100px",
  overflow: "auto",
  height: "100vh",
  position: "fixed",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarColor: "unset",
};
const MainLayout = () => {
  // const miniState = useRef(false);
  const [miniState, setMiniState] = useState(false);

  const hideNavigationDescription = () => {
    var elements = document.querySelectorAll(".navigation-description");
    console.log("elements", elements);
    elements.forEach((element) => {
      element?.classList.toggle("toggle-navigation-description");
    });
  };
  const drawerClick = (e: Event) => {
    if (miniState) {
      setMiniState(false);
      e.stopPropagation();
    } else {
      setMiniState(true);
    }
  };

  return (
    <Layout style={{ marginInlineStart: 200 }}>
      <Header style={{ display: "flex", alignItems: "center", position: "fixed", zIndex: 10, left: 0, right: 0 }}>
        <Button
          icon={<MenuOutlined />}
          onClick={(event: any) => {
            hideNavigationDescription();
            drawerClick(event);
          }}
        />

        {/* <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            //   items={items}
            style={{ flex: 1, minWidth: 0 }}>
            <EssentialLink />
          </Menu> */}
        <SelectLang />
      </Header>
      <Layout hasSider>
        <Sider style={siderStyle}>
          {/* <div className="demo-logo-vertical" /> */}
          <Menu
            theme="dark"
            mode="vertical"
            defaultSelectedKeys={["2"]}
            //   items={items}
            style={{ flex: 1, minWidth: 0 }}>
            {/* {apiaryStore.essentialLinks.map((link) => {
            console.log("wwwwwwwwwwwwwwwwwwwwwwww", link);
            return (
              <Menu.Item key="1">
                <NavLink to="/apiaries">{link.title}</NavLink>
              </Menu.Item>
            );
          })} */}
            <EssentialLink />
          </Menu>
          {/* <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]} items={apiaryStore.essentialLinks} /> */}
          {/* <EssentialLink
          v-for="link in apiaryStore.essentialLinks"
          :key="link.link"
          v-bind="link"
          @get-data="apiaryStore.getInitApiaryData"
        /> */}
        </Sider>
        <Layout>
          <Content></Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
{
  /* <template>
  <q-layout view="hHh Lpr lff">
    <q-header elevated :class="'bg-grey-10'">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="
            (event) => {
              hideNavigationDescription();
              drawerClick(event);
            }
          "
        />
        <!-- <div> -->
        <!-- <div>+ Add apiary</div> -->
        <SelectLang />
        <!-- </div> -->
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :mini="miniState"
      class="bg-grey-10 text-white"
    >
      <q-list>
        <EssentialLink
          v-for="link in apiaryStore.essentialLinks"
          :key="link.link"
          v-bind="link"
          @get-data="apiaryStore.getInitApiaryData"
        />
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
    <a target="_blank" href="https://icons8.com/icon/NI6BPSi7hsoo/poland"
      >Poland</a
    >
  </q-layout>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import EssentialLink from '@components/EssentialLink.vue';
import SelectLang from '@components//lang/SelectLang.vue';
import { useApiary } from '@stores/apiary-store';
import { useI18n } from 'vue-i18n';

const i18n = useI18n();
const apiaryStore = useApiary();

const leftDrawerOpen = ref(true);

const miniState = ref(false);

const drawerClick = (e: Event) => {
  if (miniState.value) {
    miniState.value = false;
    e.stopPropagation();
  } else {
    miniState.value = true;
  }
};
const hideNavigationDescription = () => {
  var elements = document.querySelectorAll('.navigation-description');
  console.log('elements', elements);
  elements.forEach((element) => {
    element?.classList.toggle('toggle-navigation-description');
  });
};

watch(
  () => i18n.locale.value,
  (newValue) => {
    console.log('watch', newValue);
    apiaryStore.essentialLinks.forEach((el) => {
      el.link = `/${newValue}/${el.route}`;
    });
  }
);
</script>
<style lag="scss" scoped>
:deep(.q-field__inner .relative-position .col .self-stretch) {
  width: 15%;
}
:deep(.q-list) {
  margin-top: 20px;
}
:deep(.q-toolbar__title) {
  background-color: white;
  position: absolute;
  right: 0;
  left: 53px;
}
:deep(.q-drawer-container:not(.q-drawer--mini-animate) .q-drawer--mini) {
  width: 53px !important;
}
</style> */
}
