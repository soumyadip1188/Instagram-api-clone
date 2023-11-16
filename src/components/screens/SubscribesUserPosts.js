import React,{useState,useEffect,useContext} from 'react';
import {UserContext} from '../../App'
import {Link} from 'react-router-dom'
const Home = ()=>{
   const [data,setData]= useState([])
   const {state,dispatch} = useContext(UserContext)
   useEffect(()=>{
   fetch('/getsubpost',{
     headers:{
      "Authorization":"Bearer "+localStorage.getItem("jwt")
     }
   }).then(res=>res.json())
   .then(result=>{
      console.log(result)
      setData(result.posts)
   })
   },[])
   
   const updateLikeStatus = (postId, isLiked) => {
      const updatedData = data.map((item) => {
        if (item._id === postId) {
          const newLikes = isLiked ? [...item.likes, state._id] : item.likes.filter((likeId) => likeId !== state._id);
          return { ...item, likes: newLikes };
        } else {
          return item;
        }
      });
  
      setData(updatedData);
    };



   const likePost = (id)=>{
      updateLikeStatus(id, true);

        fetch('/like',{
         method: 'PUT',
         headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("jwt")
         },
         body: JSON.stringify({
             postId:id
         })
        }).then(res=>res.json())
  
      .catch(err=>{
         //console.error(err);
         updateLikeStatus(id, false);
        })
   }

   const unlikePost = (id)=>{
      updateLikeStatus(id, false);

      fetch('/unlike',{
       method: 'PUT',
       headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("jwt")
       },
       body: JSON.stringify({
           postId:id
       })
      }).then(res=>res.json())
     
      .catch(err=>{
         //console.error(err);
         updateLikeStatus(id, false);
      })
 }



const makeComment = (text, postId) => {
   fetch('/comment', {
     method: 'put',
     headers: {
       'Content-Type': 'application/json',
       'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
     },
     body: JSON.stringify({
       postId,
       text,
     }),
   })
     .then((res) => res.json())
     .then((result) => {
       //console.log('Comment added successfully:', result); // Add this line
       const newData = data.map((item) => {
         if (item._id === result._id) {
           return result;
         } else {
           return item;
         }
       });
       setData(newData);
     })
     .catch((err) => {
       //console.error('Error adding comment:', err); // Add this line
     });
 };
 
const deletePost = (postid) => {
   fetch(`/deletepost/${postid}`,{
      method:"delete",
      headers:{
         Authorization: "Bearer " +localStorage.getItem("jwt")
      }
   }).then(res=>res.json())
   .then(result=>{
      console.log(result)
      // const newData = data.filter(item=>{
      //    return item._id !==result._id
      // })
      const updatedData = data.filter((item) => item._id !== postid);
      setData(updatedData);
      //setData(newData)
   })
   .catch((err) => {
      console.error(err);
    });
}

   return(
     <div className="home">
      {
         data.map(item=>{
            return(
            <div className="card home-card">
               <h5 style={{padding:"5px"}}><Link to={item.postedBy._id !== state._id?"/profile/"+item.postedBy._id :"/profile"}>{item.postedBy.name}</Link> {item.postedBy._id === state._id
               && <Link> <i className="material-icons"  style={{float: 'right'}} 
               onClick={()=>deletePost(item._id)}
               >delete</i></Link>
               }
               
               </h5>
               <div className="card-image">
                  <img src={item.photo}/>
               </div>
               <div className="card-content">
               {item.likes.includes(state._id)
               ?
               <Link><i className="material-icons" style={{color: 'red'}}
                  onClick={()=>{unlikePost(item._id)}}
                  >favorite</i></Link>
               :
               <Link><i className="material-icons"
               onClick={()=>{likePost(item._id)}}
               >favorite_border</i></Link>
               }
              
               
                  <h6>{item.likes.length} likes</h6>
                  <h6>{item.title}</h6>
                  <p>{item.body}</p>
                  {
                     item.comments.map(record=>{
                        return(
                           <h6 key={record._id}><span style={{fontWeight:"500"}}>{record.postedBy.name+" "}</span>{record.text}</h6>
                        )
                     })
                  }
                  <form onSubmit={(e)=>{
                     e.preventDefault()
                     makeComment(e.target[0].value,item._id)
                  }}>
                  <input type="text" placeholder="add a comment" />

                  </form>
               </div>
            </div>
            )
         })
      }

     
     </div>
   )
}
export default Home;