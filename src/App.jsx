import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './component/Home';
import Login from './component/Login';
import Aduanbaru from './component/aduan/Aduanbaru';
import Aduanproses from './component/aduan/Aduanproses';
import Aduanselesai from './component/aduan/Aduanselesai';
import BeritaAdd from './component/berita/BeritaAdd';
import BeritaEdit from './component/berita/BeritaEdit';
import BeritaList from './component/berita/BeritaList';
import UsersList from './component/users/UsersList';
import UserAdd from './component/users/UserAdd';
import UserEdit from './component/users/UserEdit';
import UserDetail from './component/users/UserDetail';
import Aduanedit from './component/aduan/Aduanedit';
import Aduandetail from './component/aduan/Aduandetail';



function App() {
    return(
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/aduanbaru" element={<Aduanbaru />} />
                    <Route path="/aduanproses" element={<Aduanproses />} />
                    <Route path="/aduanselesai" element={<Aduanselesai />} />
                    <Route path="/aduanedit/:id" element={<Aduanedit/>}/>
                    <Route path="/aduandetail/:id" element={<Aduandetail/>}/>
                    <Route path="/beritalist" element={<BeritaList/>}/>
                    <Route path="/beritaadd" element={<BeritaAdd/>}/>
                    <Route path="/beritaedit/:id" element={<BeritaEdit/>}/>
                    <Route path="/users" element={<UsersList/>}/>
                    <Route path="/useradd" element={<UserAdd/>}/>
                    <Route path="/useredit/:id" element={<UserEdit/>}/>
                    <Route path="/userdetail/:id" element={<UserDetail/>}/>

                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
