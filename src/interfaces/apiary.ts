export interface DataChart {
  labels: Labels[] | null;
  datasets: Datasets[];
}

export type Labels = "Wielkopolskie" | "Warszawskie poszerzane" | "Dadana" | "Wielokorpusowe Ostrowskiej";
export interface Datasets {
  label: string;
  backgroundColor: string;
  data: number[] | null;
}
export interface InitChart {
  column: Columns[];
  rows: ApiaryData[];
}
export interface Columns {
  align: string;
  field: string;
  label: string;
  name: string;
  required: boolean;
}
export interface ApiaryData {
  _id: string;
  calcium: string;
  calories: number;
  fat: number;
  hives: number;
  id: number;
  iron: string;
  name: string;
  protein: number;
  type: string;
  address: string;
  sun: string;
  lat: string;
  lng: string;
  country: string;
  state: string;
  city: string;
  zip: string;
  forages: string;
  description: string;
}
export enum Pages {
  APIARIES = "Apiaries",
  LOGIN = "Login",
  REGISTER = "Register",
  BEEHIVES = "Beehives",
}
export interface InputWrapperProps {
  type?: "number" | "text" | "textarea" | "time" | "password" | "email" | "search" | "tel" | "file" | "url" | "date";
  modelValue: number | string | null;
  placeholder: string;
  label: string;
  options?: Array<string>;
  append?: boolean;
}
export interface ButtonWrapperProps {
  src?: string;
  label?: string;
  click?: string | null;
  flat?: boolean;
  background?: string;
  color?: string;
  type?: string;
  formName?: string;
  margin?: string;
}
export interface Coordinates {
  lat: number;
  lng: number;
}
export interface OptionsDropDownApiary {
  extention: string;
  title: string;
}
export interface ButtonDropDownProps {
  options: OptionsDropDownApiary[];
  background?: string;
  color?: string;
  margin?: string;
}
