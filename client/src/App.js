import './App.css';
import {useState, useEffect} from "react";
import {Button, Card, Col, Form, InputGroup, Row, Table} from "react-bootstrap";

function App() {

  let i, flag;

  const [data, setData] = useState([]);
  const [api, setApi] = useState("");
  const [search, setSearch] = useState(false);
  const [found, setFound] = useState(false);
  const [res, setRes] = useState(null)
  const [suggest, setSuggest] = useState([])

    // set up page and data
  useEffect(() => {
    fetch('/api')
        .then((res) => res.json())
        .then((data) => setData(data.entries));
  }, []);

  // always use the top suggestion as result
  useEffect(()=> {
      setRes(suggest[0])
  }, [suggest])

    // setRes, setSuggest, setFound
  useEffect(() => {
      let finds = 0;
      let arr = [];

      if (api === "") {
          setFound(true)
      }

      data.map(e=> {
          flag = 0;
          let n = (api.length < e["API"].length)? api.length: e["API"].length
          for (i = 0; i < n; i++) {
              if (e["API"][i].toLowerCase() !== api[i].toLowerCase()) {
                  flag = 1;
                  break;
              }
          }
          if (flag === 0 && api.length <= e["API"].length) {
              arr.push(e);
              finds++;
              setSuggest(arr);

          }
          if (api.length >= e["API"].length) {
              setRes(null)
          }
      })

      finds == 0? setFound(false): setFound(true)
  }, [api])


    const Dimension = (props) => {
        return (
           <>
               <Row>
                   <Row>
                       <Col>
                           <h6>
                               DESCRIPTION
                           </h6>
                           <h3>
                               <code>
                                   {props.res["Description"]}
                               </code>
                           </h3>
                       </Col>
                       <Col>
                           <h6>
                               LINK
                           </h6>
                           <h3>
                               <code>
                                   {props.res["Link"]}
                               </code>
                           </h3>
                       </Col>
                       <Col>
                           <h6>
                               CATEGORY
                           </h6>
                           <h3>
                               <code>
                                   {props.res["Category"]}
                               </code>
                           </h3>
                       </Col>
                   </Row>
               </Row>
           </>
        )
  }


  return (
      <div className="App">
          {
              // search result view
              res && suggest && search?
                  <Card>
                      <Row className="api-searched">
                          <code><h2>" {res["API"]} "</h2></code>
                      </Row>
                      <Dimension res={res}/>
                  </Card>
                  : <></>
          }

        <br/>
        <Form>
          <InputGroup className="search-api">
            <InputGroup.Text><code> Enter Name of API </code></InputGroup.Text>
            <Form.Control className="api" type="text" placeholder="API"
                          onChange={(e)=> {
                            setApi(e.target.value);
                          }}/>
          </InputGroup>
          <br/>
          <Button className="search-button"
                  onClick={ () => {
                    setSearch(!search)
                  }}
          >
            {search? "CLEAR": "SEARCH"}
          </Button>
        </Form>

        {

          search?
              <>
                  {
                      found ? <h2> 👇 Matching Results </h2>: <h2> 🤷‍ No Matching Results for "{api}" </h2>
                  }
                  <br/>
                <Table>
                    {
                        found? <thead>
                                    <tr>
                                        <th>API</th>
                                        <th>DESCRIPTION</th>
                                        <th>LINK</th>
                                        <th>CATEGORY</th>
                                    </tr>
                                </thead>
                            :<></>

                    }
                  <tbody>
                  {
                    data.map(e=> {
                      flag = 0;
                      if (api === "") {
                        return (
                            <tr key={data.indexOf(e) + "a"}>
                              <td key={data.indexOf(e) + "d1"}>{e["API"]}</td>
                              <td key={data.indexOf(e) + "d2"}>{e["Description"]}</td>
                              <td key={data.indexOf(e) + "d3"}>{e["Link"]}</td>
                              <td key={data.indexOf(e) + "d4"}>{e["Category"]}</td>
                            </tr>
                        )
                      }
                      else {
                          let n = (api.length < e["API"].length)? api.length: e["API"].length
                        for (i = 0; i < n; i++) {
                          if (e["API"][i].toLowerCase() !== api[i].toLowerCase()) {
                            flag = 1;
                            break;
                          }
                        }
                        if (flag === 0 && api.length <= e["API"].length) {
                            n++;
                            return (
                              <tr key={data.indexOf(e)+ n + "b"}>
                                <td key={n + "d1"}>{e["API"]}</td>
                                <td key={n + 'd2'}>{e["Description"]}</td>
                                <td key={n + "d3"}>{e["Link"]}</td>
                                <td key={n + "d4"}>{e["Category"]}</td>
                              </tr>
                          )
                        }
                      }
                    })
                  }
                  </tbody>
                </Table>
              </>
              :
              <></>
        }

      </div>
  );
}

export default App;
