import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PokeDetailCard from "./PokeDetailCard";

export default function Home() {
  const [pokeData, setPokeData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0)

  const getDetails = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${page < 0 ? 0 : page}&limit=20`;
    const data = await fetch(url);
    const parseData = await data.json();
    setPokeData(parseData.results);
    console.log(page);
  
  };

  useEffect(() => {
    getDetails();
    // eslint-disable-next-line
  }, []);

  const hadlePrevClick = async () => {
    setPage(page - 20)
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${page < 0 ? 0 : page}&limit=20`;
    const data = await fetch(url);
    const parseData = await data.json();
    setPokeData(parseData.results);
    
  
  };
  const handleNextClick = async () => {
    setPage(page + 20)
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${page < 0 ? 0 : page}&limit=20`;
    const data = await fetch(url);
    const parseData = await data.json();
    setPokeData(parseData.results);
   
  };



  return (
    <>
      <div className="container my-3">
        <nav className="navbar bg-light">
          <div className="container-fluid">
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
          </div>
        </nav>
      </div>
      <div className=" d-flex flex-wrap ">
        {pokeData
          .filter((val) => {
            let id = Number(val.url.slice(-3, val.url.length-1).replace("/",""));
            let name = val.name.toLowerCase();

            if (search === "") {
              return val;
            } else if (name.includes(search.toLocaleLowerCase())) {
              return val;
            } else if (id == search) {
              return val;
            }
          })
          .map((data) => {
            return (
              <div key={data.name}>
              
                <div className="card mx-3 my-3" style={{ width: "18rem" }}>
                  <img src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${Number(data.url.slice(-3, data.url.length-1).replace("/",""))}.svg`} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{data.name}</h5>
                    <h5 className="card-title">{Number(data.url.slice(-3, data.url.length-1).replace("/","")) }</h5>
                    <p className="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <a href={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${Number(data.url.slice(-3, data.url.length-1).replace("/",""))}.svg`} target="_blank" className="btn btn-primary">
                      Click To Open
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="container d-flex justify-content-between">
          <button
            disabled={page < 0}
            type="button"
            className="btn btn-dark"
            onClick={hadlePrevClick}
          >
            {" "}
            &larr; Previous
          </button>
          <button
            type="button"
            
            className="btn btn-dark"
            onClick={handleNextClick}
          >
            Next &rarr;{" "}
          </button>
        </div>
    </>
  );
}
