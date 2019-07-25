import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { postRequest } from '../helpers/apiLexicon';
import { SwalFire } from '../helpers/swalFire';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      passwordd: '',
      email: '',
      isDataValid: null,
      error: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { username, password, passwordd, email } = this.state;
    
    if(username !== null && username !== '' && username !== undefined) {
      if(username.length < 4){
        const message = 'Nome de usuário deve conter no mínimo 4 caracteres.';
        const type = 'warning'
        SwalFire(message, type);        
        this.setState({isDataValid: false});
      };
    } else {
      const message = 'Nome de usuário inválido.';
      const type = 'warning'
      SwalFire(message, type);
      this.setState({isDataValid: false});
    };

    if(password !== null && password !== '' && password !== undefined) {
      if(password.length < 8) {
        this.setState({
          isDataValid: false,
          error: 'Senha deve conter no mínimo 8 caracteres.'
        });
      
      } else if(Number(password)) {
        this.setState({
          isDataValid: false,
          error: 'Senha deve conter no mínimo uma letra.'
        });
      
      } else if(password !== passwordd) {
        this.setState({
          isDataValid: false,
          error: 'As senhas não coincidem.'
        });
      } else {
        this.setState({isDataValid: true});
      }
    } else {
      this.setState({
        isDataValid: false,
        error: 'A senha deve conter 8 caracteres, entre eles: LETRAS, NÚMEROS são obrigatórios. Símbolos SÂO PERMITIDOS.'
      });
    };

    if(this.state.isDataValid === true) {
      const url = '/register';
      const data = {username: username, password:password, passwordd:passwordd, email: email};
      const message = 'Usuário criado com sucesso.'
      postRequest(url, data, message).then(res => {
        console.log(res)
        if(res.data.status === 200) {
          this.props.history.push('/login');
        
        } else {
          SwalFire(res.data.message, 'error');
        }
      }).catch(err => SwalFire(err, 'error'));
    
    } else if(this.state.isDataValid === false) {
      SwalFire(this.state.error, 'warning');
    };
  };

  render() {
    return(
      <div className="container">
        <div className="card o-hidden border-0 shadow-lg my-5">
          <div className="card-body p-0">
            <div className="row">
              <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
              <div className="col-lg-7">
                <div className="p-5">
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">Crie uma conta!</h1>
                  </div>
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-group row">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <input onChange={this.handleChange} value={this.state.username} name="username" type="text" className="form-control form-control-user" placeholder="Nome de usuário" autocomplete="off"/>
                      </div>
                      <div className="col-sm-6">
                        <input onChange={this.handleChange} value={this.state.email} name="email" type="email" className="form-control form-control-user" placeholder="Informe um email válido" autocomplete="off"/>
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <input onChange={this.handleChange} value={this.state.password} name="password" type="password" className="form-control form-control-user" placeholder="Senha" autocomplete="off"/>
                      </div>
                      <div className="col-sm-6">
                        <input onChange={this.handleChange} value={this.state.passwordd} name="passwordd" type="password" className="form-control form-control-user" placeholder="Repita a senha" autocomplete="off"/>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-user btn-block">
                      Registrar Usuário
                    </button>
                    <hr/>
                  </form>
                  <hr/>
                  <div className="text-center">
                    <a className="small" href="forgot-password.html">Esqueceu a senha?</a>
                  </div>
                  <div className="text-center">
                    <a className="small" href="login.html">Já possui uma conta? Vá para o Login!</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Register);