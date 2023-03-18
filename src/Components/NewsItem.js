import React, { Component } from 'react'

export class NewsItem extends Component {

    render() {
        let { title, description, imageUrl, newsUrl, author, date ,source} = this.props;
        return (
            <div className='my-3'>
                <div className="card"  >
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ left:'75%',zIndex:'1'} }>
                            {source}
                            
                        </span>
                    <img src={!imageUrl ? 'https://images.hindustantimes.com/img/2022/10/12/1600x900/967aea6c-26ce-11ec-9d0a-2107028cb826_1633543135172_1665570679662_1665570679662.jpg' : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">By {!author ? "unknown" : author} on {new Date(date).toGMTString()}</small></p>

                        <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem