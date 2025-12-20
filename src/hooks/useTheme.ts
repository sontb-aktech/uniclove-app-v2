import {ThemeContext} from 'ThemeProvider';
import {useContext} from 'react';

const useTheme = () => {
  const {theme, themeStyle} = useContext(ThemeContext);
  return {theme, themeStyle};
};
export default useTheme;
