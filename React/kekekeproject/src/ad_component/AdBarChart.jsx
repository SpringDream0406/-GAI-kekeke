import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,Cell, Legend, ResponsiveContainer } from 'recharts';
import '../ad_css/Ad_BG.css'
const data = [
  {
    name: 'ㄱㄱ케이크',
   
    판매량: 30,
    
  },
  {
    name: 'ㄴㄴ케이크',
 
    판매량: 20,
 
  },
  {
    name: 'ㄷㄷ케이크',
   
    판매량: 12,
   
  },
  {
    name: 'ㅂㅂ케이크',
  
    판매량: 15,
 
  },
  {
    name: 'ㅌㅌ케이크',

    판매량: 7,
   
  },
  {
    name: 'ㅎㅎ케이크',
    
    판매량: 2,

  },

];
const sortedData = [...data].sort((a, b) => b.판매량 - a.판매량);

const colors = ['#F48A94', '#F0B4AE', '#FFD1B8', '#DCEBC2','#ADDCC8'];

export default class Example extends PureComponent {
  render() {
    return (
      <div style={{ fontFamily: 'Pretendard-Bold', width: '600px', height: '500px', marginLeft: '1020px', marginTop: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={sortedData}
            margin={{
              top: 5,
              right: 30,
              left: 30,
              bottom: 5,
            }}
            barSize={50}
          >
            <XAxis dataKey="name" scale="point" padding={{ left: 40, right: 10 }} tick={{ fontSize: 12 ,fontFamily: 'Pretendard-bold' }} />
            <YAxis tick={{ fontSize: 12 ,fontFamily: 'Pretendard-bold' }} />
            <Tooltip  tick={{ fontSize: 12 ,fontFamily: 'Pretendard-bold' }}/>
            <Legend  tick={{ fontSize: 12 ,fontFamily: 'Pretendard-bold' }}/>
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="판매량"  tick={{ fontSize: 12 ,fontFamily: 'Pretendard-bold' }}>
              {
                sortedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))
              }
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}