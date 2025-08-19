import type { AudioPlayer } from "expo-audio";
import { createAudioPlayer } from "expo-audio";

// Load all available sound files
const soundFiles = {
  1: require("../assets/sound/1.mp3"),
  2: require("../assets/sound/2.mp3"),
  3: require("../assets/sound/3.mp3"),
  4: require("../assets/sound/4.mp3"),
  6: require("../assets/sound/6.mp3"),
  8: require("../assets/sound/8.mp3"),
  9: require("../assets/sound/9.mp3"),
  10: require("../assets/sound/10.mp3"),
};

class SoundService {
  private players: Map<number, AudioPlayer> = new Map();
  private isLoaded: boolean = false;

  constructor() {
    this.loadSounds();
  }

  private async loadSounds() {
    try {
      // Create audio players for each sound file
      for (const [key, source] of Object.entries(soundFiles)) {
        const player = createAudioPlayer(source);
        this.players.set(Number(key), player);
      }
      this.isLoaded = true;
    } catch (error) {
      console.error("Error loading sounds:", error);
      this.isLoaded = false;
    }
  }

  private getSoundKeyByInput(input: string | number): number {
    // Map button input to sound file key
    if (typeof input === "number") {
      // For numbers 1-9, use the number as key
      if (input >= 1 && input <= 9) {
        // Use available sound files, fallback to 4 if specific number not available
        if (this.players.has(input)) {
          return input;
        } else {
          // Fallback mapping for missing files (5, 7, 0)
          if (input === 5) return 4; // Use 4.MP3 for key 5
          if (input === 7) return 6; // Use 6.MP3 for key 7
          if (input === 0) return 10; // Use 10.MP3 for key 0
          return 4; // Default fallback
        }
      } else if (input === 0) {
        return 10; // Use 10.MP3 for key 0
      }
    }

    // For operators and special functions, use sound file 10
    return 10;
  }

  async playKeySound(buttonInput?: string | number) {
    if (!this.isLoaded) {
      await this.loadSounds();
    }

    if (this.isLoaded) {
      try {
        // Get the sound key based on button input
        const soundKey = this.getSoundKeyByInput(buttonInput || 5);
        const player = this.players.get(soundKey);

        if (player) {
          console.log(`Playing sound ${soundKey} for input:`, buttonInput);

          // Reset player position to start
          player.seekTo(0);

          // Play the sound
          player.play();
        } else {
          console.warn(`No player found for sound key: ${soundKey}`);
        }
      } catch (error) {
        console.error("Error playing sound:", error);
        // Try to reload the sounds if there's an error
        this.isLoaded = false;
      }
    }
  }

  async cleanup() {
    try {
      for (const [key, player] of this.players.entries()) {
        try {
          player.remove();
        } catch (error) {
          console.error(`Error cleaning up player ${key}:`, error);
        }
      }
      this.players.clear();
      this.isLoaded = false;
    } catch (error) {
      console.error("Error during cleanup:", error);
    }
  }
}

// Create a singleton instance
export const soundService = new SoundService();
