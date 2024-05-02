import { useEffect } from "react";

/**
 * Custom hook that listens for specified key presses and triggers a callback function.
 *
 * @param keys - An array of key names to listen for.
 * @param onKeyPress - The callback function to be executed when any of the specified keys are pressed.
 *
 * @example
 * ```typescript
 * useKeyListen(["Enter", "Escape"], () => {
 *   console.log("Enter or Escape key pressed");
 * });
 * ```
 */
export function useKeyListen(keys: string[], onKeyPress: () => void) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    /**
     * Event handler for key presses.
     *
     * @param event - The keyboard event object.
     */
    const handleKeyPress = (event: KeyboardEvent) => {
      console.log(event.key);
      if (keys.includes(event.key)) {
        onKeyPress();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [keys, onKeyPress]);
}
