import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Footer from '../main/Footer';
import Sidebar from '../main/Sidebar';
import Navbar from '../main/Navbar';

function UserEdit() {
  const [namadepan, setNamaDepan] = useState("");
  const [namabelakang, setNamaBelakang] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [aktif, setAktif] = useState("");
  const [password, setPassword] = useState("");

  const [msgerror, setError] = useState([]);
  const navigate = useNavigate();
  const {id} = useParams();

  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const fetchDetailUser = async(req, res) => {
    try {
      await axios.get(`http://202.10.41.84:5000/api/users/edit/${id}`)
      .then(response => {
        setNamaDepan(response.data.data.nama_depan);
        setNamaBelakang(response.data.data.nama_belakang);
        setEmail(response.data.data.email);
        setAktif(response.data.data.aktif);
        setRole(response.data.data.level);
        // console.log(response.data.data);
      })
      
    } catch (error) {
      setError(error);
    }
    
  }


  const saveUpdate = async(e)=> {
      e.preventDefault();
       //initialize formData
       const formData = new FormData();

       //append data to formData
       formData.append('email', email);
       formData.append('password', password);
       formData.append('namadepan', namadepan);
       formData.append('namabelakang', namabelakang);
       formData.append('aktif', aktif);
       formData.append('role', role);
       
      
          await axios.patch(`http://202.10.41.84:5000/api/users/update/${id}`,formData,{})
          .then(response => {
            if(response.status == 200){
              navigate('/users');
            }
            
          })
          .catch(error => {
              setError(error)
          });
}

  //hook useEffect
  useEffect(() => {
        
    //call method "fetchDetailPost"
    fetchDetailUser();

}, []);

  return (
    <div>
      <Navbar/>
      <Sidebar/>
      {/* Content Wrapper. Contains page content */}
<div className="content-wrapper">
  {/* Content Header (Page header) */}
  <section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1>Data Pengguna</h1>
        </div>
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item"><a href="#">Home</a></li>
            <li className="breadcrumb-item active">Pengguna</li>
          </ol>
        </div>
      </div>
    </div>{/* /.container-fluid */}
  </section>
  {/* Main content */}
  <section className="content">
    {/* Default box */}
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Form Ubah Pengguna</h3>
        <div className="card-tools">
          <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
            <i className="fas fa-minus" />
          </button>
          <button type="button" className="btn btn-tool" data-card-widget="remove" title="Remove">
            <i className="fas fa-times" />
          </button>
        </div>
      </div>
      <div className="card-body">
      <form onSubmit={saveUpdate}>
      {
            msgerror.message && (
                <div className="alert alert-danger">
                    {msgerror}
                </div>
            )
        }

<div className="form-group">
                <label>Nama Depan</label>
                <input type="text" className="form-control" placeholder="Masukkan Nama Depan" value={namadepan} 
                        onChange={(e)=> setNamaDepan(e.target.value)}/>
            </div>

            <div className="form-group">
                <label>Nama Belakang</label>
                <input type="text" className="form-control"  placeholder="Masukkan Nama Belakang" value={namabelakang} 
                        onChange={(e)=> setNamaBelakang(e.target.value)}/>
            </div>
            <div className="form-group">
                <label>Email</label>
                <input type="text" className="form-control"  placeholder="Masukkan Email" value={email} 
                        onChange={(e)=> setEmail(e.target.value)}/>
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control"  placeholder="Masukkan Password"
                        onChange={(e)=> setPassword(e.target.value)}/>
            </div>

            <div className="form-group">
                <label>Role</label>
                <select className="form-control" value={role} 
                        onChange={(e)=> setRole(e.target.value)}>
                    <option value="admin">Administrator</option>
                    <option value="member">Member</option>
                </select>
            </div>

            <div className="form-group">
                <label>Aktif</label>
                <select className="form-control" value={aktif} 
                        onChange={(e)=> setAktif(e.target.value)}>
                    <option value="Y">Aktif</option>
                    <option value="T">Tidak Aktif</option>
                </select>
            </div>

        
      
      <div className="row">
        <div className='col-12'>
          <Link to={`/users`} className='btn btn-xs btn-danger mr-2'><i className='fa fa-times'></i> Kembali</Link>
          <button type="submit" className="btn btn-success"><i className='fas fa-check'></i> Simpan Data</button>
        </div>
      </div>
      </form>
      </div>
      {/* /.card-body */}
     

    </div>
    {/* /.card */}
  </section>
  {/* /.content */}
  
  
</div>
{/* /.content-wrapper */}

			<Footer/>
    </div>
  )
}

export default UserEdit