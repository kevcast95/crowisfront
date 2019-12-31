import React, {Component} from 'react'
import Head from 'next/head'
import Nav from '../components/nav'
import { withRouter } from 'next/router';
import ReactTooltip from 'react-tooltip';
import logo_eca from './../components/img/eca_new_logo.png'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state={
        user: '',
        pass: '',
    } 
    this.onChangeField = this.onChangeField.bind(this)
    this.Login = this.Login.bind(this)
  }
  Login(){
    const user = this.state.user
    const pass = this.state.pass
    fetch(`http://167.99.15.34:8000/login/${user}/${pass}`,{
      method: 'GET',
      headers: {
        'Content-Type':'application/json'
      }
    }).then(auth=>auth.json())
    .then(response=>{
      console.log('response:', response.loging);
      this.props.router.push('/plot');
      
    })
  }
  onChangeField(text, field = null) {
    if (field) {
      let fieldUpdate = {};
      fieldUpdate[field] = text;
      this.setState(fieldUpdate);
    }
    
  }
  render(){
    return(
      <div className="container">
        <Head>
          <title>Home</title>
          <link rel="icon" href="/favicon.ico" />
          <link href="https://fonts.googleapis.com/css?family=Roboto|Nunito:200,300,400,600,700,800,900&display=swap" rel="stylesheet" />
        </Head>

        <div className='login-container'>
        <ReactTooltip />
          <img className='logo_eca' src={logo_eca} />
          <h1 data-tip="Optimización y Mantenimiento de la Agenda" className='oma'>O M A</h1>
          <form style={{marginBottom:'10px'}} >
            <input type='text' className='input-form' placeholder='User'
              onChange={(e)=> this.onChangeField(e.target.value, 'user')}
            />
            <input type='password' className='input-form' placeholder='Password'
              onChange={(e)=> this.onChangeField(e.target.value, 'pass')}
            />
            <span onClick={this.Login} className='btn-sign-up'>
              Iniciar Sesión
            </span>
          </form>
        </div>

        <style jsx>{`
          .container{
            height: 100vh;
            background: #F2F2F2;
            display: flex;
            justify-content: center;
            align-items: center;
            align-content: center;
          }
          .login-container{
            width: 25%;
            padding: 10px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            align-content: center;
            background: white;
            border-radius: 6px;
            -webkit-box-shadow: 5px 3px 19px -2px rgba(0,0,0,0.75);
          }
          .logo_eca {
            margin: 20px 30px;
            width: 250px;
          }
          .oma {
            font-family: Nunito;
            color: grey;
            cursor: pointer;
          }
          form {
            margin: 0 auto;
            display: flex;
            flex-direction: column;
           
          }
          .input-form {
            border: solid 1px #F2F2F2;
            outline: none;
            height: 40px;
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            line-height: 28px;
            background: #FFFFFF;
            border-radius: 4px;
            margin: 8px 0px;
            padding: 0px 15px;
          }
          .btn-sign-up {
            margin: 20px auto;
            width: 130px;
            height: 38px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #007bff;
            border-radius: 20px;
            color: white;
            font-family: Nunito;
        }
        .btn-sign-up:hover {
            cursor: pointer;
            opacity: 0.7;
        }
        `}</style>
      </div>
    )
  }
}

export default withRouter(Login )
