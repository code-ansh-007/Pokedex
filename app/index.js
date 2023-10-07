import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import { getPokemon } from "../api/pokeapi";
import tw from "twrnc";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Page = () => {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    const load = async () => {
      const result = await getPokemon();
      setPokemon(result);
    };
    load();
  }, []);

  return (
    <ScrollView style={tw`w-full`}>
      {pokemon.map((item) => (
        <Link key={item.id} href={`/(pokemon)/${item.id}`} asChild>
          <TouchableOpacity style={tw`w-full`}>
            <View
              style={tw`p-5 flex flex-row items-center justify-between w-full`}
            >
              <Image
                source={{ uri: item.image }}
                style={tw`w-[100px] h-[100px]`}
              />
              <Text
                style={[
                  tw`text-[18px] flex-1`,
                  { textTransform: "capitalize" },
                ]}
              >
                {item.name}
              </Text>
              <Ionicons name="chevron-forward" size={24} />
            </View>
          </TouchableOpacity>
        </Link>
      ))}
    </ScrollView>
  );
};

export default Page;
