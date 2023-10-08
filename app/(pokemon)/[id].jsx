import { View, Text, ActivityIndicator, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { getPokemonDetails } from "../../api/pokeapi";
import tw from "twrnc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

const DetailsPage = () => {
  const { id } = useLocalSearchParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchPokemon = async () => {
      const pokemon = await getPokemonDetails(id);
      setPokemon(pokemon);
      navigation.setOptions({
        title: pokemon?.name.charAt(0).toUpperCase() + pokemon?.name.slice(1),
      });
      setLoading(false);
      const isFavorite = await AsyncStorage.getItem(`fav-${id}`);
      setIsFavorite(isFavorite === "true");
    };
    fetchPokemon();
  }, [id]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text onPress={toggleFavorite}>
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={28}
            color={"#fff"}
          />
        </Text>
      ),
    });
  }, [isFavorite]);

  const toggleFavorite = async () => {
    await AsyncStorage.setItem(`fav-${id}`, isFavorite ? "false" : "true");
    setIsFavorite(!isFavorite);
  };

  return (
    <View
      style={tw`flex flex-1 flex-col items-center p-4 bg-gray-200 ${
        loading ? "justify-center" : "justify-start"
      }`}
    >
      {loading ? (
        <ActivityIndicator size={60} color="#f4511e" />
      ) : (
        pokemon && (
          <View style={tw`w-full flex flex-col gap-5`}>
            <View style={tw`bg-gray-100 flex items-center pb-2 rounded-xl`}>
              <Image
                source={{ uri: pokemon.sprites.front_default }}
                style={tw`w-[200px] h-[200px]`}
              />
              <Text
                style={[tw`font-bold text-xl`, { textTransform: "capitalize" }]}
              >
                #{id} {pokemon.name}
              </Text>
            </View>
            {/* stats div */}
            <View style={tw`bg-gray-100 flex p-4 gap-2 rounded-xl`}>
              <Text style={tw`font-bold text-xl`}>Stats:</Text>
              <View style={tw`flex flex-col gap-2`}>
                {pokemon.stats.map((stat) => (
                  <View
                    key={stat.stat.name}
                    style={tw`flex flex-row items-center gap-2`}
                  >
                    <Text
                      style={[
                        tw`text-lg font-semibold`,
                        { textTransform: "capitalize" },
                      ]}
                    >
                      {stat.stat.name}:
                    </Text>
                    <Text style={tw`text-lg`}>{stat.base_stat}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )
      )}
    </View>
  );
};

export default DetailsPage;
