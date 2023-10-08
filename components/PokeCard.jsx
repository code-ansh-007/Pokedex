import { View, Text, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";

const PokeCard = ({ id, image, name }) => {
  return (
    <Link key={id} href={`/(pokemon)/${id}`} asChild>
      <TouchableOpacity style={tw`w-full`}>
        <View style={tw`p-5 flex flex-row items-center justify-between w-full`}>
          <Image source={{ uri: image }} style={tw`w-[100px] h-[100px]`} />
          <Text
            style={[tw`text-[18px] flex-1`, { textTransform: "capitalize" }]}
          >
            {name}
          </Text>
          <Ionicons name="chevron-forward" size={24} />
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default PokeCard;
