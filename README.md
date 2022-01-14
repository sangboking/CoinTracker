# CoinTracker

Demo : https://trusting-lalande-7e6cf1.netlify.app/#/

content : 
         (1)프로젝트하면서 문제점과 배워나간점
         
         1.github page에 배포시 404오류가 많이 발생했다. react-router-dom의 사용때문에 사람들도 오류가 많이 발생한다던데
         따른 배포한 페이지는 잘되고 어떠한 페이지는 배포가 안되어서 cointracker 페이지는 netify에 배포하였다.
         
         2.styled-component를 왜쓰는지 처음에는 이해가 많이 안갔지만, 사용해보면서 태그들을 componet화 하여 관리하는것과,
         css를 그 태그에 바로 적용가능하다는것이 매력적이였고, Theme Provider 라는 것을 사용하면서 전역으로 style값을 보낼수
         있던것이 편리하고 좋았다.
         
         3.React를 하면서 Typescript와 같이 적용하여 하는것은 처음인 프로젝트였다. Typescript를 구지 왜써야하지 라는 생각이 
         많았는데, 사용하면서 에러를 잡아주는것과, 자동완성에서의 장점을 알게되었다. 앞으로 프로젝트를 한다면 무조건사용할거 
         같다. 또한 타입지정을 Interface로 깔끔하게 할수있어서 조금 번거롭지만 어려운 과정은 아니였다.
         
         4.React Query 라는 라이브러리를 처음 사용하였다.평소 API를 받아올때 state를 만들고 useEffect 를 통해 안에서 비동기적 처리를
         해서 받아왔었다. 하지만 React Query 라이브러리로 state를 만들 필요도없고, 로딩과 fetch로 받아온 데이터들을 짧은 코드로 구현이
         가능하여서 정말 좋은 기능이라 생각하였다. 또한 이 라이브러리를 사용하면 방문했던 페이지의 API 데이터를 캐쉬에 보관해주어서(창을 
         닫지않았을시) 뒤로가기 버튼시 API를 refetch 하지않게 되어서 화면전환이 부드럽게 이어질수 있는걸 느꼇다. 또한 실시간으로 변경이되는
         API 데이터를 필요로한다면 refetchInterval 이란 기능으로 지정해놓은 시간마다 데이터를 refetching 할수 있어서 coin 가격등의 변화를
         얻을수 있어서 좋았다. React Query 라이브러리는 정말 많이 사용하게 될거같다.
         
         (2)cointracker 사이트 소개
         이 사이트는 coinpaprika 라는 사이트에서 API를 만들어 제작하였다. 코인들의 정보들이 담긴 API 였다.
         첫 홈화면에서는 100가지의 코인들이 나열된다. API 받은 데이터들을 map함수를 통해 반복하여 출력하였다.
         각각의 코인에 react-router-dom으로 상세페이지를 만들었다. 상세페이지를 가면 각 코인들의 정보와 차트,가격을 볼수있다.
         차트는 ApexChart 라는 라이브러를 통해 제작하였다. 차트에서는 최근2주간의 코인 가격을 볼수 있다.
         
         
        

skill : Typescript, React, styled-component
