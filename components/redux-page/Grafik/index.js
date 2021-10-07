import { connect } from "react-redux";
import React, { useState, useRef, useEffect } from "react";
import AdminLayout from "../../layout/admin/AdminLayout";
import Loading from "../../layout/loading/index";
import {loadData1, loadData3,loadData2, setLoading, setLoading2, setLoading3 } from "../../../redux/actions";
import Swal from 'sweetalert2';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import VerticalBar from "../Grafik/VerticalBar";
const { getTiket, getPegiPegi , getMisterALadin, getAgoda } = require("../../../service/comparison");
const { getUserData } = require("../../../util/authentication");
const config = require("../../../config/config.json")


function Grafik(state) {
    const [userdata, setUserdata] = useState(
        getUserData() || ''
    );
    const [ selectedOrigin, setOrigin ] = useState({
        value : null,
        label : "Kota Keberangkatan"
    });

    const [ selectedDestination, setDestination ] = useState({
        value : null,
        label : "Pilih Kota Tujuan"
    });

    const [ selectedMaskapai, setMaskapai ] = useState({
        value : null,
        label : "Pilih Maskapai Penerbangan"
    });


    const [selecetedTime ,setTime] = useState({
        value : null,
        label : "Pilih Waktu Penerbangan"
    })


    const [optionsMaskapai ,setOptionsMaskapai] = useState(config.maskapai.data)
    const [optionsTime ,setOptionsTime] = useState(config.time.data)
    const [optionsAirport , setOptionsAirport] = useState(config.flight_code.data)
    const [selectedDate, setDate] = useState(new Date());
    const [key, setKey] = useState('tiket');
    const columns = [
        {
            dataField: 'no',
            text : "No",
            formatter: (cell, row, rowIndex, extraData) => (
                  <strong>{rowIndex + 1}</strong>
            ),
            headerStyle: {
                whiteSpace : "nowrap"
            }
        },  
        {
            dataField: 'title',
            text : "Maskapai",
            headerStyle: {
                width: '20%',
                whiteSpace : "nowrap"
            },
            formatter: (cellContent, row) => {
                return (
                    <div>
                      <span className="ml-2 font-weight-bold"> <img src={row.logo} style={{width:"60px"}}/>  </span>
                    </div>
                );
            }
        },
        {
            dataField: 'departure',
            text : "Keberangkatan",
            headerStyle: {
                width: '15%',
                whiteSpace : "nowrap"
            },
            formatter: (cellContent, row) => {
                return (
                    <div>
                      <p className="font-weight-bold mb-0">{cellContent}</p>
                      <p className="">{row.time_departure}</p>
                    </div>
                );
            }
        },
        {
            dataField: 'arrival',
            text : "Kedatangan",
            headerStyle: {
                width: '30%',
                whiteSpace : "nowrap"
            },
            formatter: (cellContent, row) => {
              return (
                  <div>
                    <p className="font-weight-bold mb-0">{cellContent}</p>
                    <p className="">{row.time_arrival}</p>
                  </div>
              );
          }
        },
        {
            dataField: 'duration',
            text : "Durasi",
            headerStyle: {
                width: '15%',
                whiteSpace : "nowrap"
            },
            formatter: (cellContent, row) => {
                return (
                    <div>
                      <p className="font-weight-bold mb-0">{cellContent}</p>
                    </div>
                );
            }
        },
        {
            dataField: 'price',
            text : "Harga",
            headerStyle: {
                whiteSpace : "nowrap",
                width:"50%"
            },
            headerFormatter : (column, colIndex) => {
                return (
                    <span className="ml-2">{column.text}</span>
                );
            },
            formatter: (cellContent, row) => {
                return (
                    <div>
                      <span className="ml-2">{cellContent}</span>
                    </div>
                );
            }
        },
    ];

    function onSelectMaskapai(selectedOption) {
        setMaskapai(selectedOption)
    }

    function onSelectTime(selectedOption) {
        setTime(selectedOption)
    }

        function filterByTimeAndMaskapai(array) {
        let temporary;
        if(selectedMaskapai.value){
            temporary =  array.filter((data) =>  data['title'].toLowerCase().includes(selectedMaskapai.value.toLowerCase()));
        }else{
            temporary = array
        }

        if(selecetedTime.value &&  temporary){
            temporary = temporary.filter((data) =>  data['time_departure'].toLowerCase().includes(selecetedTime.value.toLowerCase()));
        }
        
        return selecetedTime.value || selectedMaskapai.value ? temporary : array
    }
    const processData = async () => {
        state.dispatch(setLoading(true))
        state.dispatch(setLoading2(true))
        state.dispatch(setLoading3(true))
        var d = new Date(selectedDate),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        let payload = {
            date : [year, month, day].join('-'),
            dateIndo : [day, month, year].join('-'),
            origin : selectedOrigin.value,
            destination : selectedDestination.value,
        }
        let response = await getTiket(payload);
        if (response != null) {
          let code = response.code;
          if (code == 200) {
            state.dispatch(loadData1(response.data))
            state.dispatch(setLoading(false))
          } else if (code == 403) {
            state.dispatch(loadData1(null))
            state.dispatch(setLoading(false))
          } else if (code == 404) {
            state.dispatch(loadData1(null))
            state.dispatch(setLoading(false))
          } else if (code == 400) {
            state.dispatch(loadData1(null))
            state.dispatch(setLoading(false))
          } else{
            state.dispatch(loadData1(null))
            state.dispatch(setLoading(false))
          }
        }

        let response2 = await getPegiPegi(payload);
        if (response2 != null) {
            let code = response2.code;
            if (code == 200) {
              state.dispatch(loadData2(response2.data))
              state.dispatch(setLoading2(false))
            } else if (code == 403) {
              state.dispatch(loadData2(null))
              state.dispatch(setLoading2(false))
            } else if (code == 404) {
              state.dispatch(loadData2(null))
              state.dispatch(setLoading2(false))
            } else if (code == 400) {
              state.dispatch(loadData2(null))
              state.dispatch(setLoading2(false))
            } else{
              state.dispatch(loadData2(null))
              state.dispatch(setLoading2(false))
            }
        }
        
        let response3 = await getAgoda(payload);
        if (response3 != null) {
            let code = response3.code;
            if (code == 200) {
              state.dispatch(loadData3(response3.data))
              state.dispatch(setLoading3(false))
            } else if (code == 403) {
              state.dispatch(loadData3(null))
              state.dispatch(setLoading3(false))
            } else if (code == 404) {
              state.dispatch(loadData3(null))
              state.dispatch(setLoading3(false))
            } else if (code == 400) {
              state.dispatch(loadData3(null))
              state.dispatch(setLoading3(false))
            } else{
              state.dispatch(loadData3(null))
              state.dispatch(setLoading3(false))
            }
        }

    } 

    function onDelete(e, id) {
        e.preventDefault();
        Swal.fire({
          text: "Hapus Home?",
          width: '300px',
          showCancelButton: true,
          confirmButtonText: 'Hapus',
          cancelButtonText: 'Batal',
          confirmButtonColor: '#964b00',
          showLoaderOnConfirm: true,
          preConfirm: () => {
            if (id == null) {
              return null;
            }
            return deleteHome(userdata.token, id);
          },
          allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
          if (result.value) {
            processHome();
            Swal.fire({
              text: "Data di hapus",
              width: '300px',
              confirmButtonColor: '#964b00',
              confirmButtonText: 'Tutup'
            });
          }
        });
    }

    function onSelectChangeOrigin(selectedOption) {
        setOrigin(selectedOption)
    }

    function onSelectChangeDestination(selectedOption) {
        setDestination(selectedOption)
    }

    function onDateChange(date) {
        setDate(date);
    }

    function setKeyTab(key){
        setKey(key);
    }

    return (
        <AdminLayout
            contentTitle={"Grafik Harga Termurah"}
            contentTitleButton={<></>}
            url=""
        >
            <div className="row">
                <div className="col-12">
                    <div className="card mt-3">
                        <div className="card-header" style={{backgroundColor:"#f9f9fc"}}>
                        <div className="row">
                                <div className="col-md-4 col-sm-12 mb-1">
                                    <Select
                                        value={selectedOrigin}
                                        onChange={onSelectChangeOrigin}
                                        placeholder={"Pilih Kota Keberangkatan"}
                                        options={optionsAirport}
                                    />
                                </div>
                                <div className="col-md-4 col-sm-12 mb-1">
                                    <Select
                                        value={selectedDestination}
                                        onChange={onSelectChangeDestination}
                                        placeholder={"Pilih Kota Tujuan"}
                                        options={optionsAirport}
                                    />
                                </div>
                                <div className="col-md-4 col-sm-12 mb-1">
                                    <DatePicker
                                        selected={selectedDate}
                                        dateFormat="dd/MM/yyyy"
                                        onChange={date => onDateChange(date)}
                                        peekNextMonth
                                        showMonthDropdown
                                        showYearDropdown
                                        minDate={new Date()}
                                        dropdownMode="select"
                                        className="form-control"
                                        disabled={state.isLoading}
                                    />
                                </div>
                               <div className="col-md-4 col-sm-12 mb-1">
                                    <Select
                                        value={selectedMaskapai}
                                        onChange={onSelectMaskapai}
                                        placeholder={"Pilih Maskapai"}
                                        options={optionsMaskapai}
                                    />
                                </div>
                                <div className="col-md-4 col-sm-12 mb-1">
                                    <Select
                                        value={selecetedTime}
                                        onChange={onSelectTime}
                                        placeholder={"Pilih Jam Penerbangan"}
                                        options={optionsTime}
                                    />
                                </div> 
                                <div className="col-md-4  col-sm-12 mb-1">
                                    <button
                                        id="appliedButton"
                                        type="button"
                                        className="btn btn-block"
                                        style={{backgroundColor : "#964b00",color :"white"}}
                                        onClick={processData}
                                        disabled={
                                            ( selectedDestination.value == null || selectedOrigin.value == null ||
                                            state.loading ) 
                                        }
                                        >
                                        {state.loading ? (<i className="fa fa-refresh fa-spin"></i>) : "SUBMIT" }
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="row m-4 centerFlex">  
                            {state.loading || state.loading2 || state.loading3 ? <Loading color={"#964b00"} height={'12%'} width={'12%'} />  : state.data1 && state.data2 && state.data3 ?
                                <VerticalBar data1={filterByTimeAndMaskapai(state.data1)} data2={filterByTimeAndMaskapai(state.data2)} data3={filterByTimeAndMaskapai(state.data3)}/> : "" }
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export default connect((state) => state)(Grafik);
