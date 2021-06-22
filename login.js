import API from '../api';

export default class Login extends React.Component {
    statelogin = {
      email: "",
      password: ""
    }
    handleSubmit = event => {
      event.preventDefault();
      
      const user = {
        email: this.statelogin.email,
        password: this.statelogin.password,
      }
      API.post(`CuentasControllers/Login`, { user })
        .then(res => {
          console.log(res);
          console.log(res.data);
        })
    }
  }
  
  export default class SingUp extends React.Component {
    statesingup = {
      firstname: "",
      lastname: "",
      email: "",
      password: ""
    }
    handleSubmit = event => {
      event.preventDefault();
      
      const user = {
        firstname: this.statesingup.firstname,
        lastname: this.statesingup.lastname,
        email: this.statesingup.email,
        password: this.statesingup.password,
      }
      API.post(`CuentasControllers/Singin`, { user })
        .then(res => {
          console.log(res);
          console.log(res.data);
        })
    }
  }