import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import React, { Component } from "react";
import NewsItem from "./components/NewsItem";
import PropTypes from "prop-types";
import "./News.css";
import Spinner from "./components/Spinner";

export class News extends Component {
  static defaultProps = {
    pageSize: 18,
  };
  static propTypes = {
    category: PropTypes.string.isRequired,
    pageSize: PropTypes.number,
  };
  constructor() {
    super();
    this.state = {
      articles: null,
      page: 1,
      loading: true,
      totalResults: null,
      search: "",
    };
    this.ApiCall = this.ApiCall.bind(this);
    this.SearchApiCall = this.SearchApiCall.bind(this);
    // this.PrevPage = this.PrevPage.bind(this);
    // this.NextPage = this.NextPage.bind(this);
    this.fetchMoreData = this.fetchMoreData.bind(this);
    this.onChange = this.onChange.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.handleKeySearch = this.handleKeySearch.bind(this);
  }
  ApiCall = (category, page) => {
    axios
      .get(
        `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${process.env.REACT_APP_API_KEY}&page=${page}&pageSize=${this.props.pageSize}`
      )
      .then((res) => {
        this.setState({
          articles: res.data.articles,
          loading: false,
          totalResults: res.data.totalResults,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  SearchApiCall = (search, page) => {
    axios
      .get(
        `https://newsapi.org/v2/everything?q=${search}&apiKey=${process.env.REACT_APP_API_KEY}&page=${page}&pageSize=30`
      )
      .then((res) => {
        this.setState({
          articles: res.data.articles,
          loading: false,
          totalResults: res.data.totalResults,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  componentDidMount() {
    const { category } = this.props;
    const { page } = this.state;
    this.setState({ loading: true });
    this.ApiCall(category, page);
  }
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.category !== prevProps.category) {
      const { category } = this.props;
      const { page } = this.state;
      this.setState({ loading: true });
      this.ApiCall(category, page);
    }
  }
  // PrevPage = () => {
  //   const { category } = this.props;
  //   const { page } = this.state;
  //   if (page > 1) this.setState({ page: this.state.page - 1 });
  //   this.setState({ loading: true });
  //   this.ApiCall(category, page);
  // };
  // NextPage = () => {
  //   const { category, pageSize } = this.props;
  //   const { page } = this.state;
  //   if (page < Math.ceil(this.state.totalResults / pageSize))
  //     this.setState({ page: this.state.page + 1 });
  //   this.setState({ loading: true });
  //   this.ApiCall(category, page);
  // };
  fetchMoreData = () => {
    axios
      .get(
        `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${process.env.REACT_APP_API_KEY}&page=${this.props.page}&pageSize=${this.props.pageSize}`
      )
      .then((res) => {
        this.setState({
          articles: this.state.articles.concat(res.data.articles),
          loading: false,
          totalResults: res.data.totalResults,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  onChange = (event) => {
    const { name, value } = event.target;
    if (name === "search")
      this.setState((prev) => ({ ...prev, search: value }));
  };
  updateSearch = (event) => {
    const { name, value } = event.target;
    if (name === "search") this.setState({ search: value });
    const { search, page } = this.state;
    this.setState({ loading: true });
    this.SearchApiCall(search, page);
    this.setState({ search: "" });
  };
  handleKeySearch = (e) => {
    if (e.key === "Enter") {
      this.updateSearch(e);
    }
  };
  render() {
    const { articles, loading } = this.state;
    return (
      <>
        <div className="search__box">
          <div className="search">
            <input
              name="search"
              value={this.state.search}
              onChange={this.onChange}
              onKeyUp={this.handleKeySearch}
              type="text"
              placeholder="Search"
            />
            <i onClick={this.updateSearch} className="fas fa-search"></i>
          </div>
        </div>

        <h1 className="text-center m-4">Trending News</h1>
        {loading && <Spinner />}
        {!loading && (
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spinner />}
          >
            <div className="container">
              <div className="row gy-4">
                {articles.map((element, index) => (
                  <div key={index} className="col-lg-4 col-md-6">
                    <NewsItem
                      source={element.source.name}
                      author={element.author}
                      title={element.title}
                      description={element.description}
                      date={element.publishedAt}
                      url={element.url}
                      imgUrl={element.urlToImage}
                    />
                  </div>
                ))}
                {/* <div className="pages my-5">
              <button
                onClick={() => this.PrevPage()}
                disabled={this.state.page === 1 ? true : false}
                className="ml-2 btn btn-secondary"
              >
                Prev
              </button>
              <h4 style={{ color: "gray", marginTop: "3px" }}>
                {this.state.page}
              </h4>
              <button
                onClick={() => this.NextPage()}
                disabled={
                  this.state.page ===
                  Math.ceil(this.state.totalResults / this.props.pageSize)
                    ? true
                    : false
                }
                className="btn btn-secondary"
              >
                Next
              </button>
            </div> */}
              </div>
            </div>
          </InfiniteScroll>
        )}
      </>
    );
  }
}
//For functional base components
// News.defaultProps = {};
// News.propTypes = {};
export default News;
