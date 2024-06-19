import React, {useEffect, useState} from 'react';
import Footer from '../main/Footer';
import Sidebar from '../main/Sidebar';
import Navbar from '../main/Navbar';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

function BeritaEdit() {
  const [image, setImage] = useState('');
  const [judul, setTitle] = useState('');
  const [isi, setContent] = useState('');
  const [foto, setFoto] = useState('');

  //state validation
  const [errors, setErrors] = useState([]);

  //destruct ID
  const { id } = useParams();

  //useNavigate
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const getBerita = async () => {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await axios.get(`http://202.10.41.84:5000/api/berita/get/${id}`)
          .then(response => {
              
              //assign response data to state "posts"
              setTitle(response.data.data.judul);
              setContent(response.data.data.isi);
              setFoto(response.data.data.foto);
              console.log(response.data.data);
          });
  }
  useEffect(()=>{
      getBerita();
  },[]);

  //method handle file change
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  }

  const saveHandler = async (e) => {
    e.preventDefault();
    
    //init FormData
    const formData = new FormData();

    //append data
    formData.append('image', image);
    formData.append('judul', judul);
    formData.append('isi', isi);

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    //send data with API
    await axios.put(`http://202.10.41.84:5000/api/berita/update/${id}`, formData,{
      headers: {
        "Content-type": "multipart/form-data",
      },
    }).then(() => {
            
            //redirect to posts index
            navigate('/beritalist');

        })
        .catch(error => {
            
            //set errors response to state "errors"
            setErrors(error.response.data);
        })
}
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
          <h1>Berita</h1>
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
        <h3 className="card-title">Update Berita</h3>
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
      <form onSubmit={saveHandler}>
      {
            errors.message && (
                <div className="alert alert-danger">
                    {errors.message}
                </div>
            )
        }

            <div className="form-group">
                <label>Judul Berita</label>
                <input type="text" className="form-control" placeholder="Masukkan Judul Berita" value={judul} 
                        onChange={(e)=> setTitle(e.target.value)}/>
            </div>

            <div className="form-group">
                <label>Isi Konten</label>
                <textarea className="form-control" onChange={(e) => setContent(e.target.value)} rows="5" placeholder="Isi Berita" value={isi}></textarea>
            </div>
            <div className="form-group">
                <label>Upload Gambar</label>
                <input type="file" onChange={handleFileChange} className="form-control"/>
                <img src={foto} width={300} className='img-fluid'/>
            </div>
        
      
      <div className="row">
        <div className='col-12'>
          <Link to={`/beritalist`} className='btn btn-xs btn-danger mr-2'><i className='fa fa-times'></i> Kembali</Link>
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

export default BeritaEdit