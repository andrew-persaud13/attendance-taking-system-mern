import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth/AuthState'
import { getChildren } from '../../api'
import ChildrenCard from '../../components/ChildrenCard';

const ParentHome = () => {
  const { token } = useAuth()
  const [children, setChildren] = useState([])
  const [loading, setLoading] = useState([])

  useEffect(() => {
    setLoading(true)
    getChildren(token)
      .then(res => {
        setChildren(res.data.children)
        setLoading(false)
      })
      .catch(err => {
        setLoading(false)
        console.log(err)
      })
  }, [token])


  const renderChildren = () => {
    return children.map(child => 
      <div key={child._id} className="col-4 m-2">
        <ChildrenCard child={child} />
      </div>
    )
  }
  
  if(loading || (children && children.length === 0)) return <h1>Loading...</h1>

  return (

    <div className="container parent-container p-3">
      <h2 className="text-center">Your Children</h2> <hr></hr>
      <div className="row">
      {renderChildren()}
      </div>
    
    </div>
  );
};

export default ParentHome;