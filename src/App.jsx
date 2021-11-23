import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import PokemonDetail from "./PokemonDetail";
import Yatzy from "./Yatzy";
import "./App.css";

function App() {
  const { ref, inView } = useInView(); // Custom hook från ett bibliotek som kollar om ett element är i viewporten

  const [toggleYatzy, setToggleYatzy] = useState(true);
  const [data, setData] = useState([]);
  const [next, setNext] = useState("");
  const [loading, setLoading] = useState(false);
  const [displayDetails, setDisplayDetails] = useState(false);
  const [currentPokemon, setCurrentPokemon] = useState({});
  // const [counter, setCounter] = useState(0);
  // const [str, setStr] = useState("");

  useEffect(() => {
    fetchData("https://pokeapi.co/api/v2/pokemon?offset=0&limit=50");
  }, []);

  useEffect(() => {
    if (data.length >= 50 && !loading) fetchData(next);
  }, [inView]);

  async function fetchData(url) {
    setLoading(true);
    const res = await fetch(url);
    const data = await res.json();

    setNext(data.next);

    data.results.forEach(async (item) => {
      const pokeres = await fetch(item.url);
      const pokedata = await pokeres.json();
      setData((prev) => [...prev, pokedata]);
    });
    setLoading(false);
  }

  function handlePokeclick(e, item) {
    setDisplayDetails((prev) => !prev);
    setCurrentPokemon(item);
  }

  return (
    <div className="App">
      <button onClick={() => setToggleYatzy((prev) => !prev)}>
        Toggle yatzy
      </button>
      {toggleYatzy ? (
        <Yatzy />
      ) : (
        <>
          <h1>Pokedex</h1>
          {displayDetails && (
            <PokemonDetail
              pokemon={currentPokemon}
              setDisplayDetails={setDisplayDetails}
            />
          )}
          {data.length > 0 ? (
            <div
              style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)" }}
            >
              {data.map((item) => (
                <button onClick={(e) => handlePokeclick(e, item)} key={item.id}>
                  <p>{item.name}</p>
                  <img src={item.sprites.front_default} alt="" />
                </button>
              ))}
            </div>
          ) : (
            <p>Loading....</p>
          )}
          <div ref={ref} />
          {/* <button onClick={() => setCounter((prev) => prev + 1)}>
        Increase count
        </button>
        <input
        // ref={ref}
        type="text"
        value={str}
        onChange={(e) => {
          setStr(e.target.value);
        }}
      /> */}
        </>
      )}
    </div>
  );
}

export default App;
