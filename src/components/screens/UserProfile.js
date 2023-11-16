
// import React, { useEffect, useState, useContext } from 'react';
// import { UserContext } from '../../App';
// import { useParams } from 'react-router-dom';

// const Profile = () => {
//   const [userProfile, setProfile] = useState({});

//   const { state, dispatch } = useContext(UserContext);
//   const { userid } = useParams();
//   const [showfollow,setShowFollow] = useState(state?!state.following.includes(userid):true)
//   useEffect(() => {
//     fetch(`/user/${userid}`, {
//       headers: {
//         "Authorization": "Bearer " + localStorage.getItem("jwt")
//       }
//     })
//       .then(res => res.json())
//       .then(result => {
//         //console.log(result);
//         setProfile(result);
//       });
//   }, [userid]);

//   const followUser =()=>{
//     fetch('/follow',{
//       method:"put",
//       headers:{"Content-Type": "application/json",
//              "Authorization":"Bearer "+localStorage.getItem('jwt')
//     },
//     body: JSON.stringify({
//       followId:userid
//     })
//     }).then(res=>res.json())
//     .then(data=>{
//       //console.log(data);
//       dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
//       localStorage.setItem("user",JSON.stringify(data))
//       setProfile((prevState)=>{
//         return{
//           ...prevState,
//           user:{...prevState.user,
//              followers:[...prevState.user.followers,data._id]
//           }
//         }
//       })
//       setShowFollow(false)
//     })
//   } 


//   const unfollowUser = () => {
//     fetch('/unfollow', {
//       method: "put",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": "Bearer " + localStorage.getItem('jwt')
//       },
//       body: JSON.stringify({
//         unfollowId: userid
//       })
//     })
//       .then(res => res.json())
//       .then(data => {
//         dispatch({ type: "UPDATE", payload: { following: data.following, followers: data.followers } });
//         localStorage.setItem("user", JSON.stringify(data));
  
//         setProfile((prevState) => {
//           const newFollower = prevState.user.followers.filter(item => item !== data._id);
//           return {
//             ...prevState,
//             user: {
//               ...prevState.user,
//               followers: newFollower
//             }
//           };
//         });
  
//         // Update showfollow to true after unfollowing
//         setShowFollow(true);
//       })
//       .catch(err => console.error(err));
//   }
  
//   return (
//     <>
//       {userProfile.user ? (
//         <div style={{ maxWidth: "550px", margin: "0px auto" }}>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-around",
//               margin: "18px 0px",
//               borderBottom: "1px solid gray"
//             }}
//           >
//             <div>
//               <img
//                 style={{ width: "160px", height: "160px", borderRadius: "80px" }}
//                 src="https://media.istockphoto.com/id/1464159103/photo/thoughtful-woman-with-hand-on-chin-looking-up.webp?b=1&s=170667a&w=0&k=20&c=c5nz0mY577kCTETSJCmuoofJtQiH47FZCAv5fsEbCMA="
//                 alt="User Profile"
//               />
//             </div>
//             <div>
//               <h4>{userProfile.user.name}</h4>
//               <h5>{userProfile.user.email}</h5>
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   width: "108%"
//                 }}
//               >
//                 <h6>{userProfile.posts.length} posts</h6>
//                 <h6>{userProfile.user.followers.length} followers</h6>
//                 <h6>{userProfile.user.following.length} following</h6>
//               </div>
//               {showfollow?
//               <button style={{margin:"10px"}} className="btn waves-effect waves-light #64b5f6 blue darken-1"
//               onClick={()=>followUser()}
//               >
//                Follow
//               </button>
//               :
//               <button style={{margin:"10px"}} className="btn waves-effect waves-light #64b5f6 blue darken-1"
//               onClick={()=>unfollowUser()}
//               >
//                UnFollow
//               </button>
//               }
              
      
//             </div>
//           </div>

//           <div className="gallery">
//             {userProfile.posts.map(item => (
//               <img
//                 key={item._id}
//                 className="item"
//                 src={item.photo}
//                 alt={item.title}
//               />
//             ))}
//           </div>
//         </div>
//       ) : (
//         <h2>Loading...........</h2>
//       )}
//     </>
//   );
// };

// export default Profile;



import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../App';
import { useParams } from 'react-router-dom';
const Profile = () => {
  const [userProfile, setProfile] = useState({});
  const[showfollow,setShowFollow] = useState(true)
  const { state, dispatch } = useContext(UserContext);
  const { userid } = useParams();


  useEffect(() => {
    const storedShowFollow = localStorage.getItem('showfollow');
    if (storedShowFollow) {
      setShowFollow(storedShowFollow === 'true');
    }

    fetch(`/user/${userid}`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    })
      .then(res => res.json())
      .then(result => {
        setProfile(result);
      });
  }, [userid]);

const followUser =()=>{
  fetch('/follow',{
    method:"put",
    headers:{
      "Content-Type":"application/json",
       "Authorization":"Bearer "+localStorage.getItem('jwt')
  },
  body:JSON.stringify({
    followId:userid
  })

  }).then(res=>res.json())
  .then(data=>{
    console.log(data)
    dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
     localStorage.setItem("user",JSON.stringify(data))
  setProfile((prevState)=>{
    return{
      ...prevState,
      user:{
        ...prevState.user,
      followers:[...prevState.user.followers,data._id]
      }
    }
  })
  setShowFollow(false);
  localStorage.setItem('showfollow', 'false');
    })
}
const unfollowUser = () => {
  fetch('/unfollow', {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem('jwt')
    },
    body: JSON.stringify({
      unfollowId: userid
    })
  })
    .then(res => res.json())
    .then(data => {
      dispatch({ type: "UPDATE", payload: { following: data.following, followers: data.followers } });
      localStorage.setItem("user", JSON.stringify(data));

      setProfile((prevState) => {
        const newFollower = prevState.user.followers.filter(item => item !== data._id);
        return {
          ...prevState,
          user: {
            ...prevState.user,
            followers: newFollower
          }
        };
      });

      // Update showfollow to true after unfollowing
      setShowFollow(true);
      localStorage.setItem('showfollow', 'true');
    })
    .catch(err => console.error(err));
}
return (
    <>
      {userProfile.user ? (
        <div style={{ maxWidth: "550px", margin: "0px auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              margin: "18px 0px",
              borderBottom: "1px solid gray"
            }}
          >
            <div>
              <img
                style={{ width: "160px", height: "160px", borderRadius: "80px" }}
                src={userProfile.user.pic}
                alt="User Profile"
              />
            </div>
            <div>
              <h4>{userProfile.user.name}</h4>
              <h5>{userProfile.user.email}</h5>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "108%"
                }}
              >
                <h6>{userProfile.posts.length} posts</h6>
                <h6>{userProfile.user.followers.length} followers</h6>
                <h6>{userProfile.user.following.length} following</h6>
              </div>
              {showfollow?
              <button style={{margin:"10px"}} className="btn waves-effect waves-light #64b5f6 blue darken-1"
       onClick={()=>followUser()}
       >
        Follow   
       </button>
       :
              <button style={{margin:"10px"}} className="btn waves-effect waves-light #64b5f6 blue darken-1"
       onClick={()=>unfollowUser()}
       >
        unFollow   
       </button>
      }
            </div>
          </div>

          <div className="gallery">
            {userProfile.posts.map(item => (
              <img
                key={item._id}
                className="item"
                src={item.photo}
                alt={item.title}
              />
            ))}
          </div>
        </div>
      ) : (
        <h2>Loading...........</h2>
      )}
    </>
  );
};

export default Profile;