import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { Text, View } from "../components/Themed";

import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

export default function TextToImageScreen() {
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateImageAsync = async () => {
    if (!prompt.trim()) return;

      setGeneratedImage(null);

    setGeneratedImage( `https://pollinations.ai/p/${prompt}`);
   

  };

  async function downloadImage() {
    const { status } = await MediaLibrary.getPermissionsAsync();

    let finalStatus = status;

    if (status !== "granted") {
      const { status: newStatus } = await MediaLibrary.requestPermissionsAsync();
      finalStatus = newStatus;
    }


    if (finalStatus == "granted") {
        try {
            const fileUri = FileSystem.cacheDirectory + prompt + ".jpg";
            const { uri: localUri } = await FileSystem.downloadAsync(generatedImage, fileUri);

            const asset = await MediaLibrary.createAssetAsync(localUri);
            await MediaLibrary.createAlbumAsync("Download", asset, false);

            Alert.alert("Image downloaded successfully")

        } catch (err) {
            console.log("Save err: ", err)
        }
    } else if (finalStatus === "denied") {
        Alert.alert("please allow permissions to download")
    }
  }
  

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.headerText}>Text Prompt → Image  Generation</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your prompt..."
          value={prompt}
          onChangeText={setPrompt}
        />

        <TouchableOpacity style={styles.generateButton} onPress={generateImageAsync}>
          <Text style={styles.buttonText}>Generate Image</Text>
        </TouchableOpacity>

        {loading && <Text style={styles.text}>Generating image...</Text>}

        {generatedImage && (
            <>
          <Image source={{ uri: generatedImage }} style={styles.generatedImage}  onLoadStart={()=>{
            console.log("Image loaded")
          setLoading(true);
          }}
          onLoadEnd={()=>{
            console.log("Image loaded ended")
            setLoading(false);
          }}
          />

{generatedImage && (
          <View style={{ marginTop: 10 }}>
          <Button title="Download Image" onPress={downloadImage} />
        </View>
)}

</>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  contentContainer: {
    padding: 20,
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "90%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  generateButton: {
    padding: 12,
    backgroundColor: "#66c8cf",
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    marginVertical: 10,
  },
  generatedImage: {
    width: 300,
    height: 300,
    borderRadius: 12,
    marginTop: 20,
  },
});
