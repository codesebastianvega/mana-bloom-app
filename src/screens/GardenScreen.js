import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  Pressable,
  StatusBar,
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./GardenScreen.styles";
import { Colors } from "../theme";
import { useAppState, useAppDispatch } from "../state/AppContext";
import { GARDEN_ASSETS, SHOP_ITEM_TRAITS, SHOP_LOOKUP } from "../constants/shopCatalog";

// Gesture & Animation
import { GestureDetector, Gesture, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming,
  runOnJS
} from "react-native-reanimated";

// Assets
const BG_IMAGE = require("../../assets/Garden/gardenexpand.png");
const PLANT_IMAGE = require("../../assets/plants/bonsai.png");

const { width, height } = Dimensions.get("window");

// Grid Configuration
const GRID_COLS = 16;
const GRID_ROWS = 18; 
const GRID_HORIZONTAL_PADDING = 20; 
const CELL_SIZE = (width - GRID_HORIZONTAL_PADDING * 2) / GRID_COLS; 
const GRID_OFFSET_TOP = 310; // Balanced between previous values


// Helper to calculate pixel position from grid coordinates
const getGridPosition = (col, row) => {
  return {
    left: GRID_HORIZONTAL_PADDING + col * CELL_SIZE,
    top: GRID_OFFSET_TOP + row * CELL_SIZE,
  };
};

// Blocked Zones (Obstacles)
const BLOCKED_ZONES = [
  { c1: 0, r1: 0, c2: 3, r2: 0 },
  { c1: 8, r1: 0, c2: 15, r2: 0 },
  { c1: 0, r1: 1, c2: 3, r2: 1 },
  { c1: 14, r1: 1, c2: 15, r2: 1 },
  { c1: 0, r1: 2, c2: 1, r2: 2 },
  { c1: 15, r1: 2, c2: 15, r2: 2 },
  { c1: 0, r1: 4, c2: 0, r2: 4 },
  { c1: 0, r1: 5, c2: 0, r2: 6 },
  { c1: 0, r1: 8, c2: 0, r2: 8 },
  { c1: 0, r1: 9, c2: 0, r2: 10 },
  { c1: 0, r1: 11, c2: 0, r2: 13 },
  { c1: 1, r1: 13, c2: 1, r2: 13 },
  { c1: 14, r1: 11, c2: 15, r2: 12 },
  { c1: 0, r1: 14, c2: 0, r2: 17 },
  { c1: 15, r1: 3, c2: 15, r2: 17 },
  { c1: 1, r1: 17, c2: 7, r2: 17 },
  { c1: 9, r1: 17, c2: 14, r2: 17 },
  { c1: 1, r1: 16, c2: 5, r2: 16 },
  { c1: 14, r1: 15, c2: 14, r2: 15 },
  { c1: 13, r1: 16, c2: 14, r2: 16 },
  { c1: 5, r1: 0, c2: 5, r2: 0 },
];

const isCellBlocked = (col, row) => {
  return BLOCKED_ZONES.some(
    (z) => col >= z.c1 && col <= z.c2 && row >= z.r1 && row <= z.r2
  );
};

// Mock Data with Grid Coordinates
const MOCK_ITEMS = [
  { id: "plant_main", type: "plant", name: "Bonsai Astral", image: PLANT_IMAGE, col: 6, row: 6, size: 2 },
  { id: "p1", type: "pet", name: "Cocoa", image: require("../../assets/pets/cocoa.png"), col: 3, row: 8, size: 1 },
  { id: "p2", type: "pet", name: "Merlin", image: require("../../assets/pets/merlin.png"), col: 8, row: 7, size: 1 },
  { id: "p3", type: "pet", name: "Tokyo", image: require("../../assets/pets/tokyo.png"), col: 2, row: 10, size: 1 },
];


// Garden Loading Phrases
const GARDEN_LOADING_PHRASES = [
  "Pidiendo las llaves al jardinero...",
  "Buscando a Cocoa...",
  "Fertilizando las plantas...",
  "Regando las flores...",
  "Contando las mascotas...",
  "Preparando el terreno...",
  "Abriendo las puertas del jardín...",
];

