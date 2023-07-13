import { useState } from 'react';
import { Placeholder } from 'react-bootstrap'

function Post({props, colorPicker}) {
  const months = [ "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC" ];
  const colors = [ "#92DCE5", "#EF6F6C", "#FFDDA1", "#E84855", "#70C1B3", "#E8DB7D", "#FF386D", "#00BCD4", "#FF4E5A", "#800080" ];
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  return(
  <div className="wrapper">
    <div className="container" onClick={()=> window.open(`${props.shortlink}`)} style={{cursor: "pointer"}}>
      <div className="top">
        <Placeholder style={{display : isImageLoaded ? "none" : "block", height: "100%", width: "100%"}} animation="glow">
          <Placeholder style={{width: "100%", height: "100%"}} />
        </Placeholder>
        <div className="date" style={{ background: `${colors[colorPicker%10]}`}}>
          {props.date.slice(8,10)} <br/> 
          {months[Number(props.date.slice(5,7))-1]}
        </div>
        <img style={{display: isImageLoaded ? "block" : "none"}} 
             src={props.jetpack_featured_media_url} 
             width={300} 
             height={200}
             loading={"eager"} 
             onLoad={()=>setIsImageLoaded(true)}
             onError={(e)=>{
              if(e.target.src !== "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png")
                e.target.src = "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";
             }}
             alt=""/>
      </div>
      <div className="bottom" style={{background: `linear-gradient(-40deg, ${colors[colorPicker%10]} 50%, rgba(255, 255, 255, 0.5) 50%)`}}>
        <h5 className="title" dangerouslySetInnerHTML={{__html: props.title.rendered}}></h5>
        <p style={{fontSize: "0.85rem", padding: 0}} 
              dangerouslySetInnerHTML={{__html: props.excerpt.rendered}}></p>
      </div>
    </div>
    <div className="inside">
      <div className="icon"><i className="material-icons">info_outline</i></div>
      <div className="contents">
        <table>
          <tbody>
            <tr>
              <th>Date</th>
              <th>Time</th>
            </tr>
            <tr>
              <td>{props.date.slice(0, 10)}</td>
              <td>{props.date.slice(11)}</td>
            </tr>
            <tr>
              <th>Author</th>
            </tr>
            <tr>
              <td>{props.parselyMeta?.["parsely-author"]}</td>
            </tr>
            <tr>
              <th>Category</th>
            </tr>
            <tr>
              <td>{props.parselyMeta?.["parsely-section"]}</td>
            </tr>
            <tr>
              <th>Source</th>
            </tr>
            <tr>
              <td colSpan={2}>{props.shortlink}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  );
}

export default Post;