import React from "react";
 
const NewsItem =(props)=> {
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
      <div className="my-3">
        <div className="card">
        <div style={{
          display:"flex",
          justifyContent:"flex-end",
          position:"absolute",
          right:"0"}}>
              <span className=" badge rounded-pill bg-danger">{source}</span>
        </div>
          <img
            src={
              imageUrl
                ? imageUrl
                : "http://www.nasa.gov/sites/default/files/thumbnails/image/52341863186_f8ed9670a4_o_0.jpeg"
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              By {author ? author : "Unknown"} on {new Date(date).toGMTString()}
            </p>
            <a
              rel="noreferrer"
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
}

export default NewsItem;
