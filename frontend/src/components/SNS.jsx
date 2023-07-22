import React, { Component } from "react";
import { snsAPI } from "../services/api";

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
    try {
      this.fetchTask = await snsAPI();
      const data = this.fetchTask;
      if (data) {
        this.setState({
          snsData: data,
        });
      }
    } catch(error) {
      console.error(error);
    }
  }

  componentWillUnmount() {
    // unmountで非同期を切る
    this.fetchTask &&  this.abortController.abort();
  }

  render() {
    const { snsData } = this.state;

    const snsList = snsData.map((index, value) => {
      return (
          <li key={value}>
            <a href={index.permalink} target="_blank" rel="noopener noreferrer">
              <img src={index.media_url} alt={index.caption} />
            </a>
          </li>
      )
    });

    return (
      <div style={{ width: "100%", padding: "40px 0" }}>
        <ul>
          {snsList}
        </ul>
      </div>
    );
  }
}

export default SNS;
