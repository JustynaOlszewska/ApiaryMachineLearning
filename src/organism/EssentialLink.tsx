import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import apiaryStore from "../stores/ApiaryStore"; // Import MobX store
import PropTypes from "prop-types";
import { Pages } from "../interfaces/apiary"; // Zakładam, że masz ten enum
import Icon from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assets/styles/organism/_essentialLink.scss";
import { Typography } from "antd";
interface EssentialLinkProps {
  title?: string;
  link?: string;
  icon?: string;
}
const EssentialLink = observer(({ title, link, icon }: EssentialLinkProps) => {
  const { essentialLinks } = apiaryStore;
  const [show, setShow] = useState(true);
  // const [activeNavEl, setActiveNavEl] = useState<string>("Register");
  // const location = useLocation();
  const { lang } = useParams();
  // const [currentLang, setCurrentLang] = useState("en");
  useEffect(() => {
    const currentRoute = sessionStorage.getItem("currentRoute") || Pages.LOGIN;
    // console.log("currentRoute", currentRoute);
    if (currentRoute) {
      setStyleActiveElement(currentRoute, true);
    }
  }, []);
  // useEffect(() => {
  //   lang && setCurrentLang(lang);
  // }, [lang]);
  // useEffect(() => {
  //   if (activeNavEl) {
  //     const currentRoute = location.pathname.includes(activeNavEl.toLowerCase()) && activeNavEl;
  //     console.log("title !== activeNavEl", currentRoute, location.pathname, activeNavEl, activeNavEl.toLowerCase(), location, essentialLinks);

  //     if (currentRoute) {
  //       setStyleActiveElement(currentRoute);
  //     }
  //   }
  // }, [location.pathname]);

  const setStyleActiveElement = (title: string, init = false) => {
    const groupElement = document.querySelectorAll("[data-active]");
    groupElement.forEach((el) => {
      // console.log("title !== activeNavEl", title, activeNavEl);
      // if (title !== activeNavEl) return;
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
  return essentialLinks.map((link: { title: string; link: string; icon: any }) => {
    // console.log("link.link", `/${lang}/${link.link}`);
    return (
      <div
        className="route-wrapper"
        data-active={link.title}
        data-test="link"
        key={`${link.link}-${link.title}`}
        onClick={() => {
          // setActiveNavEl(link.title);
          setStyleActiveElement(link.title);
        }}>
        <Link to={`/${lang}/${link.link}`} onClick={() => setShow(!show)} className="text-link">
          <div className="icon-section">
            <FontAwesomeIcon icon={link.icon} />
            <Typography.Text style={{ color: "white", paddingLeft: "20px" }}>{link.title}</Typography.Text>
          </div>
          <span className="navigation-description">{title}</span>
        </Link>
      </div>
    );
  });
});

export default EssentialLink;
