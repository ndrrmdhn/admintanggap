import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //define state validation
    const [validation, setValidation] = useState([]);

    //define history
    const navigate = useNavigate();

    const loginHandler = async(e) => {
        e.preventDefault();
        
        //initialize formData
        const formData = new FormData();

        //append data to formData
        formData.append('email', email);
        formData.append('password', password);

        //send data to server
        await axios.post('http://202.10.41.84:5000/api/admin/login', formData,{
            // headers: {
            //     'Content-Type': 'application/json',
            //     'Access-Control-Allow-Origin': '*',
            //     'Access-Control-Allow-Headers': '*',
            //     'Access-Control-Allow-Credentials': false
                
            // },
        })
        .then((response) => {

            //set token on localStorage
            localStorage.setItem('token', response.data.data.token);
            // console.log(response.data.data);

            //redirect to dashboard
            navigate('/home');
        })
        .catch((error) => {

            setValidation(error);
            console.log(error);
        })

            // navigate('/home');

    }

  return (
    <div>
        <body className="hold-transition login-page">
       <div className="login-box">
  <div className="login-logo">
    <b>Admin</b>Tanggap App
  </div>
  {/* /.login-logo */}
  <div className="card">
    <div className="card-body login-card-body">
      <p className="login-box-msg">Silahkan Login</p>
        
      {
            validation.message && (
                <div className="alert alert-danger">
                    {validation.message}
                </div>
            )
        }
      <form onSubmit={loginHandler}>
        <div className="input-group mb-3">
          <input type="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-envelope" />
            </div>
          </div>
        </div>
        
        <div className="input-group mb-3">
          <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-lock" />
            </div>
          </div>
        </div>
        
        <div className="row">
          <div className="col-8">
            <div className="icheck-primary">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">
                Remember Me
              </label>
            </div>
          </div>
          {/* /.col */}
          <div className="col-4">
            <button type="submit" className="btn btn-primary btn-block">Sign In</button>
          </div>
          {/* /.col */}
        </div>
      </form>
      
    </div>
    {/* /.login-card-body */}
  </div>
</div>
{/* /.login-box */}

</body>
    </div>
  )
}

export default Login