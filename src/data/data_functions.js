import axios from "axios";
import store from "../store";

let localURL = "http://localhost:8888/.netlify/functions";
let productionURL = "https://simplyscenarioplan.netlify.app/.netlify/functions";
let activeURL = productionURL;

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
  sendFeedback(inFile) {
    return axios.post(activeURL + "/state_functions/giveFeedback", {id: store.state.user.id, email: store.state.user.email, text: inFile.text}).then(response => {
      return response
    })
  },
  voteFeature(title) {
    var data = {
      title: title
    }
    store.state.user.email != undefined ? data["email"] = store.state.user.email : null;
    return axios.post(activeURL + "/user_functions/voteFeature", data).then(response => {
      return response
    })
  },
  askNewFeature(title) {
    var data = {
      title: title
    }
    store.state.user.email != undefined ? data["email"] = store.state.user.email : null;
    return axios.post(activeURL + "/user_functions/askNewFeature", data).then(response => {
      return response
    })
  },
  saveOrUpdateState(inFile) {
    return axios.post(activeURL + "/state_functions/save", {id: store.state.user.id, title: inFile.title, state: inFile.state}).then(response => {
      return response
    })
  },

  getSavedStates() {
    return axios.post(activeURL + "/state_functions/load_states", {id: store.state.user.id}).then(response => {
      return response
    })
  },
  loadSpecificStates(title) {
    return axios.post(activeURL + "/state_functions/load", {id: store.state.user.id, title: title}).then(response => {
      return response
    })
  },
}



export default logic_functions