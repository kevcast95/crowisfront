import React, {Component} from 'react'
import Head from 'next/head'
import Nav from '../components/nav'
import { withRouter } from 'next/router';
import Chart from 'chart.js';

class Plot extends Component {
  constructor(props) {
    super(props);
    this.state={
        user: '',
        pass: '',
    } 
    this.plot = this.plot.bind(this)
    this.getPlot = this.getPlot.bind(this)
    this.onChangeField = this.onChangeField.bind(this)
  }
  onChangeField(text, field = null) {
    if (field) {
      let fieldUpdate = {};
      fieldUpdate[field] = text;
      this.setState(fieldUpdate);
    }
    
  }
  getPlot(){
    const user = this.state.user
    const pass = this.state.pass
    fetch(`http://167.99.15.34:5000/main_plot/${user}`,{
      method: 'GET',
      headers: {
        'Content-Type':'application/json'
      }
    }).then(auth=>auth.json())
    .then(response=>{
      this.plot(response)
    })
    
  }
  plot(response){
    console.log('responsePlot:', response);
    var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: response.x,
            datasets: [{
                label: response.name,
                data: response.y,
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
  }
  
  render(){
    return(
      <div>
        <Head>
          <title>Plot</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="container">
            <input type='text' className='input-form' placeholder='User'
                onChange={(e)=> this.onChangeField(e.target.value, 'user')}
            />
            <span onClick={this.getPlot} className='btn-sign-up'>
              log in
            </span>
            <canvas id="myChart" width="400" height="400"></canvas>
        </div>

        <style jsx>{`
          .container{
            margin: 0;
            padding: 0;
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

export default withRouter(Plot)
