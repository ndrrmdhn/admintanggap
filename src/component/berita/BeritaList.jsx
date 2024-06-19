import React, {useEffect, useState} from 'react';
import Footer from '../main/Footer';
import Sidebar from '../main/Sidebar';
import Navbar from '../main/Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import dateFormat from 'dateformat';

function BeritaList() {

  const [berita, setBerita] = useState([]);
    
  const token = localStorage.getItem("token");

  const getBerita = async () => {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await axios.get('http://202.10.41.84:5000/api/berita/get')
          .then(response => {
              
              //assign response data to state "posts"
              setBerita(response.data.data);
              console.log(response.data.data);
          });
  }

  const deleteBerita = async(id) => {
    try {
      if(confirm('Apakah yakin akan menghapus data ini?')){
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await axios.delete(`http://202.10.41.84:5000/api/berita/delete/${id}`);
        getBerita();
        setMessage({msg:'Hapus Data Berhasil'});

      }
      
    } catch (error) {
        console.log(error);
    }
  }
  useEffect(()=>{
      getBerita();
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
          <h1>Daftar Berita</h1>
        </div>
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item"><a href="#">Home</a></li>
            <li className="breadcrumb-item active">Berita</li>
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
        <h3 className="card-title"><Link to={`/beritaadd`} className='btn btn-xs btn-success mr-2'><i className='fa fa-plus'></i> Tambah Data</Link></h3>
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
                    <th>Gambar</th>
                    <th>Tgl. Buat</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {
                    berita.length > 0
                        ?   berita.map((post, index) => (
                                <tr key={ post.id }>
                                  <td>{index + 1}</td>
                                  <td>{ post.judul }</td>
                                    <td className='text-center'>
                                        <img src={post.foto} alt={post.judul} width="64" className='rounded' />
                                    </td>
                                    
                                    <td>{ dateFormat(post.createdAt, "dd/mm/yyyy HH:mm") } WIB</td>
                                    <td className="text-center">
                                        <Link to={`/beritaedit/${post.id}`} className="btn btn-sm btn-primary rounded-sm shadow border-0 me-2"><i className='fa fa-edit'></i></Link>
                                        <button onClick={()=> deleteBerita(post.id)} className='btn btn-xs btn-danger rounded-sm shadow border-0 me-2 btn-sm'><i className='fa fa-trash'></i></button>
                                    </td>
                                </tr>
                            ))

                        :   <tr className='bg-danger'>
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

export default BeritaList