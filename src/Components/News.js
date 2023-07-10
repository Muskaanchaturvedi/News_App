import React ,{useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



const News =(props)=>{
    
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    

    const capitalize=(string)=>{
        return string.charAt(0).toUpperCase() +string.slice(1);
    }
    
    const updateNews=async()=>{
        props.setProgress(10);
        let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
        setLoading(true)
        let data=await fetch(url)
        props.setProgress(30);
        let parsedData=await data.json()
        props.setProgress(70);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);
    }

    useEffect(() => {
        document.title=`${capitalize(props.category)}-NewsMonkey`
        updateNews()
        // eslint-disable-next-line
    }, [])
    

    
    // const handlePrevClick = async() => {
    //     setPage(page-1)
    //     updateNews();
    //     }

    // const handleNextClick =async() => {
    //     setPage(page+1)
    //     updateNews()
    //     }

    const fetchMoreData = async() => {
       
        let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`
        setPage(page+1)
        let data=await fetch(url)
        let parsedData=await data.json()
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
      };

 
    return (
      <>

        <h1 className="text-center " style={{margin:"40px 0px", marginTop:"90px"}}>NewsMonkey- Top {capitalize(props.category)} Headlines</h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
        <div className="row">
        {articles.map((ele)=>{
            return <div className="col-md-4" key={ele.url}>
            <NewsItem  title={ele.title?ele.title.slice(0,44):""} description={ele.description?ele.description.slice(0,88):""} imageUrl={ele.urlToImage} newsUrl={ele.url} author={ele.author} date={ele.publishedAt} source={ele.source.name}/>
           </div>
        })}
        </div>
        </div>
        </InfiniteScroll>

      </>
    )

}

News.defaultProps = {
    country:'in',
    pageSize:8,
    category:'general,'
  }
News.propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,
}

export default News
