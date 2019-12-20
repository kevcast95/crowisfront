import React, {Component} from 'react'
import Head from 'next/head'
import Nav from '../components/nav'
import { withRouter } from 'next/router';

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
    fetch(`http://167.99.15.34:5000/login/${user}/${pass}`,{
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
      <div>
        <Head>
          <title>Home</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="container">
          <form style={{marginBottom:'10px'}} >
            <input type='text' className='input-form' placeholder='User'
              onChange={(e)=> this.onChangeField(e.target.value, 'user')}
            />
            <input type='password' className='input-form' placeholder='Password'
              onChange={(e)=> this.onChangeField(e.target.value, 'pass')}
            />
            <span onClick={this.Login} className='btn-sign-up'>
              log in
            </span>
          </form>
        </div>

        <style jsx>{`
          .container{
            margin: 0;
            padding: 0;
            background: grey;
          }
          form {
            width: 40%;
            margin: 20px auto;
            padding: 30px 0;
            display: flex;
            flex-direction: column;
          }
          .input-form {
            border: 0;
            outline: none;
            height: 40px;
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            line-height: 28px;
            background: #FFFFFF;
            border-radius: 4px;
            margin: 6px 0px;
            padding: 0px 15px;
          }
          .btn-sign-up {
            height: 38px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #263D6D;
            border-radius: 20px;
        }
        `}</style>
      </div>
    )
  }
}

export default withRouter(Login )
