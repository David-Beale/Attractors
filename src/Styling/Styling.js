import React from "react";
import {
  ThemeProvider as MuiThemeProvider,
  StylesProvider,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeMuiTheme } from "./muiDefaultTheme.js";
import { GlobalStyles } from "./GlobalStyles";

export default function Styling({ children }) {
  const MuiTheme = makeMuiTheme();
  return (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={MuiTheme}>
        <GlobalStyles />
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </StylesProvider>
  );
}
