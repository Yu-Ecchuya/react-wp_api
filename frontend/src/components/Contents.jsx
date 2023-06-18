import React, { Component } from "react";
import { fetchAPI } from "../services/api";

class Contents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };

    // 非同期キャンセル用の定義
    this.abortController = new AbortController();
    // fetchAPIの動きを検知
    this.fetchTask = null;
  }

  async componentDidMount() {
    this.fetchTask = fetchAPI();
    const data = await this.fetchTask;
    this.setState({
      data: data
    });
  }

  componentWillUnmount() {
    // unmountで非同期を切る
    this.fetchTask &&  this.abortController.abort();
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
