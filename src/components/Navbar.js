// import React,{useContext,useRef,useEffect,useState} from 'react';
// import {Link,useNavigate } from 'react-router-dom';
// import {UserContext} from '../App'
// import M from 'materialize-css'
// const NavBar=()=>{
//   const searchModal = useRef(null)
//   const [search,setSearch] =useState('')
//   const [userDetails,setUserDetails] = useState([])
//   const [noUserFound, setNoUserFound] = useState(false);
//   const navigate = useNavigate();
//   const {state,dispatch} = useContext(UserContext)

//   useEffect(()=>{
//     M.Modal.init(searchModal.current)
//   },[])


//   const fetchUsers=(query)=>{
//     setSearch(query)
//     fetch('/search-users',{
//       method: "post",
//       headers:{
//         "Content-Type": "application/json"
//       },
//       body:JSON.stringify({
//         query
//       }),
//     }).then(res=>res.json())
//     .then(results=>{
//       setUserDetails(results.user)
//       setNoUserFound(results.user.length === 0); // Set noUserFound state based on search results
//       const modalInstance = M.Modal.getInstance(searchModal.current);
//       modalInstance.open();
//     })
//   }

//   const renderList = ()=>{
//     if(state){
//      return [
//       <li key="1"><Link><i data-target="modal1" className="large material-icons modal-trigger" style={{color:"black"}}>search</i></Link></li>,
//       <li key="2"><Link to="/profile">Profile</Link></li>,
//       <li key="3">< Link to="/create">Create Post</Link></li>,  
//       <li key="4">< Link to="/myfollowingpost">My Following Posts</Link></li>,  
//       <li key="5">
//         <button className="btn #c62828 red darken-1"
//        onClick={()=>{
//         localStorage.clear()
//         dispatch({type: "CLEAR"})
//         navigate('/signin')
//        }}
//        >
//         Logout  
//        </button>
//       </li>    
//      ]
//     }else{
//        return [
//         <li key="6"><Link to="/signin">Login</Link></li>,
//         <li key="7"><Link to="/signup">Signup</Link></li>
//        ]
//     }
//   }




//     return(
//   //       <nav>
//   //       <div className="nav-wrapper white">
//   //         <Link to={state?"/":"/signin"} className="brand-logo left">Instagram</Link>
//   //         <ul id="nav-mobile" className="right">
//   //           {renderList()}
//   //         </ul>
//   //       </div>
//   //     <div id="modal1" class="modal" ref={searchModal} style={{color:"black"}}>
//   //   <div className="modal-content">
//   //   <input type="text"
//   //    placeholder="search users"
//   //      value={search}
//   //      onChange={(e)=>fetchUsers(e.target.value)}
//   //      />
//   //   <div className="collection">
      
//   //     {userDetails.map(item=>{
//   //       return <Link to={item._id !== state._id ?"/profile/"+item._id:"/profile"} onClick={()=>{
//   //         M.Modal.getInstance(searchModal.current).close()
//   //         setSearch('')
//   //       }}> <a href="#!" className="collection-item">{item.name}</a></Link>

//   //     })}
        
//   //   </div>
//   //   </div>
//   //   <div className="modal-footer">
//   //     <button className="modal-close waves-effect waves-green btn-flat" onClick={()=>setSearch('')}>Close</button>
//   //   </div>
//   // </div>
//   //     </nav>



//   <nav>
//   <div className="nav-wrapper white">
//     <Link to={state ? '/' : '/signin'} className="brand-logo left">
//       Instagram
//     </Link>
//     <ul id="nav-mobile" className="right">
//     {renderList()}
//     </ul>
//   </div>
//   <div id="modal1" className="modal" ref={searchModal} style={{ color: 'black' }}>
//     <div className="modal-content">
//       <input
//         type="text"
//         placeholder="search users"
//         value={search}
//         onChange={(e) => fetchUsers(e.target.value)}
//       />
//       <div className="collection">
        
         
        
