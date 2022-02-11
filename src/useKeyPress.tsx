import { useEffect } from "react";

export function useKeyPress(callback: (key: number) => void): void {
  const handler = ({ key }: KeyboardEvent) => {
    if (!isNaN(+key)) {
			console.log(+key);
			callback(+key);
		}
  };

  useEffect(() => {
    window.addEventListener("keyup", handler);
    return () => {
      window.removeEventListener("keyup", handler);
    };
  }, []);
}
