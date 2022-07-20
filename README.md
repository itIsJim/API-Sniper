# SiciliaMia

Pre-interview Assignment by **Jun Mao** </br>
todo: To Read the File into React page using Nodejs for the Server

## The App
  The app will allow the user to search for the 'Description', 'Link', 'Category' of an API from the JSON file provided (server/ inText.txt), with the name of API typed in the search bar. The system will return the most relatable API (top of the list) to the dashboard at the header, and a list of suggestions with APIs sharing the same letter(s) will be in display as well. Should there be no matching results, there will not be the list nor the dashboard.

## How to develop

0. Install Node.js and two local ports 

     ```
     npm i node
     ```
      
1. The Server (Proxy: http://localhost:3001/) 

    ```
    cd server 
    npm start <- server on  
    ```  
    
2. The Client (Link: http://localhost:3000/) 👈
 
    ```
    cd client
    npm install
    npm start <- web app on 🚀
    ```
    
3. To Store Data in Mongodb

    ```
    cd server
    node connection.js
    ```
   
## Instruction
  • Type in the Name of the API in the Search Bar </br>
  • Button "SEARCH" Active -> Input Only/ No Results </br>
  • Button "CLEAR" Active -> Input to Change Search Keyword/ Dashboard with Search Results </br>
  
  
