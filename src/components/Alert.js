import React from 'react'
function Alert(props) {
  const mkcpt=(word)=>{
    const lower= word.toLowerCase();
    return lower.charAt(0).toUpperCase()+word.slice(1);
  }
  return (
    <div style={{height: 50}}>
    {props.alert && <div className={`alert alert-${props.alert.type} d-flex align-items-center`} role="alert">
        <div>
        <strong>{mkcpt(props.alert.type)}</strong>: {props.alert.msg}
        </div>
    </div>}
    </div>
  )
}
export default Alert
