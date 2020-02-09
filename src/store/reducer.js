import {combineReducers} from "redux"
import contentReducer from "../pages/article/store/content.redux";//取出contentReducer
// import login from "../pages/login/reducer"
//合併reducers
const reducers = combineReducers({
    contentReducer,
    // login
})
export default reducers;