//          { userDetails.map((item) => (
//             <Link
//               key={item._id}
//               to={item._id !== state._id ? '/profile/' + item._id : '/profile'}
//               onClick={() => {
//                 M.Modal.getInstance(searchModal.current).close();
//                 setSearch('');
//               }}
//             >
//               {' '}
//               <a href="#!" className="collection-item">
//                 {item.name}
//               </a>
//             </Link>
//           ))}
//                     {setNoUserFound && <p>No User Found</p>}

//       </div>
//     </div>
//     <div className="modal-footer">
//       <button className="modal-close waves-effect waves-green btn-flat" onClick={() => setSearch('')}>
//         Close
//       </button>
//     </div>
//   </div>
// </nav>





//     )
// }

// export default NavBar



import React,{useContext,useRef,useEffect,useState} from 'react';
import {Link,useNavigate } from 'react-router-dom';
import {UserContext} from '../App'
import M from 'materialize-css'
const NavBar=()=>{
  const searchModal = useRef(null)
  const [search,setSearch] =useState('')
  const [userDetails,setUserDetails] = useState([])
  const [noUserFound, setNoUserFound] = useState(false);
  const navigate = useNavigate();
  const {state,dispatch} = useContext(UserContext)
  //const mobileMenuRef = useRef(null);

  useEffect(()=>{
    M.Modal.init(searchModal.current)
  },[])

  

  useEffect(() => {
    if (userDetails.length > 0) {
      const modalInstance = M.Modal.getInstance(searchModal.current);
      modalInstance.open();
    } else {
      const modalInstance = M.Modal.getInstance(searchModal.current);
      modalInstance.close();
    }
  }, [userDetails]);
  
  const renderList = ()=>{
    if(state){
     return [
      <li key="1"><Link><i data-target="modal1" className="large material-icons modal-trigger" style={{color:"black"}}>search</i></Link></li>,
      <li key="2"><Link to="/profile">Profile</Link></li>,
      <li key="3">< Link to="/create">Create Post</Link></li>,  
      <li key="4">< Link to="/myfollowingpost">My Following Posts</Link></li>,  
      <li key="5">
        <button className="btn #c62828 red darken-1"
       onClick={()=>{
        localStorage.clear()
        dispatch({type: "CLEAR"})
        navigate('/signin')
       }}
       >
        Logout  
       </button>
      </li>    
     ]
    }else{
       return [
        <li key="6"><Link to="/signin">Login</Link></li>,
        <li key="7"><Link to="/signup">Signup</Link></li>
       ]
    }
  }


  useEffect(() => {
    const modalInstance = M.Modal.getInstance(searchModal.current);
    if (userDetails.length > 0 || (search && userDetails.length === 0)) {
      modalInstance.open();
      setNoUserFound(userDetails.length === 0);
    } else {
      modalInstance.close();
    }
  }, [userDetails, search]);

  const fetchUsers = (query) => {
    setSearch(query);
    fetch('/search-users', {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query
      })
    }).then(res => res.json())
      .then(results => {
        setUserDetails(results.user);
        
      });
  }


  

    return(
     
    <nav>
  <div className="nav-wrapper white">
 

    <Link to={state ? '/' : '/signin'} className="brand-logo left">
      Instagram
    </Link>
    <ul id="nav-mobile" className="right hide-on-med-and-down">
    {renderList()}
    </ul>
  </div>
  <div id="modal1" className="modal" ref={searchModal} style={{ color: 'black' }}>
    <div className="modal-content">
      <input
        type="text"
        placeholder="search users"
        value={search}
        onChange={(e) => fetchUsers(e.target.value)}
      />
      <div className="collection">
        {noUserFound ? (
         <center><i style={{color:'red'}}>No User Found 😞</i></center>
        ) : (
          userDetails.map((item) => (
            <Link
              key={item._id}
              to={item._id !== state._id ? '/profile/' + item._id : '/profile'}
              onClick={() => {
                M.Modal.getInstance(searchModal.current).close();
                setSearch('');
              }}
            >
              {' '}
              <a href="#!" className="collection-item">
                {item.name}
              </a>
            </Link>
          ))
        )}
      </div>
    </div>
    <div className="modal-footer">
      <button className="modal-close waves-effect waves-green btn-flat" onClick={() => setSearch('')}>
        Close
      </button>
    </div>
  </div>
</nav>

   )
}

export default NavBar