import axios from 'axios';
import { useEffect, useState } from 'react';
import { Col, Pagination, Row, Spinner } from 'react-bootstrap'
import Post from './Post';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(true);
  const [active, setActive]= useState(1);
  const [params, setParams] = useState({
    per_page: 20,
    context: "embed",
    page: active
  });

  const getPosts = () => {
    setLoading(true);
    axios.get('https://techcrunch.com/wp-json/wp/v2/posts', {params: params})
      .then(res => {
        setPosts(res.data);
        setIsError(false);
      })
      .catch(err => {
        if(err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        }
        else if(err.request) {
          console.log(err.request);
        }
        else {
          console.log('Error', err.message);
        }
        console.log(err.config);
        setIsError(true);
      })
      .finally(()=> {
        setLoading(false);
      })    
  }

  useEffect(()=> {
    getPosts();
  }, [params]);

  let items =[];
  for (let number = 1; number <=100; number++) {
    items.push(<Pagination.Item key={number} 
                                active={number === active} 
                                onClick={()=> {setActive(number); setParams({...params, page: number})}}>
      {number}
    </Pagination.Item>,);
  }

  const getPaginationItems = () => {
    if(active < 5)
      return items.slice(0,9);
    else if(active > 95)
      return items.slice(91);
    else
      return items.slice(active - 5, active + 4);
  }

  const handlePrev = () => {
    if(active > 1) {
      setActive(active - 1);
      setParams({
        ...params,
        page: active - 1
      });
    }
  }

  const handleNext = () => {
    if(active < 100) {
      setActive(active + 1);
      setParams({
        ...params,
        page: active + 1
      });
    }
  }
 
  return(
    <>
      { loading && <Spinner style= {{ position: "absolute", top: "50%", left: "50%" }} animation="border"/> }
      {!loading && !isError && <>
        <Row sm={1} md={2} lg={4} className="g-4" 
             style={{ margin: 0, maxWidth: "100%", background: "#E3E3D8" }}>
          {
            posts.map((post, index) => (
              <Col key={index}>
                <Post props={post} colorPicker={index}/>
              </Col>
            ))
          }  
        </Row>
        <Row style={{ margin: 0, maxWidth: "100%", background: "#E3E3D8" }}> 
          <Pagination className="hideOnMobile">
            <Pagination.First onClick={()=> {setActive(1); setParams({...params, page: 1})}}/>
              <Pagination.Prev onClick={handlePrev}/>
                {getPaginationItems()}
              <Pagination.Next onClick={handleNext}/>
            <Pagination.Last onClick={()=> {setActive(100); setParams({...params, page: 100})}}/>
          </Pagination>
        </Row>
      </>}
      {!loading && isError && <> <br/>
        <h5>Something went Wrong!</h5>
        <h6>Check console for details.</h6>
      </>}
    </>
  )
}

export default Home;