import { makeAutoObservable, runInAction } from "mobx";
import { getAsync, postAsync, deleteAsync, putAsync } from "../asyncAxios";
import i18n from "i18next";
import { v4 as uuidv4 } from "uuid";
import { ApiaryData, ApiaryElement, Apiary, ApiariesData } from "../interfaces/apiary"; // Assuming your ApiaryData is here
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addDoc, collection, doc, getDoc, getDocs, setDoc, deleteDoc, updateDoc } from "firebase/firestore";
// import { db } from "../../src/firebase.js";
import { db } from "../firebase/firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { map } from "lodash";
import authStore from "./AuthStore";
// my-app\src\firebase.js
import { faSignsPost, faCalendar, faBoxesStacked, faSignInAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
class ApiaryStore {
  [x: string]: any;
  counter = 0;
  dataApiaries: Apiary[] | [] = [];
  selectedApiary: ApiaryElement | null = null;
  editedApiary: ApiaryData | null = null;
  apiariesList: ApiaryElement[] | [] = [];
  idChosenApiary: null | number | string = null;
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
      link: "apiaries",
      route: "apiaries",
    },
    {
      title: "Calendar",
      icon: faCalendar,
      link: "calendar",
      route: "calendar",
    },
    {
      title: "Beehives",
      icon: faBoxesStacked,
      link: "beehives",
      route: "beehives",
    },
    {
      title: "Login",
      icon: faSignInAlt,
      link: "login",
      route: "login",
    },
    {
      title: "Register",
      icon: faUserPlus,
      // icon: <FontAwesomeIcon icon={faUserPlus} />,
      link: "register",
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
  setSelectedApiary = (selectedApiary: ApiaryElement) => {
    this.selectedApiary = selectedApiary;
  };
  addApiary = async (newApiary: ApiaryData) => {
    const id = uuidv4();
    newApiary.id = id;
    try {
      const auth = getAuth();

      // lastNotifiedUid
      // :
      // "rA9CvTztMRfsNivLL1ANVLMDTFz1"
      console.log("Document written with ID: ", auth?.lastNotifiedUid);
      const userId = auth?.lastNotifiedUid;
      // Add a new document with a generated id.
      // const userDocRef = collection(db, "Apiaries").doc(userId);
      // const querySnapshot = await getDoc(collection(db, "Users"));
      // onst y = await deleteDoc(doc(db, "Users", userId, "Apiaries", idApiary));
      // const docRef = doc(db, "Users", userId);
      const docRef = doc(db, "Users", userId, "Apiaries", newApiary.id);

      const docSnap = await getDoc(docRef);
      // if (docSnap.exists()) {
      //   console.log("Document data:", docSnap.data());
      // } else {
      //   console.log("No such document!");

      // docSnap.data() will be undefined in this case
      const docRe = await addDoc(collection(db, "Users", userId, "Apiaries"), newApiary);
      console.log("No such document!333", docRe);
      // }
    } catch (error) {
      console.log("Document written with ID: error", error);
    }
  };
  // async getPlans() {
  //   this.dataApiaries = [];
  //   const auth = getAuth();
  //   onAuthStateChanged(auth, async (user) => {
  //     // const auth = getAuth();
  //     try {
  //       const userId = auth?.lastNotifiedUid;
  //       console.log("dddddddddddddddddd222", auth, userId, auth?.lastNotifiedUid, user);
  //       const querySnapshot = await getDocs(collection(db, "Users", user.uid, "Calendar"));

  //       // console.log("dddddddddddddddddd222", querySnapshot);
  //       querySnapshot.forEach((doc) => {
  //         // doc.data() is never undefined for query doc snapshots
  //         // console.log("ddddddddddddddddddd", doc.id, " => ", doc.data());
  //         if (doc.data()) {
  //           runInAction(() => {
  //             const data = doc.data();
  //             data.identifier = doc.id;
  //             this.dataApiaries = [...this.dataApiaries, data] as any;
  //             console.log("dddddddddddddddddd111", this.dataApiaries);
  //             this.setApiarieslist(this.dataApiaries);
  //             this.editedApiary = null;

  //             // this.setAllDataApiary(doc.data());
  //             this.loading = false;
  //           });
  //         }
  //       });
  //     } catch (error) {
  //       runInAction(() => {
  //         this.loading = false;
  //       });
  //       console.error("Error fetching apiary data:", error);
  //     }
  //   });
  // }
  addPlans = async (newPlan: any) => {
    const id = uuidv4();
    newPlan.id = id;
    // db.collection(
    // const uid = await authStore.getUser();
    const auth = getAuth();

    // lastNotifiedUid
    // :
    // "rA9CvTztMRfsNivLL1ANVLMDTFz1"
    console.log("Document written with IDrrr: ", auth?.lastNotifiedUid, auth.currentUser);
    const userId = auth?.lastNotifiedUid;
    // Add a new document with a generated id.
    // const userDocRef = collection(db, "Apiaries").doc(userId);
    // const querySnapshot = await getDoc(collection(db, "Users"));
    // const docRef = doc(db, "Users", userId);
    const sanitizeData = (data: any) => {
      return Object.fromEntries(Object.entries(data).filter(([_, value]) => value !== undefined));
    };
    try {
      const subCollectionName = "Calendar";

      // Referencja do podkolekcji
      const subCollectionRef = collection(db, "Users", userId, subCollectionName);

      // Pobierz wszystkie dokumenty z podkolekcji, aby upewnić się, że istnieje
      const subCollectionSnap = await getDocs(subCollectionRef);

      if (subCollectionSnap?.empty) {
        console.log(`Subcollection ${subCollectionName} does not exist. Creating...`);
      } else {
        console.log(`Subcollection ${subCollectionName} exists. Adding new document...`);
      }

      // Dodaj nowy dokument do podkolekcji
      const newDocRef = await addDoc(subCollectionRef, sanitizeData(newPlan));
      console.log("Document added with ID:", newDocRef.id);
    } catch (error) {
      console.error("Error adding document to Calendar subcollection:", error);
    }
  };
  async removeApiary(id: number) {
    const token = sessionStorage.getItem("token");
    const config = {
      headers: { "x-auth-token": token },
    };

    // if (token) {
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
    // }
  }
  deleteApiary = async (idApiary: any) => {
    try {
      const auth = getAuth();

      const userId = auth?.currentUser.uid;

      const y = await deleteDoc(doc(db, "Users", userId, "Apiaries", idApiary));

      console.log("tttttttttttttttt", userId, idApiary, auth, y, this.dataApiaries);
    } catch (error) {
      console.log("errror", error);
    }
  };
  setApiarieslist = (apiariesList: Apiary[]) => {
    console.log("1111111111", apiariesList);
    this.apiariesList = [];
    map(apiariesList, (apiary: Apiary) => {
      console.log("000000000000000000", this.apiariesList);
      this.apiariesList = [...this.apiariesList, { value: apiary.id, label: apiary.name }];
      console.log("000000000000000000111", this.apiariesList);
    });
  };
  async getInitApiaryData() {
    this.dataApiaries = [];
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      // const auth = getAuth();
      try {
        const userId = auth?.lastNotifiedUid;
        console.log("dddddddddddddddddd222", auth, userId, auth?.lastNotifiedUid, user);
        const querySnapshot = await getDocs(collection(db, "Users", user.uid, "Apiaries"));

        // console.log("dddddddddddddddddd222", querySnapshot);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log("ddddddddddddddddddd", doc.id, " => ", doc.data());
          if (doc.data()) {
            runInAction(() => {
              const data = doc.data();
              data.identifier = doc.id;
              this.dataApiaries = [...this.dataApiaries, data] as any;
              console.log("dddddddddddddddddd111", this.dataApiaries);
              this.setApiarieslist(this.dataApiaries);
              this.editedApiary = null;

              // this.setAllDataApiary(doc.data());
              this.loading = false;
            });
          }
        });
      } catch (error) {
        runInAction(() => {
          this.loading = false;
        });
        console.error("Error fetching apiary data:", error);
      }
    });
  }
  updateApiaryData = async (apiary: any) => {
    try {
      const cleanApiary = Object.fromEntries(Object.entries(apiary).filter(([key, value]) => value));

      const auth = getAuth();

      const userId = auth?.currentUser.uid;
      console.log("yyyyyyyyyyyyyyyyyyyyyyy", apiary.identifier, cleanApiary, userId);

      const y = await updateDoc(doc(db, "Users", userId, "Apiaries", apiary.identifier), cleanApiary);
    } catch (error) {
      console.log("yyyyyyyyyyyyyyyyyyyyyyyerror", error);
    }
  };
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
  // getApiary = async (id: string) => {
  //   // db.collection("Apiaries")
  //   //   .add(newApiary)
  //   //   .then((docRef: { id: any }) => {
  //   //     console.log("Document written with ID: ", docRef.id);
  //   //   })
  //   //   .catch((error: any) => {
  //   //     console.error("Error adding document: ", error);
  //   //   });
  //   // const id = uuidv4();
  //   // newApiary.id = id;
  //   // db.collection(
  //   try {
  //     // const uid = await authStore.getUser();
  //     const auth = getAuth();

  //     // lastNotifiedUid
  //     // :
  //     // "rA9CvTztMRfsNivLL1ANVLMDTFz1"
  //     console.log("Document written with ID: getApiary", id);
  //     const userId = auth?.lastNotifiedUid;
  //     // Add a new document with a generated id.
  //     // const userDocRef = collection(db, "Apiaries").doc(userId);
  //     // const querySnapshot = await getDoc(collection(db, "Users"));
  //     // const docSnap = await getDoc(collection(db, "Users", userId, "Apiaries"));

  //     const docRef = doc(db, "Users", userId, "Apiaries", id); // specificApiaryId musi być identyfikatorem dokumentu

  //     // Pobierz dokument
  //     const docSnap = await getDoc(docRef);

  //     if (docSnap.exists()) {
  //       console.log("Document data:", docSnap.data());
  //       this.editedApiary = docSnap.data();
  //     } else {
  //       console.log("No such document!");
  //     }
  //   } catch (error) {
  //     console.log("Document written with ID: error", error);
  //   }
  // };
  // async updateApiaryData(data: any, id: number) {
  //   const token = sessionStorage.getItem("token");
  //   const config = {
  //     headers: { "x-auth-token": token },
  //   };

  //   if (token) {
  //     try {
  //       this.loading = true;
  //       const r = await putAsync({
  //         url: `http://localhost:5000/api/apiary/rows/${id}`,
  //         payload: data,
  //         setStatus: this.setStatus.bind(this),
  //         config,
  //       });

  //       if (r) {
  //         runInAction(() => {
  //           this.loading = false;
  //         });
  //       }
  //     } catch (error) {
  //       runInAction(() => {
  //         this.loading = false;
  //       });
  //       console.error("Error updating apiary:", error);
  //     }
  //   }
  //   return true;
  // }

  // setAllDataApiary(data: any) {
  //   // data.forEach((el: any, index: number) => {
  //   //   el.index = index + 1;
  //   // });
  //   this.dataApiaries = data;
  //   this.setChartApiary(data);
  //   sessionStorage.setItem("dataApiaries", JSON.stringify(data));
  // }

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
