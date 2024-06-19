import React from "react";
import { Link } from "react-router-dom";

function Sidebar(){
    return (
        <div>
 {/* Main Sidebar Container */}
<aside className="main-sidebar sidebar-dark-primary elevation-4">
  {/* Brand Logo */}
  <Link to={'/home'} className="brand-link">
    <img src="/adminlte/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
    <span className="brand-text font-weight-light">Tanggap App</span>
  </Link>
  {/* Sidebar */}
  <div className="sidebar">
    {/* Sidebar user (optional) */}
    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
      <div className="image">
        <img src="/adminlte/dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
      </div>
      <div className="info">
        <Link to={'#'} className="d-block">Administrator</Link>
      </div>
    </div>
    {/* Sidebar Menu */}
    <nav className="mt-2">
      <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
        {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
        
       
        <li className="nav-item">
          <Link to={'/home'} className="nav-link">
            <i className="nav-icon fas fa-home" />
            <p>Home</p>
          </Link>
        </li>

        <li className="nav-header">PENGADUAN</li>
        <li className="nav-item">
          <Link to={'/aduanbaru'} className="nav-link">
            <i className="nav-icon fas fa-list text-warning" />
            <p>Pengaduan Baru</p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to={'/aduanproses'} className="nav-link">
            <i className="nav-icon fas fa-clone text-danger" />
            <p>Pengaduan Proses</p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to={'/aduanselesai'} className="nav-link">
            <i className="nav-icon fas fa-check-square text-success" />
            <p>Pengaduan Selesai</p>
          </Link>
        </li>

        <li className="nav-header">BERITA</li>
        <li className="nav-item">
          <Link to={'/beritaadd'} className="nav-link">
            <i className="nav-icon fas fa-file" />
            <p>Tambah Berita</p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to={'/beritalist'} className="nav-link">
            <i className="nav-icon fas fa-receipt" />
            <p>Daftar Berita</p>
          </Link>
        </li>

        <li className="nav-header">PENGATURAN</li>
        <li className="nav-item">
          <Link to={'/users'} className="nav-link">
            <i className="nav-icon fas fa-users" />
            <p>Data Pengguna</p>
          </Link>
        </li>

        <li className="nav-item">
          <Link to={'/'} className="btn btn-danger btn-block text-danger text-left nav-link">
            <i className="nav-icon fas fa-lock" />
            <p>
              Logout
            </p>
          </Link>
        </li>
        
        
      </ul>
    </nav>
    {/* /.sidebar-menu */}
  </div>
  {/* /.sidebar */}
</aside>

        </div>
    );
}

export default Sidebar;