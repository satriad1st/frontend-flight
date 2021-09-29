import { connect } from "react-redux";
import React, { useState, useRef, useEffect } from "react";
import AdminLayout from "../../../components/layout/admin/AdminLayout";
import Loading from "../../layout/loading/index";
import NoData from "../../layout/handle/NoData";
import BootstrapTable from 'react-bootstrap-table-next';
import {loadData1, loadData3,loadData2, setLoading, setLoading2, setLoading3 } from "../../../redux/actions";
import Swal from 'sweetalert2';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
const { getTiket, getPegiPegi , getMisterALadin, getAgoda } = require("../../../service/comparison");
const { getUserData } = require("../../../util/authentication");
const config = require("../../../config/config.json")


function Tiket(state) {
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

    const [optionsAirport , setOptionsAirport] = useState(config.flight_code.data)
    const [optionsMaskapai ,setOptionsMaskapai] = useState(config.maskapai.data)
    const [optionsTime ,setOptionsTime] = useState(config.time.data)
    const [selectedDate, setDate] = useState(new Date());
    const [key, setKey] = useState('tiket');
    const [mergeData, setMergeData] = useState([]);

    function reproduceDepartureArrival(content){
        let findData = config.flight_code.data.filter((data) =>  data['value'] == content);
        if (findData.length > 0) {
            return findData[0].label + " ("+content+")"
        }else{
            return content
        }
    }

    function reproduceLogo(content, logo){
        let findData = config.maskapai.data.filter((data) =>  data['value'] && content.toLowerCase().includes(data['value'].toLowerCase()));
        if (findData.length > 0) {
            return findData[0].images
        }else{
            return logo
        }
    }

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
                        <span className="ml-2 font-weight-bold"> <img src={reproduceLogo(cellContent , row.logo)} style={{width:"60px"}}/>  </span>
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
                      <p className="font-weight-bold mb-0">{reproduceDepartureArrival(cellContent)}</p>
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
                    <p className="font-weight-bold mb-0">{reproduceDepartureArrival(cellContent)}</p>
                    <p className="">{row.time_arrival}</p>
                  </div>
              );
          }
        },
        {
            dataField: 'duration',
            text : "Durasi",
            headerStyle: {
                width: '10%',
                whiteSpace : "nowrap"
            },
            formatter: (cellContent, row) => {
                return (
                    <div>
                      <p className="font-weight-bold mb-0">{cellContent.replace("h","j")}</p>
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
    
    const columnsAll = [
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
            dataField: 'source',
            text : "Sumber",
            headerStyle: {
                width: '10%',
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
            dataField: 'title',
            text : "Maskapai",
            headerStyle: {
                width: '20%',
                whiteSpace : "nowrap"
            },
            formatter: (cellContent, row) => {
                return (
                    <div>
                        <span className="ml-2 font-weight-bold"> <img src={reproduceLogo(cellContent , row.logo)} style={{width:"60px"}}/>  </span>
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
                      <p className="font-weight-bold mb-0">{reproduceDepartureArrival(cellContent)}</p>
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
                    <p className="font-weight-bold mb-0">{reproduceDepartureArrival(cellContent)}</p>
                    <p className="">{row.time_arrival}</p>
                  </div>
              );
          }
        },
        {
            dataField: 'duration',
            text : "Durasi",
            headerStyle: {
                width: '10%',
                whiteSpace : "nowrap"
            },
            formatter: (cellContent, row) => {
                return (
                    <div>
                      <p className="font-weight-bold mb-0">{cellContent.replace("h","j")}</p>
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

        let temporary = []
        let response = await getTiket(payload);
        if (response != null) {
          let code = response.code;
          if (code == 200) {
            let filteredData = selectedMaskapai.value ? filterByValue(response.data, selectedMaskapai.value , 'title') : response.data
            filteredData = selecetedTime.value ? filterByValue(filteredData, selecetedTime.value , 'time_departure') : filteredData
            state.dispatch(loadData1(filteredData))
            state.dispatch(setLoading(false))
            temporary = filteredData ? filteredData : [];
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
              let filteredData = selectedMaskapai.value ? filterByValue(response2.data, selectedMaskapai.value , 'title') : response2.data
              filteredData = selecetedTime.value ? filterByValue(filteredData, selecetedTime.value , 'time_departure') : filteredData
              state.dispatch(loadData2(filteredData))
              state.dispatch(setLoading2(false))
              temporary = filteredData ? temporary.concat(filteredData) : temporary;
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
              let filteredData = selectedMaskapai.value ? filterByValue(response3.data, selectedMaskapai.value , 'title') : response3.data
              filteredData = selecetedTime.value ? filterByValue(filteredData, selecetedTime.value , 'time_departure') : filteredData
              state.dispatch(loadData3(filteredData))
              state.dispatch(setLoading3(false))
              temporary = filteredData ? temporary.concat(filteredData) : temporary;
              let price;
              for(const element of temporary) {
                price = element.price
                if(element.source == "tiket.com"){
                    price = price.replace("IDR ","");
                    price = price.replace(/\./g,"")
                    price = parseFloat(price)
                }

                if(element.source == "pegipegi"){
                    price = price.replace("Rp ","");
                    price = price.replace(/\./g,"")
                    price = parseFloat(price)
                }

                if(element.source == "agoda"){
                    price = price.replace("Rp. ","");
                    price = price.replace(/,/g,"")
                    price = parseFloat(price);
                }

                element.real_price = price;
              }
              temporary.sort(function (a, b) {
                return a.real_price - b.real_price;
              });
              console.log(temporary)
              setMergeData(selectedMaskapai.value ? filterByValue(temporary, selectedMaskapai.value , 'title') : temporary);
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

    function filterByValue(array, string , key) {
        return array.filter((data) =>  data[key].toLowerCase().includes(string.toLowerCase()));
    }

    function filterByTimeAndMaskapai(array) {
        let temporary;
        if(selectedMaskapai.value){
            temporary =  array.filter((data) =>  data['title'].toLowerCase().includes(selectedMaskapai.value.toLowerCase()));
        }

        if(selecetedTime.value &&  temporary){
            temporary = temporary.filter((data) =>  data['time_departure'].toLowerCase().includes(selecetedTime.value.toLowerCase()));
        }
        
        return selecetedTime.value || selectedMaskapai.value ? temporary : array
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

    function onSelectMaskapai(selectedOption) {
        setMaskapai(selectedOption)
    }

    function onSelectTime(selectedOption) {
        setTime(selectedOption)
    }

    function onDateChange(date) {
        setDate(date);
    }

    function setKeyTab(key){
        setKey(key);
    }

    return (
        <AdminLayout
            contentTitle={"Perbandingan Harga Tiket Pesawat "}
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
                        <div className="row">  
                        </div>
                        <Tabs
                            fill justify
                            id="all"
                            activeKey={key}
                            onSelect={(k) => setKeyTab(k)}
                        >
                                <Tab eventKey="all" title={<b>Semua</b>} >  
                                {state.loading==false  && state.loading2==false && state.loading3 == false?
                                    (mergeData!=null ? 
                                        <div>
                                            <div className="card-body table-responsive ">
                                                <BootstrapTable
                                                    keyField="no"
                                                    data={ filterByTimeAndMaskapai(mergeData) }
                                                    columns={ columnsAll }
                                                    bordered={ false }
                                                    hover
                                                />
                                                {mergeData && mergeData.length<1 ? <NoData image="images/no-data.png" title="NO DATA Flight" 
                                                    description="No Data Flight yet"/> : ""
                                                } 
                                            </div>
                                        </div>
                                    : <NoData image="images/no-data.png" title="No Data Flight" 
                                    description="Silahkan Pilih Jadwal Penerbangan Kota Keberangkatan dan Kota Tujuan"/> ): <Loading color={"#964b00"} height={'12%'} width={'12%'} /> 
                                }  
                            </Tab>
                            <Tab eventKey="tiket" title={<b>Tiket</b>} >  
                            {state.loading==false ?
                                (state.data1!=null ? 
                                    <div>
                                        <div className="card-body table-responsive ">
                                            <BootstrapTable
                                                keyField="no"
                                                data={ state.data1 }
                                                columns={ columns }
                                                bordered={ false }
                                                hover
                                            />
                                            {state.data1 && state.data1.length<1 ? <NoData image="images/no-data.png" title="NO DATA Flight" 
                                                description="No Data Flight yet"/> : ""
                                            } 
                                        </div>
                                    </div>
                                : <NoData image="images/no-data.png" title="No Data Flight" 
                                description="Silahkan Pilih Jadwal Penerbangan Kota Keberangkatan dan Kota Tujuan"/> ): <Loading color={"#964b00"} height={'12%'} width={'12%'} /> 
                            }  
                        </Tab>
                        <Tab eventKey="pegipegi" title={<b>PegiPegi</b>} >  
                            {state.loading2==false ?
                                (state.data2!=null ? 
                                    <div>
                                        <div className="card-body table-responsive ">
                                            <BootstrapTable
                                                keyField="no"
                                                data={ state.data2 }
                                                columns={ columns }
                                                bordered={ false }
                                                hover
                                            />
                                            {state.data2 && state.data2.length<1 ? <NoData image="images/no-data.png" title="NO DATA Flight" 
                                                description="No Data Flight yet"/> : ""
                                            } 
                                        </div>
                                    </div>
                                : <NoData image="images/no-data.png" title="No Data Flight" 
                                description="Silahkan Pilih Jadwal Penerbangan Kota Keberangkatan dan Kota Tujuan"/> ): <Loading color={"#964b00"} height={'12%'} width={'12%'} /> 
                            }  
                        </Tab>
                        <Tab eventKey="agoda" title={<b>Agoda</b>} >  
                            {state.loading3==false ?
                                (state.data3!=null ? 
                                    <div>
                                        <div className="card-body table-responsive ">
                                            <BootstrapTable
                                                keyField="no"
                                                data={ state.data3 }
                                                columns={ columns }
                                                bordered={ false }
                                                hover
                                            />
                                            {state.data3 && state.data3.length<1 ? <NoData image="images/no-data.png" title="NO DATA Flight" 
                                                description="No Data Flight yet"/> : ""
                                            } 
                                        </div>
                                    </div>
                                : <NoData image="images/no-data.png" title="No Data Flight" 
                                description="Silahkan Pilih Jadwal Penerbangan Kota Keberangkatan dan Kota Tujuan"/> ): <Loading color={"#964b00"} height={'12%'} width={'12%'} /> 
                            }  
                        </Tab>
                    </Tabs>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export default connect((state) => state)(Tiket);
