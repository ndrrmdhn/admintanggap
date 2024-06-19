import React, {useEffect, useState} from 'react';
import Footer from '../main/Footer';
import Sidebar from '../main/Sidebar';
import Navbar from '../main/Navbar';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import dateFormat from 'dateformat';

function Aduandetail() {
  const [judul, setJudul] = useState('');
  const [lokasi, setLokasi] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [uraian, setUraian] = useState('');
  const [tanggapan, setTanggapan] = useState('');
  const [foto, setFoto] = useState('');
  const [status, setStatus] = useState('');

  //state validation
  const [errors, setErrors] = useState([]);

  //destruct ID
  const { id } = useParams();

  //useNavigate
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const getAduan = async () => {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await axios.get(`http://202.10.41.84:5000/api/aduan/detail/${id}`)
          .then(response => {
              
              //assign response data to state "posts"
              setJudul(response.data.data.judul);
              setLokasi(response.data.data.lokasi);
              setTanggal(response.data.data.createdAt);
              setUraian(response.data.data.uraian);
              setTanggapan(response.data.data.tanggapan);
              setFoto(response.data.data.foto);
              setStatus(response.data.data.status);
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
            <li className="breadcrumb-item active">Pengaduan</li>
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
        <h3 className="card-title">Detail Pengaduan</h3>
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
            errors.message && (
                <div className="alert alert-danger">
                    {errors.message}
                </div>
            )
        }

            <div className="form-group">
                <label>Judul Aduan</label><br/>
                {judul}
            </div>

            <div className="form-group">
                <label>Lokasi</label><br/>
                {lokasi}
            </div>

            <div className="form-group">
                <label>Tanggal</label><br/>
                {dateFormat(tanggal,'dd/mm/yyyy HH:mm')} WIB
            </div>

            <div className="form-group">
                <label>Uraian</label><br />
                {uraian}
            </div>
            <div className="form-group">
                <label>Bukti Foto</label><br />
                <img src={foto} width={300} className='img-fluid'/>
            </div>

            <div className="form-group">
                <label>Status</label><br/>
                <span className='badge bg-success'>{status}</span>
            </div>

            <div className="form-group">
                <label>Tanggapan</label><br/>
                {tanggapan}
            </div>
        
      
      <div className="row">
        <div className='col-12'>
          <Link to={`/aduanselesai`} className='btn btn-xs btn-danger mr-2'><i className='fa fa-times'></i> Kembali</Link>
        </div>
      </div>
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

export default Aduandetail