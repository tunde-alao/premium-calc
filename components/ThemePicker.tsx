import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../contexts/ThemeContext";

export function ThemePicker() {
  const { currentTheme, setTheme, availableThemes } = useTheme();

  const handleThemePress = (themeName: string) => {
    setTheme(themeName);
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: currentTheme.colors.themePickerBackground },
      ]}
    >
      <Text
        style={[styles.title, { color: currentTheme.colors.themePickerText }]}
      >
        Choose Theme
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {availableThemes.map((theme) => (
          <TouchableOpacity
            key={theme.name}
            style={[
              styles.themeButton,
              {
                backgroundColor: theme.colors.numberButton,
                borderColor:
                  currentTheme.name === theme.name
                    ? currentTheme.colors.themePickerBorder
                    : "transparent",
                borderWidth: currentTheme.name === theme.name ? 2 : 1,
              },
            ]}
            onPress={() => handleThemePress(theme.name)}
          >
            <Text
              style={[
                styles.themeButtonText,
                { color: theme.colors.numberButtonText },
              ]}
            >
              {theme.displayName}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    textAlign: "center",
  },
  scrollContainer: {
    paddingHorizontal: 5,
  },
  themeButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 5,
    minWidth: 80,
    alignItems: "center",
  },
  themeButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
});
