import { Route,Switch, useLocation, useParams, Link,useRouteMatch } from 'react-router-dom'
import styled from 'styled-components';
import Price from './Price';
import Chart from './Chart';
import { useQuery } from 'react-query';
import { fetchCoinInfo, fetchCoinTickers } from './api';
import {Helmet} from 'react-helmet';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isDarkAtom } from '../atoms';
import { BsSun,BsMoonStarsFill } from "react-icons/bs";

const Container = styled.div`
  padding:0px 20px;
  max-width: 480px;
  margin:0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color:${props => props.theme.textColor};
  font-size:48px;
  transition: .3s ease-in;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color:${props=>props.theme.coinbgColor};
  padding: 10px 20px;
  border-radius: 10px;
  transition: .3s ease-in;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive : boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: ${props=>props.theme.coinbgColor};
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  transition: .3s ease-in;
  a {
    display: block;
  }
`;

const Btn = styled.button`
  background-color: ${props=>props.theme.coinbgColor};
  cursor: pointer;
  border-radius: 10px;
  border-color: white;
  color: ${props=>props.theme.textColor};
  font-size: 15px;
  padding: 5px 5px;
  margin-top:15px;
  display: flex;
  flex-direction: row-reverse;
  span{
    font-size:13px;
  }
`;

const Toggle = styled.div`
  cursor: pointer;
  margin-left: 1rem;
  margin-top: .5rem;
  svg{
    font-size:1.5rem;
  }
`;




interface Params {
  coinId : string
}

interface RouteState {
  name : string
}

interface InfoData{
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

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



export default function Coin() {
  const {coinId}:Params = useParams();
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");
  const {state} = useLocation<RouteState>();
  const isDark = useRecoilValue(isDarkAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = ()=> setDarkAtom(current=>!current)
  

  const { isLoading:infoLoading,data:infoData } = 
  useQuery<InfoData>(["info",coinId], ()=>fetchCoinInfo(coinId),
  {
    refetchInterval:5000,
  })
  
  const { isLoading:tickersLoading,data:tickersData } = 
  useQuery<PriceData>(["tickers",coinId], ()=>fetchCoinTickers(coinId))

  const loading = infoLoading || tickersLoading ;
  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <Title>{state?.name ? state.name : loading ? "Loading..." : infoData?.name}</Title>
        <Toggle onClick={toggleDarkAtom}>{isDark?<BsSun/>:<BsMoonStarsFill/>}</Toggle>
      </Header>
      {loading 
      ? <Loader>Loading...</Loader>
      : 
      <>
        <Overview>
          <OverviewItem>
            <span>순위:</span>
            <span>{infoData?.rank}</span>
          </OverviewItem>
          <OverviewItem>
            <span>심볼(Symbol):</span>
            <span>${infoData?.symbol}</span>
          </OverviewItem>
          <OverviewItem>
            <span>가격:</span>
            <span>{`${tickersData?.quotes.USD.price.toFixed(2)}$`}</span>
          </OverviewItem>
        </Overview>
        <Description>{infoData?.description}</Description>
        <Overview>
          <OverviewItem>
            <span>Total Supply:</span>
            <span>{tickersData?.total_supply}</span>
          </OverviewItem>
          <OverviewItem>
            <span>Max Supply:</span>
            <span>{tickersData?.max_supply}</span>
          </OverviewItem>
        </Overview>

        <Tabs>
          <Tab isActive={chartMatch !== null}>
            <Link to={`/${coinId}/chart`}>차트</Link>
          </Tab>
          <Tab isActive={priceMatch !== null}>
            <Link to={`/${coinId}/price`}>가격</Link>
          </Tab>
          <Link to={'/'}>
           <Btn><span>목록으로</span></Btn>
          </Link>
        </Tabs>




        <Switch>
          <Route path={`/:coinId/price`}>
            <Price coinId={coinId}/>
          </Route>
          <Route path={`/:coinId/chart`}>
            <Chart coinId={coinId} />
          </Route>
        </Switch>
      </>
      }
    </Container>
  )
}
