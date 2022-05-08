import { apiGET } from "@/api";
import { FC, MouseEvent, ReactElement, useEffect, useReducer, useState } from "react";
import { Label, Search } from "semantic-ui-react";

enum ISearchAction {
  CLEAN, SEARCH, FOUND, SELECED
}
type State = {
  loading: boolean;
  results: {
    name: string;
    age: number;
    phone: string;
    sex: number;
  }[];
  value: string;
}
type Action = {
  type: ISearchAction,
  payload: any;
}
interface IProps {
  onChange: (name: string) => void;
}
const SearchUser: FC<IProps> = ({ onChange }): ReactElement => {
  const [userList, setUserList] = useState<State["results"]>([]);
  const initialState: State = {
    loading: false,
    results: userList,
    value: ''
  }
  const keyWordReducer = (state: State, { type, payload }: Action): State => {
    switch (type) {
      case ISearchAction.SEARCH:
        onChange(payload);
        return {
          ...state,
          loading: true,
          value: payload
        };
      case ISearchAction.FOUND:
        return {
          ...state,
          loading: false,
          results: payload
        }
      case ISearchAction.SELECED:
        onChange(payload)
        return {
          ...state,
          value: payload
        }
      default:
        return initialState;
    }
  }
  const getUserList = async () => {
    try {
      const { data } = await apiGET('userList');
      setUserList(data.map(({ age, name, phone, sex }) => ({ age, name, phone, sex })))
    } catch (e) {
      console.log(e)
    }
  }
  const handleSearchChange = (e: MouseEvent<HTMLElement, MouseEvent>) => {
    dispatch({ type: ISearchAction.SEARCH, payload: e.target.value });
    const payload = userList.filter(({ name, phone }) => name.indexOf(e.target.value) !== -1 || phone.indexOf(e.target.value) !== -1)
    dispatch({ type: ISearchAction.FOUND, payload })
  }
  const [state, dispatch] = useReducer(keyWordReducer, initialState);
  useEffect(() => {
    getUserList();
  })
  return (
    <section className="row-start-2">
      <Search
        loading={state.loading}
        onResultSelect={(e, data) =>
          // console.log(data)
          dispatch({ type: ISearchAction.SELECED, payload: data.result.phone })
        }
        onSearchChange={(e) => handleSearchChange(e)}
        resultRenderer={({ name, phone, age, sex }) => <Label key={phone} content={`${name} · ${sex === 0 ? '男' : '女'} · ${age}岁 · 手机号${phone}`} />}
        results={state.results}
        value={state.value}
      />
    </section>
  )
}
export default SearchUser;