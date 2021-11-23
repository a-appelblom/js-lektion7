import { useEffect } from "react";

const PokemonDetail = ({ pokemon, setDisplayDetails }) => {
  const { name, sprites, types, base_experience } = pokemon;
  useEffect(() => {
    return () => {
      console.log("component will get destroyed");
    };
  }, [pokemon]);
  return (
    <div
      style={{
        position: "fixed",
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "white",
      }}
      onClick={() => setDisplayDetails(false)}
    >
      <h2>{name}</h2>
      <div>
        {Object.keys(sprites).map((item) => {
          return sprites[item]?.length ? (
            <img key={item} src={sprites[item]} alt="" />
          ) : null;
        })}
      </div>
      <p>{types[0].type.name}</p>
      <p>{base_experience}</p>
    </div>
  );
};

export default PokemonDetail;
