import React, {useState, useEffect} from "react";
// import { useEffect } from 'react';
import './App.css';
import Axios from "axios";

function App() {

const [name, setName] = useState('');
const [liste, setList] = useState([]);

useEffect(()=>{
  Axios.get("http://localhost:3001/api/get")
  .then((Response)=>{
    console.log(Response.data);
    setList(Response.data)
  })
},[]);

const submitName = () => {
  Axios.post("http://localhost:3001/api/insert", {
    name: name
  }).then(()=>{
    alert("Bravo le nom est insérer");
  });
  setList([
    ...liste,{name: name},
  ]);

};

const deleteName = (nam) => {
  Axios.delete(`http://localhost:3001/api/delete/${nam}`);
};

  return (
    <div className="App">
      <h1>Liste de noms des argonautes React, node, mysql</h1>

      <input 
        type="text" 
        name="name" 
        placeholder='Insérer un nom' 
        onChange={(e)=> {
        setName(e.target.value);
      }} />
      <button className="green" onClick={submitName}>Envoyer</button>


      {/* affichage de la donnée */}
      {liste.map((value)=>{
        return(
          <div>
            <h3>{value.name}</h3>

            <h4 className="colorgreen"><u>Rafraichi</u> la page pour <u>voir</u> les résultats de la <u>modification</u> ou de la <u>suppression</u></h4>


            <button onClick={()=>{deleteName(value.name)}} id="deleteName" className="delete">Supprimer</button>

            <input placeholder="updateInput"></input>
            {/* <input type="text" id="updateInput" noChange={(e)=>{
              setName(e.target.value);
            }} /> */}

            <button className="update">Modifier</button>

          </div>
        )
      })}
    </div>
  );
}

export default App;
