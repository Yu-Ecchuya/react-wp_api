import React, { Component } from "react";
import { fetchAPI } from "../services/api";

class Contents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  async componentDidMount() {
    const data = await fetchAPI();
    this.setState({
      data: data
    });
  }

  render() {
    const { data } = this.state;

    return (
      <div style={{ width: "100%", padding: "40px 0" }}>
        {data.length > 0 && data[0].acf['Introductory_text']}
      </div>
    );
  }
}

export default Contents;
