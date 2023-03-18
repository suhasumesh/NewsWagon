import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
// import InfiniteScroll from "react-infinite-scroll-component";
export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general',
        // totalResults: 0
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    // article is a variable which can be accessed using this.articles
    constructor(props) {
        super(props);
        console.log("hello i am a constructor from newscomponent");
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)}-NewsWagon`;
    }
    async updateNews() {
        // console.log("CDM");
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json();     // JSON is a format for storing and transporting data. JSON is often used when data is sent from a server to a web page.         When receiving data from a web server, the data is always a string. Parse the data with JSON.parse() , and the data becomes a JavaScript object.
        console.log(parsedData);
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false
        })
    }
    async componentDidMount() {
        // console.log("CDM");
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ffd952d1c26e4162ad3f9907268a9b33&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true })
        // let data = await fetch(url);
        // let parsedData = await data.json();     // JSON is a format for storing and transporting data. JSON is often used when data is sent from a server to a web page.         When receiving data from a web server, the data is always a string. Parse the data with JSON.parse() , and the data becomes a JavaScript object.
        // console.log(parsedData);
        // this.setState({
        //     articles: parsedData.articles,
        //     totalResults: parsedData.totalResults,
        //     loading: false
        // })
        this.updateNews();
    }
    handlePreviousClick = async () => {
        console.log("Previous")
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            page: this.state.page - 1,
            loading: false
            
        })
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // this.setState({ page: this.state.page - 1 });
        // this.updateNews();
    }
    handleNextClick = async () => {
        console.log("Next")
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page+1} &pageSize=${this.props.pageSize}`;

            let data = await fetch(url);
            let parsedData = await data.json();
            console.log(parsedData);
            this.setState({
                articles: parsedData.articles,
                page: this.state.page + 1,
                loading: false
            })
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // this.setState({ page: this.state.page + 1 });
        // this.updateNews();
    }
    // fetchMoreData = () => {
    //     this.setState({ page: this.state.page + 1 })
    //     this.updateNews();
    // };
    render() {
        // console.log("render");
        return (
            <div className="container my-3">
                <h2 className='text-center' style={{ margin: '35px 0px' }}>NewsWagon - Top {this.capitalizeFirstLetter(this.props.category)} Headlines </h2>
                {this.state.loading && <Spinner />}
                {/* <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                > */}

                        <div className="row">
                            {this.state.articles.map((element) => {
                                // key shd be unique so in our.....unique is url 
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title.slice(0, 65) : ""} description={element.description ? element.description.slice(0, 90) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                    {/* in the article the title is title itself so we are using title=elemnt.title.slice and same for description,imageurl and newsurl*/}
                                    {/* if null this element.title and elemnt.decription will go to the else part..   :"" */}
                                </div>

                            })}
                        </div>
                    {/* </div> */}
                {/* </InfiniteScroll> */}
                  <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-info" onClick={this.handlePreviousClick}> &laquo; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-info mx-2" onClick={this.handleNextClick}>Next &raquo;</button>
                </div> 
            </div>
        )
    }
}

export default News