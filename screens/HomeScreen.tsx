import * as React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, Dimensions, Image } from "react-native";
import { Text, View } from "../components/Themed";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

const { width } = Dimensions.get('window');

type NavigationProp = BottomTabNavigationProp<any>;

export default function TabOneScreen() {
  const navigation = useNavigation<NavigationProp>();

  const handleCardPress = (screenName: string) => {
    navigation.navigate(screenName as any);
  };

  const featureCards = [
    {
      id: 1,
      title: "Detect Objects",
      description: "Multiple object detection using TensorFlow.js with COCO-SSD model",
      icon: "scan-circle",
      color: "#4a90e2",
      screenName: "Detect Any Object or Person",
      gradient: ["#4a90e2", "#357abd"]
    },
    {
      id: 2,
      title: "Text To Image",
      description: "Convert text prompts into images using the Clarifai DALL-E 3 model",
      icon: "images-sharp",
      color: "#27ae60",
      screenName: "Text To Image Generation",
      gradient: ["#27ae60", "#1e8449"]
    },
    {
      id: 3,
      title: "Food Detection",
      description: "Identify multiple food items with the Clarifai Food model",
      icon: "pizza",
      color: "#e67e22",
      screenName: "Detect Food Items",
      gradient: ["#e67e22", "#d35400"]
    },
    {
      id: 4,
      title: "Ethnicity Recognition",
      description: "Classifies a face into multicultural groups (White, Latino, Middle Eastern, etc)",
      icon: "person-circle",
      color: "#9b59b6",
      screenName: "Ethnicity Recognition",
      gradient: ["#9b59b6", "#8e44ad"]
    }
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={styles.headerIconContainer}>
            <Image source={require('../assets/images/icon.png')} style={{width: 60, height: 60, borderRadius: 30}} />
          </View>
          <Text style={styles.headerText}>AI Recognition & Conversion</Text>
          <Text style={styles.subHeaderText}>
            Explore AI-powered image recognition & text-to-image features
          </Text>
        </View>

      

        <View style={styles.cardsContainer}>
          {featureCards.map((card) => (
            <TouchableOpacity
              key={card.id}
              style={styles.card}
              onPress={() => handleCardPress(card.screenName)}
              activeOpacity={0.8}
            >
              <View style={styles.cardHeader}>
                <View style={[styles.iconContainer, { backgroundColor: card.color + '20' }]}>
                  <Ionicons name={card.icon as any} size={24} color={card.color} />
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{card.title}</Text>
                  <Text style={styles.cardDescription}>{card.description}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#ccc" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

       
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    // backgroundColor: "#f8f9fa" 
  },
  contentContainer: { 
    paddingVertical: 20, 
    paddingHorizontal: 16,
    paddingBottom: 40
  },
  headerContainer: { 
    alignItems: "center", 
    marginBottom: 30,
    paddingTop: 10
  },
  headerIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    // backgroundColor: "#4a90e2",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#4a90e2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8
  },
  headerText: { 
    fontWeight: "bold", 
    fontSize: 28, 
    textAlign: "center",
    color: "#2c3e50",
    marginBottom: 8
  },
  subHeaderText: {
    fontSize: 16,
    color: "#7f8c8d",
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 20
  },
  getStartedContainer: { 
    marginBottom: 30,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4
  },
  getStartedText: { 
    fontSize: 16, 
    lineHeight: 24, 
    color: "#34495e",
    textAlign: "center"
  },
  cardsContainer: { 
    marginTop: 10 
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: "#f0f0f0"
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16
  },
  cardContent: {
    flex: 1
  },
  cardTitle: { 
    fontSize: 18, 
    fontWeight: "600", 
    color: "#2c3e50",
    marginBottom: 4
  },
  cardDescription: { 
    fontSize: 14, 
    color: "#7f8c8d", 
    lineHeight: 20
  },
  footerContainer: {
    alignItems: "center",
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#ecf0f1"
  },
  footerText: {
    fontSize: 14,
    color: "#95a5a6",
    textAlign: "center"
  }
});
