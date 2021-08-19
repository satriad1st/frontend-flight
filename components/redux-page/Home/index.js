import { connect } from "react-redux";
import React, { useState, useRef, useEffect } from "react";
import AdminLayout from "../../layout/admin/AdminLayout";
import Loading from "../../layout/loading/index";
import NoData from "../../layout/handle/NoData";
import BootstrapTable from 'react-bootstrap-table-next';
import {loadDataHome, setLoading } from "../../../redux/actions";
import Swal from 'sweetalert2';
const { getTiket, getPegiPegi , getMisterALadin } = require("../../../service/comparison");
const {imageFormatter , balanceFormatter, soldFormatter} = require ("../../layout/formatter/index");
const { getUserData } = require("../../../util/authentication");


function Index(state) {
    
    const [userdata, setUserdata] = useState(
        getUserData() || ''
    );

  
    return (
        <AdminLayout
            contentTitle={""}
            contentTitleButton={<></>}
            url=""
        >
            <div className="row">
                <div className="col-12">
                    <div className="card mt-3">
                        <div className="card-header" style={{backgroundColor:"#f9f9fc"}}></div>
                        <div className="row" style={{minHeight:"400px"}}>
                            <div className="col-lg-12 col-md-12 col-12 d-flex align-items-center justify-content-center"> 
                                <p className="text-center h-size">Selamat Datang Di Website Perbandingan Harga Tiket Pesawat Terbang</p>    
                            </div>
                            <div className="col-lg-12 col-md-12 col-12 d-flex align-items-center justify-content-center"> 
                                <img src="images/tiket.jpeg" className="image-width"/>
                                <img src="images/agoda.png" className="image-width"/>
                                <img src="images/pegipegi.jpg" className="image-width"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export default connect((state) => state)(Index);
