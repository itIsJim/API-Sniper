import './App.css';
import {useState, useEffect} from "react";
import {Button, Form, InputGroup, Table} from "react-bootstrap";

const SuggestionHeader = (f) => {
    return
}



function App() {

  let i, flag;

  const [data, setData] = useState([]);
  const [api, setApi] = useState("");
  const [search, setSearch] = useState(false);
  const [found, setFound] = useState(false);

  useEffect(() => {
    fetch('/api')
        .then((res) => res.json())
        .then((data) => setData(data.entries));
  }, []);


  useEffect(() => {
      let finds = 0;
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
              finds++
          }
      })
      finds == 0? setFound(false): setFound(true)
  }, [api])




  return (
      <div className="App">

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
                            <tr>
                              <td>{e["API"]}</td>
                              <td>{e["Description"]}</td>
                              <td>{e["Link"]}</td>
                              <td>{e["Category"]}</td>
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
              :
              <></>
        }

      </div>
  );
}

export default App;
