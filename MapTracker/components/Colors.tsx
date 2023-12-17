import { useColorScheme } from 'react-native';

export function Colors() {
  const isDarkMode = useColorScheme() === 'dark';

  return isDarkMode
    ? {
        foreground: 'white',
        background: 'black',
        backgroundDim: 'darkslategrey',
        selectedText: 'lightskyblue',
        selectedBackground: 'darkslateblue',
      }
    : {
        foreground: 'black',
        background: 'white',
        backgroundDim: 'lightslategrey',
        selectedText: 'darkslateblue',
        selectedBackground: 'lightskyblue',
      };
}
