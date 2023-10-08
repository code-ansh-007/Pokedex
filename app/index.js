import { Text, ScrollView, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { getPokemon } from "../api/pokeapi";
import PokeCard from "../components/PokeCard";

const Page = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const load = async () => {
      const result = await getPokemon();
      setPokemon(result);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={
        loading
          ? {
              display: "flex",
              flex: 1,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }
          : null
      }
    >
      {loading ? (
        <ActivityIndicator size={60} color="#f4511e" />
      ) : (
        pokemon.map((item) => (
          <PokeCard
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.image}
          />
        ))
      )}
    </ScrollView>
  );
};

export default Page;
