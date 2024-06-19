import React, {useEffect, useState} from 'react';
import Footer from '../main/Footer';
import Sidebar from '../main/Sidebar';
import Navbar from '../main/Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';

function UsersList() {

  //ini state
  const [users, setUsers] = useState([]);
  const [successmsg, setMessage] = useState([]);

  const token = localStorage.getItem("token");
  

  //define method
  const fetchDataUsers = async () => {

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      //fetch data from API with Axios
      await axios.get('http://202.10.41.84:5000/api/users/list')
          .then(response => {
              
              //assign response data to state "posts"
              setUsers(response.data.data);
              console.log(response.data.data);
          });
      
  }
  


    const deleteUser = async(id) => {
      try {
        if(confirm('Apakah yakin akan menghapus data ini?')){
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          await axios.delete(`http://202.10.41.84:5000/api/users/delete/${id}`);
          fetchDataUsers();
          setMessage({msg:'Hapus Data Berhasil'});

        }
        
      } catch (error) {
          console.log(error);
      }
    }

    useEffect(()=>{
        fetchDataUsers();
    },[]);

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
        <h3 className="card-title"><Link to={`/useradd`} className='btn btn-xs btn-success mr-2'><i className='fa fa-plus'></i> Tambah Data</Link></h3>
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
      {
            successmsg.msg && (
                <div className="alert alert-success">
                    {successmsg.msg}
                </div>
            )
        }
      <table className='table table-bordered table-striped' id="tabledata">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Nama Depan</th>
                    <th>Nama Belakang</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Aktif</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
              
                {users.map((duser, index)=>(
                    <tr key={duser.id}>
                        <td>{index + 1}</td>
                        <td>{duser.nama_depan}</td>
                        <td>{duser.nama_belakang}</td>
                        <td>{duser.email}</td>
                        <td>{duser.level}</td>
                        <td>{duser.aktif}</td>
                        <td>
                            <Link to={`/useredit/${duser.id}`} className='btn btn-xs btn-info mr-2'><i className='fa fa-edit'></i></Link>
                            <button onClick={()=> deleteUser(duser.id)} className='btn btn-xs btn-danger'><i className='fa fa-trash'></i></button>
                            
                        </td>
                    </tr>
                ))}
                
            </tbody>
           </table>
      </div>
      {/* /.card-body */}
      <div className="card-footer">
      </div>
      {/* /.card-footer*/}
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

export default UsersList