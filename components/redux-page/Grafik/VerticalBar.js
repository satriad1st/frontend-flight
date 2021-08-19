import React from 'react';
import { Bar } from 'react-chartjs-2';


function VerticalBar(props){
    let price1,price2,price3 = 0;
    if(props.data1.length > 0){
        price1 = props.data1[0].price
        price1 = price1.replace("IDR ","");
        price1 = price1.replace(".","")
        price1 = parseFloat(price1)
    }

    
    if(props.data2.length > 0){
        price2 = props.data2[0].price
        price2 = price2.replace("Rp ","");
        price2 = price2.replace(".","")
        price2 = parseFloat(price2)
    }

    
    if(props.data3.length > 0){
        price3 = props.data3[0].price
        price3 = price3.replace("Rp. ","");
        price3 = price3.replace(",","")
        price3 = parseFloat(price3);
    }

    const data = {
        labels: ['Tiket.Com', 'Pegi-Pegi', 'Agoda'],
        datasets: [
          {
            label: '# of Price',
            data: [price1, price2 , price3],
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
      
    const options = {
    scales: {
        yAxes: [
        {
            ticks: {
            beginAtZero: true,
            },
        },
        ],
    },
    };
    return (        
        <>
            <Bar data={data} options={options} width={100} height={50}/>
        </>
    );
}

export default VerticalBar;