import React, { Component } from "react";
import "./NewsItem.css";
export class NewsItem extends Component {
  render() {
    let { title, description, date, author, imgUrl, url, source } = this.props;
    return (
      <>
        <div className="card__box">
          <img
            className="image img-fluid"
            src={
              !imgUrl
                ? "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                : imgUrl
            }
            alt=""
          />
          <div className="card__content">
            <p className="source">{!source ? "unknown" : source}</p>
            <h3 className="title">{title}</h3>
            <div className="sub_detail">
              <p>{new Date().toUTCString(date)}</p>
              <p>By {!author ? "Anonymonous" : author}</p>
            </div>
            <p className="desc">
              {!description ? description : description.slice(0, 150) + "....."}
            </p>
            <div className="card__button">
              <a className="btn btn-primary" href={url} target="__blank">
                Read more
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default NewsItem;
