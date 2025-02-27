import _extends from "@babel/runtime/helpers/esm/extends";
import { getThemeProps } from '@material-ui/styles';
import useTheme from './useTheme';
import defaultTheme from './defaultTheme';
export default function useThemeProps({
  props: inputProps,
  name
}) {
  const props = _extends({}, inputProps);

  const contextTheme = useTheme() || defaultTheme;
  const more = getThemeProps({
    theme: contextTheme,
    name,
    props
  });
  const theme = more.theme || contextTheme;
  const isRtl = theme.direction === 'rtl';
  return _extends({
    theme,
    isRtl
  }, more);
}