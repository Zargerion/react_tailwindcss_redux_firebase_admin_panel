import React from 'react';
import { removeUser } from '../store/slices/userSlice'
import { useDispatch } from 'react-redux';
import { useAuth } from '../hooks/user_auth'
import { Navigate } from 'react-router-dom';




function IsAuth() {
  const dispatch = useDispatch();
  const { isAuth, email } = useAuth();

  if (isAuth) {
    return (
      <div className="p-3 bg-gray-50 flex flex-wrap items-center justify-start">
        <h2 className="text-lg">{email}</h2>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-3 rounded"
          onClick={() => dispatch(removeUser())}
        >
          Выйти
        </button>
      </div>
    );
  } else {
    return (<Navigate to="/validation" replace />)
  }
}

export default IsAuth;