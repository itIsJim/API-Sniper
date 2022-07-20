import './App.css';
import {useState, useEffect} from "react";
import {Button, Card, Form, InputGroup, Table} from "react-bootstrap";



function App() {

  let i, flag;

  const [data, setData] = useState([]);
  const [api, setApi] = useState("");
  const [search, setSearch] = useState(false);
  const [numFound, setNumFound] = useState(0);

  useEffect(() => {
    fetch('/api')
        .then((res) => res.json())
        .then((data) => setData(data.entries));
  }, []);


  useEffect(() => {

  }, [search])


  return (
      <div className="App">

        <Form>
          <InputGroup className="search-api">
            <InputGroup.Text><code> Enter Name of API </code></InputGroup.Text>
            <Form.Control className="api" type="text" placeholder="API"
                          onChange={(e)=> {
                            setApi(e.target.value);
                            console.log(e.target.value)
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
          search? <>
                <h2> Best Suggestions 👇</h2><br/>
                <Table>
                  <thead>
                  <tr>
                    <th>API</th>
                    <th>DESCRIPTION</th>
                    <th>LINK</th>
                    <th>CATEGORY</th>
                  </tr>
                  </thead>
                  <tbody>
                  {
                    data.map(e=> {
                      flag = 0;
                      if (api === "") {
                        return (
                            <tr>
                              <td>
                                {e["API"]}
                              </td>
                              <td>{e["Description"]}</td>
                              <td>{e["Link"]}</td>
                              <td>{e["Category"]}</td>
                            </tr>
                        )
                      }
                      else {
                        for (i = 0; i < (api).length; i++) {
                          if (e["API"][i].toLowerCase() !== api[i].toLowerCase()) {
                            flag = 1
                            break;
                          }
                        }
                        if (flag === 0) {
                          return (
                              <tr>
                                <td>{e["API"]}</td>
                                <td>{e["Description"]}</td>
                                <td>{e["Link"]}</td>
                                <td>{e["Category"]}</td>
                              </tr>
                          )
                        }
                      }

                    })
                  }
                  </tbody>
                </Table>
              </>
              :<></>
        }
      </div>

  );
}

export default App;
