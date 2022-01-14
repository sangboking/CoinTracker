import styled from 'styled-components';
import {Link} from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchCoins } from './api';
import { Helmet } from 'react-helmet';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isDarkAtom } from '../atoms';
import { BsSun,BsMoonStarsFill } from "react-icons/bs";

const Container = styled.div`
  padding:0px 20px;
  max-width: 550px;
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
`;

const CoinsList = styled.ul`
  display:grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 15px;
`;

const Coin = styled.li`
  background-color:${props=>props.theme.coinbgColor};
  color:${props=>props.theme.textColor};
  padding:10px;
  margin-bottom:10px;
  border-radius: 15px;
  transition: .3s ease-in;
  &:hover{
    padding:15px;
    background-color:#54FFCE ;
  }
  a{
    display:flex;
    align-items: center;
    padding:15px;
    transition: color 0.2s ease-in;
  }
  &:hover{
    a{
      color:${props=>props.theme.accentColor}
    }
  }
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width:35px;
  height:35px;
  margin-right: .5rem;
`;

const Toggle = styled.div`
  cursor: pointer;
  margin-left: 1rem;
  margin-top: .5rem;
  svg{
    font-size:1.5rem;
  }
`;



interface ICoin {
  id : string;
  name : string;
  symbol : string;
  rank : number;
  is_new : boolean;
  is_active : boolean;
  type : string,
}





export default function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins",fetchCoins)
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = ()=> setDarkAtom(current=>!current)
  const isDark = useRecoilValue(isDarkAtom);
 
  return (
    <Container>
      <Helmet>
      <title>
        코인
      </title>
      </Helmet>
      <Header>
        <Title>Coin Tracker</Title>
        <Toggle onClick={toggleDarkAtom}>{isDark?<BsSun/>:<BsMoonStarsFill/>}</Toggle>
      </Header>
      {isLoading ? <Loader>Loading...</Loader>:<CoinsList>
        {
          data?.slice(0,100).map((coin)=>{
            return(
              <Coin key={coin.id}>
                <Link to={{
                  pathname:`/${coin.id}`,
                  state: {name:coin.name},
                }}>
                  <Img src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}/>
                  {coin.name} &rarr;
                </Link>
              </Coin>
            )
          })
        }
      </CoinsList>}
    </Container>
  )
}
