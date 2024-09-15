import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import apiaryStore from "../stores/ApiaryStore"; // Import MobX store
import PropTypes from "prop-types";
import { Pages } from "../interfaces/apiary"; // Zakładam, że masz ten enum
import Icon from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assets/styles/organism/_essentialLink.scss";
interface EssentialLinkProps {
  title: string;
  link: string;
  icon: string;
}
const EssentialLink = observer(({ title, link, icon }: EssentialLinkProps) => {
  const { essentialLinks } = apiaryStore;
  const [show, setShow] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const currentRoute = sessionStorage.getItem("currentRoute") || Pages.LOGIN;

    if (currentRoute) {
      setStyleActiveElement(currentRoute, true);
    }
  }, []);

  useEffect(() => {
    if (title) {
      const currentRoute = location.pathname.includes(title.toLowerCase()) && title;
      if (currentRoute) {
        setStyleActiveElement(currentRoute);
      }
    }
  }, [location.pathname]);

  const setStyleActiveElement = (title: string, init = false) => {
    const groupElement = document.querySelectorAll("[data-active]");
    groupElement.forEach((el) => {
      if (title !== title) return;
      if (el.getAttribute("data-active") === title) {
        el.classList.add("active");
        apiaryStore.setCurrentRoute(title);
        return;
      }
      if (!init) {
        el.classList.remove("active");
      }
    });
  };
  // return <div>eeeeeeeeeeeeee</div>;
  return essentialLinks.map((link: { title: string; link: string; icon: any }) => (
    <div className="route-wrapper" data-active={link.title} data-test="link" key={link.link}>
      <Link to={link.link} onClick={() => setShow(!show)} className="text-link">
        <div className="icon-section">
          <FontAwesomeIcon icon={link.icon} />
        </div>
        <span className="navigation-description">{title}</span>
      </Link>
    </div>
  ));
});

export default EssentialLink;

// import { Menu } from "antd";
// import React, { useRef, useState } from "react";
// import { Link, NavLink } from "react-router-dom";
// import apiaryStore from "../stores/ApiaryStore";

// // interface Props {

// // }

// const EssentialLink = () => {
//   return apiaryStore.essentialLinks.map((link) => {
//     console.log("wwwwwwwwwwwwwwwwwwwwwwww", link);
//     return (
//       <Menu.Item key={link.title}>
//         <NavLink to={`/${link.route}`}>{link.title}</NavLink>
//       </Menu.Item>
//     );
//   });
// };

// export default EssentialLink;

/* <template>y
  <Transition>
    <div class="route-wrapper" :data-active="title" data-test="link">
      <!-- title === Pages.APIARIES && $emit('getData'); -->
      <router-link :to="link" @click="show = !show" class="text-link">
        <q-item-section avatar>
          <q-icon
            :name="icon"
            class="navigation-icon"
            size="25px"
          /> </q-item-section
        ><span class="navigation-description">{{ title }}</span>
      </router-link>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { onMounted, watch, ref } from 'vue';
import { Pages } from '@interfaces/apiary';
import { useApiary } from '@stores/apiary-store';
import { useRoute } from 'vue-router';
export interface EssentialLinkProps {
  title: string;
  caption?: string;
  link: string;
  getData?: () => void;
  icon?: string;
}
const props = withDefaults(defineProps<EssentialLinkProps>(), {
  caption: '',
  // link: '#',
  icon: ''
  // title: ''
});
const route = useRoute();
const apiaryStore = useApiary();
const show = ref(true);
defineEmits<{
  (e: 'getData'): void;
}>();
onMounted(() => {
  const currentRoute = sessionStorage.getItem('curentRoute') || Pages.LOGIN;

  if (!currentRoute) {
    return;
  }
  setStyleActiveElement(currentRoute, true);
});
const setStyleActiveElement = (title: string, init?: boolean) => {
  const groupElement = [...document.querySelectorAll('[data-active]')];
  groupElement.forEach((el) => {
    if (title !== props.title) {
      return;
    }
    if (title === props.title && el.getAttribute('data-active') === title) {
      el.classList.add('active');
      apiaryStore.setCurrentRoute(title);
      return;
    }
    if (!init) {
      el.classList.remove('active');
    }
  });
};
watch(
  () => route?.path,
  (newValue) => {
    const currentRoute =
      newValue.includes(props.title.toLocaleLowerCase()) && props.title;
    if (!currentRoute) {
      return;
    }
    setStyleActiveElement(currentRoute);
  }
);
</script>
<style scoped lang="scss">
:deep(.q-item__section--avatar) {
  width: 37px;
  min-width: 37px;
}
// :deep(.q-ma-md) {
//   margin-top: 0 !important;
// }
.route-wrapper {
  display: flex;
  width: 100%;
  padding: 16px;
  & .text-link {
    color: white;
    text-decoration: none;
    width: 100%;
    display: flex;
  }
  &.active {
    background-color: #ffb74d;
  }
  & .navigation-icon {
    width: 100%;
  }
  & .navigation-description {
    position: fixed;
    left: 60px;
    display: block;
  }
  & .toggle-navigation-description {
    display: none;
  }
}
.v-enter-active,
.v-leave-active {
  // background-color: red;
  // transition: background-color 0.5s ease;
  transition: opacity 1.5s ease;
}

.v-enter-from,
.v-leave-to {
  // background-color: green;

  opacity: 0;
}
</style> */
