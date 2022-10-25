import React, { useState,  useContext } from 'react'
import swal from 'sweetalert'
import { Button, TextField, Link } from '@material-ui/core'
import {UserContext} from './App'
const axios = require('axios')
const bcrypt = require('bcryptjs')

var salt = bcrypt.genSaltSync(10)



export default function Login({history} ) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const login = () => {
    const pwd = bcrypt.hashSync(password, salt)
    axios
      .post('http://localhost:2000/login', {
        username: username,
        password: pwd
      })
      .then((res) => {
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('user_id', res.data.id)
        history.push({pathname: '/dashboard',
          role: res.data.role,
        })
      
      })
      .catch((err) => {
        if (
          err.response &&
          err.response.data &&
          err.response.data.errorMessage
        ) {
          swal({
            text: err.response.data.errorMessage,
            icon: 'error',
            type: 'error'
          })
        }
      })
  }

  return (
    <div style={{ marginTop: '200px' }}>
      <div>
        <h2>Login</h2>
      </div>

      <div>
        <TextField
          id='standard-basic'
          type='text'
          autoComplete='off'
          name='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='User Name'
          required
        />
        <br />
        <br />
        <TextField
          id='standard-basic'
          type='password'
          autoComplete='off'
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          required
        />
        <br />
        <br />
        <Button
          className='button_style'
          variant='contained'
          color='primary'
          size='small'
          disabled={username == '' && password == ''}
          onClick={login}
        >
          Login
        </Button>{' '}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Link href='/register'>Register</Link>
      </div>
    </div>
  )
}
