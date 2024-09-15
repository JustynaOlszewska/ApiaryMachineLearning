import { makeAutoObservable, runInAction } from "mobx";
import { getAsync, postAsync, deleteAsync, putAsync } from "../asyncAxios";
import i18n from "i18next";
import { ApiaryData } from "../interfaces/apiary"; // Assuming your ApiaryData is here
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignsPost, faCalendar, faBoxesStacked, faSignInAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
class ApiaryStore {
  [x: string]: any;
  counter = 0;
  dataApiary = null;
  dataChart = {
    labels: null,
    datasets: [
      {
        label: "Data One",
        backgroundColor: "#f87979",
        data: null,
      },
    ],
  };
  status = {
    error: {
      value: false,
      message: "",
    },
    success: false,
    pending: false,
  };
  loading = false;

  essentialLinks = [
    {
      title: "Apiaries",
      icon: faSignsPost,
      link: "/pl/apiaries",
      route: "apiaries",
    },
    {
      title: "Calendar",
      icon: faCalendar,
      link: "/pl/calendar",
      route: "calendar",
    },
    {
      title: "Beehives",
      icon: faBoxesStacked,
      link: "/pl/beehives",
      route: "beehives",
    },
    {
      title: "Login",
      icon: faSignInAlt,
      link: "/pl/login",
      route: "login",
    },
    {
      title: "Register",
      icon: faUserPlus,
      // icon: <FontAwesomeIcon icon={faUserPlus} />,
      link: "/pl/register",
      route: "register",
    },
  ];

  constructor() {
    makeAutoObservable(this); // Automatically makes fields observable and actions
  }

  // Getter for doubleCount
  get doubleCount() {
    return this.counter * 2;
  }

  // Actions
  setCurrentRoute(actualPage: string) {
    sessionStorage.setItem("currentRoute", actualPage);
  }

  setCurrentLang(lang: string) {
    sessionStorage.setItem("currentLang", lang);
  }

  setStatus(newStatus: any) {
    this.status[newStatus.key] = newStatus.value as any;
  }

  async removeApiary(id: number) {
    const token = sessionStorage.getItem("token");
    const config = {
      headers: { "x-auth-token": token },
    };

    if (token) {
      try {
        this.loading = true;
        const r = await deleteAsync({
          url: `http://localhost:5000/api/apiary/rows/${id}`,
          setStatus: this.setStatus.bind(this),
          config,
        });

        if (r) {
          this.getInitApiaryData();
          runInAction(() => {
            this.loading = false;
          });
        }
      } catch (error) {
        runInAction(() => {
          this.loading = false;
        });
        console.error("Error removing apiary:", error);
      }
    }
  }

  async getInitApiaryData() {
    const token = sessionStorage.getItem("token");
    const config = {
      headers: { "x-auth-token": token },
    };

    if (token) {
      try {
        const data = await getAsync({
          url: "http://localhost:5000/api/apiary/rows",
          setStatus: this.setStatus.bind(this),
          config,
        });

        if (data) {
          runInAction(() => {
            this.setAllDataApiary(data);
            this.loading = false;
          });
        }
      } catch (error) {
        runInAction(() => {
          this.loading = false;
        });
        console.error("Error fetching apiary data:", error);
      }
    } else {
      this.router.push({
        path: `/${sessionStorage.getItem("currentLang")?.toLowerCase()}/login`,
      });
    }
  }

  async addApiaryData(data: any) {
    const token = sessionStorage.getItem("token");
    const config = {
      headers: { "x-auth-token": token },
    };

    if (token) {
      try {
        this.loading = true;
        const r = await postAsync({
          url: "http://localhost:5000/api/apiary/rows",
          payload: data,
          setStatus: this.setStatus.bind(this),
          config,
        });

        if (r) {
          runInAction(() => {
            this.loading = false;
          });
        }
      } catch (error) {
        runInAction(() => {
          this.loading = false;
        });
        console.error("Error adding apiary:", error);
      }
    }
    return true;
  }

  async updateApiaryData(data: any, id: number) {
    const token = sessionStorage.getItem("token");
    const config = {
      headers: { "x-auth-token": token },
    };

    if (token) {
      try {
        this.loading = true;
        const r = await putAsync({
          url: `http://localhost:5000/api/apiary/rows/${id}`,
          payload: data,
          setStatus: this.setStatus.bind(this),
          config,
        });

        if (r) {
          runInAction(() => {
            this.loading = false;
          });
        }
      } catch (error) {
        runInAction(() => {
          this.loading = false;
        });
        console.error("Error updating apiary:", error);
      }
    }
    return true;
  }

  setAllDataApiary(data: any) {
    data.forEach((el: any, index: number) => {
      el.index = index + 1;
    });
    this.dataApiary = data;
    this.setChartApiary(data);
    sessionStorage.setItem("dataApiary", JSON.stringify(data));
  }

  setChartApiary(data: any) {
    const uniqueRowsChart = [...new Set(data.map((el: any) => el.type))];
    const array = new Array(uniqueRowsChart.length).fill(0);
    const sum = data.reduce((accumulator: any, currentValue: any) => {
      return uniqueRowsChart.map((el, i) => {
        if (el === currentValue.type) {
          return accumulator[i] + currentValue.hives;
        } else {
          return accumulator[i];
        }
      });
    }, array);

    runInAction(() => {
      this.dataChart.labels = uniqueRowsChart as any;
      this.dataChart.datasets[0].label = "Liczba uli";
      this.dataChart.datasets[0].backgroundColor = "#f87979";
      this.dataChart.datasets[0].data = sum;
    });
  }
}

const apiaryStore = new ApiaryStore();
export default apiaryStore;
