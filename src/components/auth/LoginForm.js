import React from 'react';

const LoginForm = ({ values, setInput, role, onSubmit, disabled, error }) => {
  const { account, password } = values
  const checkRole = role === 'supply' ? 'supply teacher' : role
  return (
    
    <div className="form-container">
      <h2 className="text-center mt-3 login-header px-5">Welcome {role && checkRole[0].toUpperCase() + checkRole.slice(1) }! Please Login</h2>
      <form onSubmit={onSubmit} id="login-form" className="form login-form">
        <div className="form-group">
          <input className="form-control" type="text" name="account" value={account} onChange={setInput} placeholder="Account #"/>
        </div>
        <div className="form-group">
          <input className="form-control" type="password" name="password" value={password} onChange={setInput} placeholder="password"/>
        </div>
        <button disabled={disabled} className="btn btn-info" type="submit">Submit</button>
        {error && <p className="alert alert-danger mt-5">{error}</p> }
    </form>

    </div>
    
  );
};

export default LoginForm;