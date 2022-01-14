import { useQuery } from 'react-query'
import { fetchCoinHistory } from './api'
import ApexChart from "react-apexcharts";
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atoms'




interface ChartProps {
  coinId : string;
}

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

export default function Chart({coinId}:ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const {isLoading,data} = useQuery<IHistorical[]>(["ohlcv", coinId],()=>fetchCoinHistory(coinId),
  {
    refetchInterval:10000
  })

  return (
    <div>
      {
        isLoading ? 
        "Loading chart..." : 
        <ApexChart 
        type="line" 
        series={[
          {
            name:"판매가격",
            data: data?.map((price)=>price.close)
          }
        ]}
        options={{
          theme:{
            mode: isDark ? "dark" : "light"
          },
          chart:{
            height:300,
            width:500,
            toolbar:{
              show:false
            }
          },
          grid: {
            show:false
          },
          stroke: {
            curve:"smooth",
            width:4
          },
          yaxis:{
            show:false
          },
          xaxis:{
            labels: { show: false },
            type:"datetime",
            categories: data?.map((price) => price.time_close),    
          },
          fill:{
            type:"gradient",
            gradient:{
              gradientToColors:["#0be881"],
              stops:[0,100]
            }
          },
          colors: ["#0fbcf9"],
          tooltip:{
            y:{
              formatter:(value)=>`$ ${value.toFixed(2)}`
            }
          }
        }}/> 
        
      }
      
      *최근 2주간 코인 판매 가격입니다. (달러기준)
      
        
      
    </div>
  )
}
