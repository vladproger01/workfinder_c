import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import AdminLayout from "layouts/Admin.js";
import { ChakraProvider } from "@chakra-ui/react";
// Custom Chakra theme
import theme from "theme/theme.js";

ReactDOM.render(
  <ChakraProvider theme={theme} resetCss={false} position="relative">
    <BrowserRouter>
      <Switch>
        <Route path={`/auth`} component={AdminLayout} />
        <Route path={`/student`} component={AdminLayout} />
        <Route path={`/company`} component={AdminLayout} />
        <Route path={`/`} component={AdminLayout} />
        

      </Switch>
    </BrowserRouter>
  </ChakraProvider>,
  document.getElementById("root")
);
