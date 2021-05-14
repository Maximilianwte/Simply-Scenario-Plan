import axios from "axios";
import store from "../store";

let localURL = "http://localhost:8888/.netlify/functions";
let productionURL = "https://gallant-wing-60a535.netlify.app/.netlify/functions";
let activeURL = localURL;

let logic_functions = {
  create_user(userFile) {
    return axios.post(activeURL + "/user_functions/create_user", userFile).then(response => {
      return response
    })
  },
  send_login(inFile) {
    return axios.post(activeURL + "/user_functions/read_user", inFile).then(response => {
      return response
    })
  },
  update_userAccess(inFile, value) {
    if (value == "email") {
      return axios.post(activeURL + "/user_functions/update_userAccess/email", inFile).then(response => {
        return response;
      })
    } else {
      return axios.post(activeURL + "/user_functions/update_userAccess/password", inFile).then(response => {
        return response;
      })
    }
  },
  saveOrUpdateState(inFile) {
    console.log("started saving", inFile.title)
    return axios.post(activeURL + "/state_functions/save", {id: store.state.user.id, title: inFile.title, state: inFile.state}).then(response => {
      return response.data
    })
  },

  getSavedStates() {
    return axios.post(activeURL + "/state_functions/load_states", {id: store.state.user.id}).then(response => {
      return response.data
    })
  },
}



export default logic_functions