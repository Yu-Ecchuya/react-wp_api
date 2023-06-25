import React, { Component } from "react";
import { fetchAPI } from "../services/api";

class SNS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snsData: []
    };

    // 非同期キャンセル用の定義
    this.abortController = new AbortController();
    // fetchAPIの動きを検知
    this.fetchTask = null;
  }

  async componentDidMount() {
    this.fetchTask = fetchAPI();
    const data = await this.fetchTask;

    const snsInfoList = [];
    data['snsData'].map((index => {
      snsInfoList.push(index);
    }));

    this.setState({
      snsData: snsInfoList
    });
  }

  componentWillUnmount() {
    // unmountで非同期を切る
    this.fetchTask &&  this.abortController.abort();
  }

  render() {
    const { snsData } = this.state;

    const snsList = snsData.map((index, value) => {
      return (
        <p key={value}>
          {snsData.length > 0 && index}
        </p>
      )
    });

    return (
      <div style={{ width: "100%", padding: "40px 0" }}>
        {snsList}
      </div>
    );
  }
}

export default SNS;
