
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import './SearchResultsPage.css'; 

const SearchResultsPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const query = new URLSearchParams(useLocation().search).get('query');

  useEffect(() => {
    
    const allPages = [
      { path: '/blog/pilikula', title: 'Pilikula Nisargadhama', img: 'https://th-i.thgim.com/public/migration_catalog/article11466977.ece/alternates/FREE_1200/14MN_PILIKULA' },
      { path: '/blog/sammilan', title: 'Sammilan Shetty\'s Butterfly Park', img: 'https://lh5.googleusercontent.com/p/AF1QipPG-WFCRc0aIREpvBE1BQ8qig2E84iVAthT3xRX=w675-h390-n-k-no' },
      { path: '/blog/sasihithlu', title: 'Sasihithlu Beach', img: 'https://lh5.googleusercontent.com/p/AF1QipNRw4bVz2N7CR3iCZf2q1RDcieGiknuqLzuAMCd=s800' },
      { path: '/blog/sulthan', title: 'Sulthan Battery', img: 'https://merrytogoaround.com/wp-content/uploads/2013/09/sultan-battery.png' },
      { path: '/blog/forum', title: 'Forum Fiza Mall', img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/0b/55/30/mall-exterior-shot.jpg?w=1200&h=-1&s=1' },
      { path: '/blog/kadri', title: 'Kadri Manjunath Temple', img: 'https://genuinetaxi.in/wp-content/uploads/2022/05/Kadri-Manjunatheshwara-Temple.jpg' },
      { path: '/blog/cathedral', title: 'St. Aloysius Chapel', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/St_Aloysius_Church%2C_Glasgow_03.jpg/800px-St_Aloysius_Church%2C_Glasgow_03.jpg' },
      { path: '/blog/kateel', title: 'Kateel Sri Durga Parameshwari', img: 'https://lightuptemples.com/wp-content/uploads/2022/11/file78yh7bdaa2sxjq8x1mp-1579713813.jpg' },
      { path: '/blog/pabbas', title: 'Pabbas Icecream Parlour', img: 'https://lh3.googleusercontent.com/p/AF1QipMtDlWrWUd-W7emXanWzur2ZW6n_aGPUQAaEFXr=s1360-w1360-h10201' },
      { path: '/temple1', title: 'Kudroli Gokarnanath Temple', img: 'https://media1.thrillophilia.com/filestore/hbyesuouzbriov3uucdicj3vmxiq_img-2.jpg?w=1440&dpr=2' },
      { path: '/beach1', title: 'Tannirbhavi beach', img: 'https://media1.thrillophilia.com/filestore/1tth48njbzvyg46yij093uh2b5a0_1553498696_2.jpg?w=753&h=450&dpr=1.0' },
      { path: '/beach2', title: 'Panambur beach', img: 'https://media1.thrillophilia.com/filestore/k98azlcz3ptnhlk23l7ulr5l823f_1553500978_13.jpg?w=1440&dpr=2' },
      { path: '/temple2', title: 'Kukke Subrahmanya Temple', img: 'https://media1.thrillophilia.com/filestore/08nmpqygiwxqgt074tz1kqntow8s_1553502961_25.jpg?w=753&h=450&dpr=1.0' },
    ];
    
    const results = allPages.filter(page => page.title.toLowerCase().includes(query.toLowerCase()));
    setSearchResults(results);
  }, [query]);

  return (
    <Container className="search-results-container p-5 mb-4 bg-light rounded-3">
      <h1>Search Results for "{query}"</h1>
      <Row>
        {searchResults.length > 0 ? (
          searchResults.map(result => (
            <Col md={4} key={result.path}>
              <Card className="mb-4">
                <Card.Img variant="top" src={result.img} />
                <Card.Body>
                  <Card.Title>{result.title}</Card.Title>
                  <Card.Text>
                    <Link to={result.path}>View Details</Link>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No results found</p>
        )}
      </Row>
    </Container>
  );
};

export default SearchResultsPage;