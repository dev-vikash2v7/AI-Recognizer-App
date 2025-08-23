import React, { useEffect, useState } from "react";

import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

// import * as Clarifai from "clarifai";
// @ts-ignore
import { CLARIFAI_API_KEY } from "@env";

import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

import { Text, View } from "../components/Themed";

import axios from 'axios'

const model_url = "https://clarifai.com/clarifai/main/models/food-item-recognition"

export default function DetectFoodsScreen() {
  const [predictions, setPredictions] = useState(null);
  const [imageToAnalyze, setImageToAnalyze] = useState(null);

  // const clarifaiApp = new Clarifai.App({
  //   apiKey: "e0b9675568584ceb9bf8a3f489ce81cd",
  // });
  process.nextTick = setImmediate;

  useEffect(() => {
    const getPermissionAsync = async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    };
    getPermissionAsync();
  }, []);

  const clarifaiDetectObjectsAsync = async (source: string | undefined) => {
    try {
      const cleanBase64 = source?.replace(/^data:image\/\w+;base64,/, "");
      // console.log("Detecting food items with Clarifai API..." , CLARIFAI_API_KEY  , source);

      const response = await axios.post(
        "https://api.clarifai.com/v2/users/clarifai/apps/main/models/food-item-recognition/versions/1d5fd481e0cf4826aa72ec3ff049e044/outputs",
        {
          inputs: [
            {
              data: {
                image: {
                  base64: cleanBase64, // or base64 if needed
                },
              },
            },
          ],
        },
        {
          headers: {
            Authorization: `Key ${CLARIFAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      const newPredictions = response.data.outputs[0].data.concepts;
      console.log("Clarifai predictions:",newPredictions);

      newPredictions.forEach((output: any) => {
        console.log("Clarifai response:", output);
      });
      setPredictions(newPredictions);
    } catch (error) {
      console.log("Exception Error: ", error);
    }
  };

  const selectImageAsync = async () => {
    try {
      let response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (!response.canceled) {
        // resize image to avoid out of memory crashes
        const manipResponse = await ImageManipulator.manipulateAsync(
          response.assets[0].uri,
          [{ resize: { width: 900 } }],
          {
            compress: 1,
            format: ImageManipulator.SaveFormat.JPEG,
            base64: true,
          }
        );

        const source = { uri: manipResponse.uri };
        setImageToAnalyze(source);
        setPredictions(null);
        // send base64 version to clarifai
        await clarifaiDetectObjectsAsync(manipResponse.base64);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.welcomeContainer}>
          <Text style={styles.headerText}>Clarifai Food Detection</Text>

          <TouchableOpacity
            style={styles.imageWrapper}
            onPress={selectImageAsync}
          >
            {imageToAnalyze && (
              <View style={{ position: "relative" }}>
                <View
                  style={{
                    zIndex: 0,
                    elevation: 0,
                  }}
                >
                  <Image
                    source={imageToAnalyze}
                    style={styles.imageContainer}
                  />
                </View>
              </View>
            )}

            {!imageToAnalyze && (
              <Text style={styles.transparentText}>Tap to choose image</Text>
            )}
          </TouchableOpacity>
          <View style={styles.predictionWrapper}>
            {imageToAnalyze && (
              <Text style={styles.text}>
                Predictions: {predictions ? "" : "Predicting..."}
              </Text>
            )}
            {predictions &&
              predictions?.length &&
              console.log("=== Detect foods predictions: ===")}

            {predictions &&
              predictions.map(
                (
                  p: { name: React.ReactNode; value: React.ReactNode },
                  index: string | number | null | undefined
                ) => {
                  console.log(`${index} ${p.name}: ${p.value}`);
                  return (
                    <Text key={index} style={styles.text}>
                      {p.name}: {parseFloat(p.value).toFixed(3)}
                    </Text>
                  );
                }
              )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  contentContainer: {
    paddingTop: 30,
  },
  headerText: {
    marginTop: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
  },
  imageWrapper: {
    width: 300,
    height: 300,
    borderColor: "#66c8cf",
    borderWidth: 3,
    borderStyle: "dashed",
    marginTop: 40,
    marginBottom: 10,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: 280,
    height: 280,
  },
  predictionWrapper: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  transparentText: {
    opacity: 0.8,
  },
});
