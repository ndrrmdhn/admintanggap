import React, {useEffect, useState} from 'react';
import Footer from '../main/Footer';
import Sidebar from '../main/Sidebar';
import Navbar from '../main/Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';


function Aduanbaru() {
  const [aduan, setAduan] = useState([]);
    
  const token = localStorage.getItem("token");

  const getAduan = async () => {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await axios.get('http://202.10.41.84:5000/api/aduan/get/baru')
          .then(response => {
              
              //assign response data to state "posts"
              setAduan(response.data.data);
              console.log(response.data.data);
          });
  }
  useEffect(()=>{
      getAduan();
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
          <h1>Pengaduan</h1>
        </div>
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item"><a href="#">Home</a></li>
            <li className="breadcrumb-item active">Blank Page</li>
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
        <h3 className="card-title">Daftar Pengaduan Baru</h3>
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
        <table className='table table-bordered table-striped' id="tabledata">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Judul</th>
                    <th>Tanggal</th>
                    <th>Nama Pengguna</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {
                    aduan.length > 0
                        ? aduan.map((aduan, index)=>(
                    <tr key={aduan.id}>
                        <td>{index + 1}</td>
                        <td>{aduan.judul}</td>
                        <td>{dateFormat(aduan.createdAt,'dd/mm/yyyy HH:mm')} WIB</td>
                        <td>{aduan.User.nama_depan} {aduan.User.nama_belakang}<br />
<small>{aduan.User.email}</small></td>
                        <td><span className='badge bg-info'>BARU</span></td>
                        <td>
                            <Link to={`/aduanedit/${aduan.id}`} className='btn btn-xs btn-info mr-2'><i className='fa fa-edit'></i></Link>
                           
                        </td>
                    </tr>
                ))
              : <tr className='bg-danger'>
              <td colSpan="54" className="text-center">
                
                      Data Belum Tersedia!
              </td>
          </tr>
          }
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

export default Aduanbaru