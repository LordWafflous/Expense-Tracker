import { Link } from "expo-router";
import { Image } from "expo-image";
import { Text, View, StyleSheet } from "react-native";
import {styles} from "../assets/styles/home.styles"

export default function Index() {
  return (
    <View style={styles.container}>
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Link href ={"/about"}>About</Link>
    </View>
  );
}

