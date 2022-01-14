import { useQuery } from 'react-query';
import { fetchCoinTickers } from './api';
import styled,{keyframes} from 'styled-components';

const priceani = keyframes`
    0%{
      opacity:0;
    }50%{
      opacity:0.5;
    }100%{
      opacity:1;
    }
  `;

const Container = styled.div`
  padding:0px 5px;
  max-width: 480px;
  margin:0 auto;
`;

const Tag = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: ${(props) => props.theme.textColor};
  padding: 10px 15px;
  margin-top: 15px;
  margin-bottom: 15px;
  animation: ${priceani} 1s ease-in-out;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.5);
`;

const TagItem = styled.div`
  font-size: 20px;
  font-weight: 600;
  
`;

const Title = styled.h1`
  font-size: 15px;
  font-weight: 1000;
`;

interface PriceData{
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}



export default function Price({coinId}:{coinId:string}) {
  const { isLoading,data} = 
  useQuery<PriceData>(["price",coinId], ()=>fetchCoinTickers(coinId),
  {
    refetchInterval:10000
  })
  
  return (
    <Container>
      {
        isLoading ? "Loading Price..." :
        <>
          <Tag>
            <Title>현재가격 :</Title>
            <TagItem>
              <span>{data?.quotes.USD.price.toFixed(2)}$</span>
            </TagItem>
          </Tag>
          <Tag>
            <Title>역대최고가 :</Title>
            <TagItem>
              <span>{data?.quotes.USD.ath_price.toFixed(2)}$</span>
            </TagItem>
          </Tag>
          <Tag>
            <Title>역대최고가 날짜 :</Title>
            <TagItem>
              <span>{data?.quotes.USD.ath_date}</span>
            </TagItem>
          </Tag>
          <Tag>
            <Title>1시간 가격변동 :</Title>
            <TagItem>
              <span>{data?.quotes.USD.percent_change_1h}</span>
            </TagItem>
          </Tag>
          <Tag>
            <Title>6시간 가격변동 :</Title>
            <TagItem>
              <span>{data?.quotes.USD.percent_change_6h}</span>
            </TagItem>
          </Tag>
          <Tag>
            <Title>24시간 가격변동 :</Title>
            <TagItem>
              <span>{data?.quotes.USD.percent_change_24h}</span>
            </TagItem>
          </Tag>
          <span>*달러환율 기준입니다.</span>
        </>
        
        
      }
    </Container>
  )
}