const LOADING_DURATION = 3000; // 3 seconds

export default function GardenScreen() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { garden, inventory } = useAppState();
  const [showGrid, setShowGrid] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [placingItem, setPlacingItem] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const fadeAnim = useSharedValue(0);

  // Loading splash screen logic
  useEffect(() => {
    // Fade in animation
    fadeAnim.value = withTiming(1, { duration: 800 });

    // Cycle phrases every 1 second
    const phraseInterval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % GARDEN_LOADING_PHRASES.length);
    }, 1000);

    // End loading after duration
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, LOADING_DURATION);

    return () => {
      clearInterval(phraseInterval);
      clearTimeout(loadingTimer);
    };
  }, []); 

  // Animation Values
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);


  // Initialize with mock data if empty
  useEffect(() => {
    if (!garden.items || garden.items.length === 0) {
      dispatch({ type: "SET_GARDEN_ITEMS", payload: MOCK_ITEMS });
    }
  }, []);

  const items = garden.items || [];

  // Calculate available inventory
  const getAvailableInventory = () => {
    const available = [];
    const inventoryCounts = {};
    
    inventory.forEach(item => {
      // Include pets and seeds (plants)
      if (item.category === 'pets' || item.category === 'seeds') {
        inventoryCounts[item.sku] = (inventoryCounts[item.sku] || 0) + item.quantity;
      }
    });
    
    items.forEach(placedItem => {
      if (placedItem.sku && inventoryCounts[placedItem.sku]) {
        inventoryCounts[placedItem.sku]--;
      }
    });
    
    Object.keys(inventoryCounts).forEach(sku => {
      if (inventoryCounts[sku] > 0 && GARDEN_ASSETS[sku]) {
        // Get grid size from SHOP_ITEM_TRAITS
        const lookup = SHOP_LOOKUP[sku];
        const category = lookup?.category || 'pets';
        const traits = SHOP_ITEM_TRAITS[category];
        const itemTrait = traits?.[sku] || traits?.__default__ || { grid: "1x1" };
        const [width, height] = itemTrait.grid.split('x').map(Number);
        
        available.push({
          sku,
          count: inventoryCounts[sku],
          ...lookup,
          image: GARDEN_ASSETS[sku],
          size: Math.max(width, height) // Use max dimension as size
        });
      }
    });
    
    return available;
  };

  const availableItems = getAvailableInventory();


  // Gestures with Clamping
  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      // Calculate limits based on current scale
      // Max translation is half the "extra" width generated by zooming
      const maxTranslateX = (width * (savedScale.value - 1)) / 2;
      const maxTranslateY = (height * (savedScale.value - 1)) / 2;

      // If scale is 1, no panning allowed (maxTranslate is 0)
      if (savedScale.value > 1) {
        translateX.value = Math.max(
          -maxTranslateX, 
          Math.min(savedTranslateX.value + e.translationX, maxTranslateX)
        );
        translateY.value = Math.max(
          -maxTranslateY, 
          Math.min(savedTranslateY.value + e.translationY, maxTranslateY)
        );
      }
    })
    .onEnd(() => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    });

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      // Clamp scale between 1 (fit screen) and 2.5 (max zoom)
      // This prevents "black sides" (scale < 1) and pixelation (scale > 2.5)
      scale.value = Math.max(1, Math.min(savedScale.value * e.scale, 2.5));
    })
    .onEnd(() => {
      savedScale.value = scale.value;
      
      // Re-clamp translation if we zoomed out
      const maxTranslateX = (width * (scale.value - 1)) / 2;
      const maxTranslateY = (height * (scale.value - 1)) / 2;
      
      if (Math.abs(translateX.value) > maxTranslateX) {
        translateX.value = withTiming(Math.max(-maxTranslateX, Math.min(translateX.value, maxTranslateX)));
        savedTranslateX.value = translateX.value;
      }
      if (Math.abs(translateY.value) > maxTranslateY) {
        translateY.value = withTiming(Math.max(-maxTranslateY, Math.min(translateY.value, maxTranslateY)));
        savedTranslateY.value = translateY.value;
      }
    });

  const composedGesture = Gesture.Simultaneous(panGesture, pinchGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  // Reset View
  const resetView = () => {
    scale.value = withSpring(1);
    savedScale.value = 1;
    translateX.value = withSpring(0);
    savedTranslateX.value = 0;
    translateY.value = withSpring(0);
    savedTranslateY.value = 0;
  };

  // Handle tapping an item in the garden
  const handleItemPress = (item) => {
    if (!showGrid) return; 
    if (placingItem) {
      setPlacingItem(null);
      return;
    }
    if (selectedItemId === item.id) {
      setSelectedItemId(null); 
    } else {
      setSelectedItemId(item.id); 
    }
  };

  // Handle tapping an item in the inventory strip
  const handleInventoryItemPress = (item) => {
    if (placingItem?.sku === item.sku) {
      setPlacingItem(null); 
    } else {
      setPlacingItem(item);
      setSelectedItemId(null); 
    }
  };

  // Handle tapping a grid cell
  const handleGridPress = (col, row) => {
    // CASE 1: Placing new item
    if (placingItem) {
      const size = placingItem.size || 1; // Use dynamic size from item
      if (col + size > GRID_COLS || row + size > GRID_ROWS) return;
      for (let c = 0; c < size; c++) {
        for (let r = 0; r < size; r++) {
          if (isCellBlocked(col + c, row + r)) return;
        }
      }
      const hasCollision = items.some((item) => {
        const itemRight = item.col + item.size;
        const itemBottom = item.row + item.size;
        const newRight = col + size;
        const newBottom = row + size;
        return (col < itemRight && newRight > item.col && row < itemBottom && newBottom > item.row);
      });

      if (!hasCollision) {
        const newItem = {
          id: Date.now().toString(),
          sku: placingItem.sku,
          type: placingItem.category === 'seeds' ? 'plant' : 'pet',
          name: placingItem.title,
          image: placingItem.image,
          col,
          row,
          size,
        };
        dispatch({ type: "SET_GARDEN_ITEMS", payload: [...items, newItem] });
        setPlacingItem(null); 
      }
      return;
    }

    // CASE 2: Moving existing item
    if (!selectedItemId) return;
    const selectedItem = items.find((i) => i.id === selectedItemId);
    if (!selectedItem) return;
    if (col + selectedItem.size > GRID_COLS || row + selectedItem.size > GRID_ROWS) return;
    for (let c = 0; c < selectedItem.size; c++) {
      for (let r = 0; r < selectedItem.size; r++) {
        if (isCellBlocked(col + c, row + r)) return;
      }
    }
    const hasCollision = items.some((item) => {
      if (item.id === selectedItemId) return false;
      const itemRight = item.col + item.size;
      const itemBottom = item.row + item.size;
      const newRight = col + selectedItem.size;
      const newBottom = row + selectedItem.size;
      return (col < itemRight && newRight > item.col && row < itemBottom && newBottom > item.row);
    });

    if (!hasCollision) {
      const newItems = items.map((item) =>
        item.id === selectedItemId ? { ...item, col, row } : item
      );
      dispatch({ type: "SET_GARDEN_ITEMS", payload: newItems });
      setSelectedItemId(null);
    }
  };

  const handleRemoveItem = () => {
    if (!selectedItemId) return;
    const newItems = items.filter(i => i.id !== selectedItemId);
    dispatch({ type: "SET_GARDEN_ITEMS", payload: newItems });
    setSelectedItemId(null);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {isLoading ? (
        // Loading Splash Screen
        <View style={{ flex: 1, backgroundColor: Colors.background }}>
          <ImageBackground 
            source={require("../../assets/Manabloomsplashes/jardin.png")} 
            style={[StyleSheet.absoluteFill, { width: '100%', height: '100%' }]} 
            resizeMode="cover"
          >
            <View style={{ 
              ...StyleSheet.absoluteFillObject, 
              backgroundColor: 'rgba(0,0,0,0.3)' 
            }} />
            <View style={{ 
              flex: 1, 
              justifyContent: 'flex-end', 
              alignItems: 'center', 
              paddingBottom: 60 
            }}>
              <Animated.View style={{ opacity: fadeAnim }}>
                <Text style={{
                  color: "#FFFFFF",
                  fontSize: 18,
                  fontWeight: "600",
                  textShadowColor: 'rgba(0, 0, 0, 0.85)',
                  textShadowOffset: { width: 0, height: 2 },
                  textShadowRadius: 6,
                  letterSpacing: 1,
                  fontStyle: 'italic',
                }}>
                  {GARDEN_LOADING_PHRASES[phraseIndex]}
                </Text>
              </Animated.View>
            </View>
          </ImageBackground>
        </View>
      ) : (
        // Main Garden Screen
      <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
        
        <GestureDetector gesture={composedGesture}>
          <Animated.View style={[styles.sceneContainer, animatedStyle]}>
            <ImageBackground source={BG_IMAGE} style={styles.backgroundImage}>
               {/* Removed SafeAreaView from here to prevent layout shifts during zoom */}
               <View style={styles.sceneContainer} pointerEvents="box-none">
                  {/* Grid Debug Overlay */}
                  {showGrid && (
                    <View style={[styles.gridOverlay, { top: GRID_OFFSET_TOP, left: GRID_HORIZONTAL_PADDING, width: width - GRID_HORIZONTAL_PADDING * 2 }]}>
                      {Array.from({ length: GRID_ROWS * GRID_COLS }).map((_, i) => {
                        const col = i % GRID_COLS;
                        const row = Math.floor(i / GRID_COLS);
                        const blocked = isCellBlocked(col, row);
                        
                        return (
                          <Pressable
                            key={i}
                            onPress={() => handleGridPress(col, row)}
                            style={({ pressed }) => ({
                              width: CELL_SIZE,
                              height: CELL_SIZE,
                              borderWidth: 0.5,
                              borderColor: "rgba(255, 255, 255, 0.3)",
                              backgroundColor: blocked
                                ? "rgba(255, 0, 0, 0.3)" 
                                : (selectedItemId && pressed) || (placingItem && pressed)
                                ? "rgba(255, 255, 255, 0.5)" 
                                : "transparent",
                              alignItems: "center",
                              justifyContent: "center",
                            })}
                          >
                            <Text style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: 8 }}>
                              {col},{row}
                            </Text>
                          </Pressable>
                        );
                      })}
                    </View>
                  )}

                  {/* Render Items */}
                  {items.map((item) => {
                    const pos = getGridPosition(item.col, item.row);
                    const size = item.size * CELL_SIZE;
                    const isSelected = selectedItemId === item.id;
                    
                    // Different scale factors for different item types
                    const scaleFactor = item.type === 'plant' ? 1.80 : 1.50;
                    
                    return (
                      <Pressable
                        key={item.id}
                        onPress={() => handleItemPress(item)}
                        style={{
                          position: "absolute",
                          left: pos.left,
                          top: pos.top,
                          width: size,
                          height: size,
                          alignItems: "center",
                          justifyContent: "center",
                          zIndex: item.row + (isSelected ? 100 : 0),
                        }}
                      >
                        <View style={{
                          width: size * scaleFactor,
                          height: size * scaleFactor,
                          borderWidth: isSelected ? 2 : 0,
                          borderColor: Colors.primary,
                          borderRadius: 8,
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Image
                            source={item.image}
                            style={{
                              width: "100%",
                              height: "100%",
                              resizeMode: "contain",
                              opacity: isSelected ? 0.8 : 1,
                            }}
                          />
                        </View>
                        {item.type === "pet" && showGrid && (
                           <Text style={[styles.petName, { fontSize: 8 }]}>{item.name}</Text>
                        )}
                      </Pressable>
                    );
                  })}
               </View>
            </ImageBackground>
          </Animated.View>
        </GestureDetector>

        {/* UI Overlay (Fixed) */}
        <SafeAreaView style={StyleSheet.absoluteFill} pointerEvents="box-none">
           {/* ... Header and Footer remain the same ... */}
           <View style={styles.header} pointerEvents="box-none">
            <Pressable
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <FontAwesome5 name="arrow-left" size={20} color={Colors.text} />
            </Pressable>
            <Text style={styles.headerTitle}>Jardín Místico</Text>
            <Pressable
              style={styles.backButton}
              onPress={resetView}
            >
              <FontAwesome5 name="compress-arrows-alt" size={20} color={Colors.text} />
            </Pressable>
          </View>

          {/* Footer / Inventory Strip */}
          <View style={[styles.footer, { marginTop: 'auto' }]} pointerEvents="box-none">
            {!showGrid ? (
              <Pressable 
                style={styles.editButton}
                onPress={() => setShowGrid(true)}
              >
                <FontAwesome5 name="th" size={16} color={Colors.text} />
                <Text style={styles.editButtonText}>Editar Jardín</Text>
              </Pressable>
            ) : (
              <View style={{ width: '100%', alignItems: 'center' }}>
                {/* Inventory Strip */}
                <View style={{ height: 90, width: '100%', marginBottom: 10 }}>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 10, alignItems: 'center' }}>
                    {availableItems.length === 0 ? (
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <Text style={{ color: '#fff', backgroundColor: 'rgba(0,0,0,0.6)', padding: 8, borderRadius: 8 }}>
                          No tienes mascotas.
                        </Text>
                        <TouchableOpacity 
                          onPress={() => {
                            dispatch({ 
                              type: "ADD_TO_INVENTORY", 
                              payload: { sku: "shop/pets/u_cocoa", title: "Cocoa", category: "pets", quantity: 1 } 
                            });
                          }}
                          style={{ backgroundColor: Colors.accent, padding: 8, borderRadius: 8 }}
                        >
                          <Text style={{ color: '#000', fontWeight: 'bold' }}>+1 Cocoa (Test)</Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      availableItems.map((item) => (
                        <TouchableOpacity
                          key={item.sku}
                          onPress={() => handleInventoryItemPress(item)}
                          style={{
                            width: 60,
                            height: 60,
                            backgroundColor: placingItem?.sku === item.sku ? Colors.primary : 'rgba(0,0,0,0.5)',
                            borderRadius: 12,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderWidth: 1,
                            borderColor: 'rgba(255,255,255,0.2)'
                          }}
                        >
                          <Image source={item.image} style={{ width: 40, height: 40, resizeMode: 'contain' }} />
                          <View style={{ position: 'absolute', top: -5, right: -5, backgroundColor: Colors.accent, borderRadius: 10, width: 20, height: 20, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#000', fontSize: 10, fontWeight: 'bold' }}>{item.count}</Text>
                          </View>
                        </TouchableOpacity>
                      ))
                    )}
                  </ScrollView>
                </View>

                {/* Action Buttons */}
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  {selectedItemId && (
                    <Pressable 
                      style={[styles.editButton, { backgroundColor: '#ef5350' }]}
                      onPress={handleRemoveItem}
                    >
                      <FontAwesome5 name="box-open" size={16} color="#fff" />
                      <Text style={styles.editButtonText}>Guardar</Text>
                    </Pressable>
                  )}
                  
                  <Pressable 
                    style={[styles.editButton, { backgroundColor: Colors.primary }]}
                    onPress={() => {
                      setShowGrid(false);
                      setSelectedItemId(null);
                      setPlacingItem(null);
                    }}
                  >
                    <FontAwesome5 name="check" size={16} color={Colors.text} />
                    <Text style={styles.editButtonText}>Terminar</Text>
                  </Pressable>
                </View>
              </View>
            )}
          </View>
        </SafeAreaView>
      </View>
      )}
    </GestureHandlerRootView>
  );
}
