import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet, Text } from "react-native";

export default function RootLayout() {
  const cor_principal = "#1C1E1F";
  const cor_secundaria = "#F2F0EF";
  const cor_destaque = "#FF0000";

  return (
        <Tabs
        screenOptions={{
            tabBarActiveTintColor: "#FF0000",
            tabBarInactiveTintColor: "#838181bb",

            tabBarStyle: {
            height: 70,
            paddingTop: 10,
            backgroundColor: cor_principal,
            borderTopWidth: 1,
            borderTopColor: "#e0e0e0"
            },

            tabBarLabelStyle: {
            fontSize: 12,
            },

            headerStyle: {
              backgroundColor: cor_principal,
              elevation: 0,
              shadowOpacity: 0
            }
        }}
        >
      <Tabs.Screen
        name="index"
        options={{
          title: "Filmes",

          headerTitle: () => (
            <Text style={[styles.cinema, {color: cor_destaque}]}>Cinema</Text>
          ),

          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="movie-open" size={size} color={color} />
          ),          
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          title: "Login",

          headerTitle: () => (
            <Text style={[styles.cinema, {color: cor_destaque}]}>Cinema</Text>
          ),

          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),          
        }}
      />
               
               <Tabs.Screen
                name="[id]"
                options={{
               href: null,
              headerShown: false,
      }}
    />
    </Tabs>
  );
}

const styles = StyleSheet.create({
    cinema: {
        fontSize: 30,
        fontWeight: "800"
    },
    pontin: {
        paddingRight: 18
    },
})