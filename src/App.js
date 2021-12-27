import React, { Component } from "react";
import Navbar from "./pages/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import News from "./pages/News/News";
class App extends Component {
  render() {
    return (
      <>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<News category="general" />} />
          <Route
            exact
            path="/business"
            element={<News category="business" />}
          />
          <Route
            exact
            path="/entertainment"
            element={<News category="entertainment" />}
          />
          <Route exact path="/science" element={<News category="science" />} />
          <Route exact path="/health" element={<News category="health" />} />
          <Route exact path="/sports" element={<News category="sports" />} />
          <Route
            exact
            path="/technology"
            element={<News category="technology" />}
          />
        </Routes>
      </>
    );
  }
}

export default App;
