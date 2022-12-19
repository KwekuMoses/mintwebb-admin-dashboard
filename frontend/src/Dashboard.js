import React, { useState } from 'react'
import {
  Button,
  // TextField,
  // Dialog,
  // DialogActions,
  LinearProgress,
  // DialogTitle,
  // DialogContent,
  // TableBody,
  // Table,
  // TableContainer,
  // TableHead,
  // TableRow,
  // TableCell
} from '@material-ui/core'
// import { Pagination } from '@material-ui/lab'
// import swal from 'sweetalert'
import { useEffect, useContext } from 'react'
// import { UserContext } from './App'
// import getUserRole from './Login'
import './styles/Dashboard/Dashboard.css'
import StatisticModule from './StatisticModule'
import Navbar from './Navbar'

const axios = require('axios')

export default function Dashboard({ history }) {
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [role, setRole] = useState('')
  const [catalog, setCatalog] = useState('')
  const [catalogVisits, setCatalogVisits] = useState('')


  useEffect(() => {
    let token = localStorage.getItem('token')
    if (!token) {
      history.push('/login')
    } else {
      setToken(token, getProduct(token), getRole(token), postStats(token, catalog))
    }
    axios.get('/')
  }, [catalog])


  const postStats = (token, catalog) => {
    axios.post('/stats', {
      data: {
        catalog: catalog
      },
      headers: {
        token: token
      }

    }).then((data) => {
      setCatalogVisits(data.data)

    }).catch((err) => {
      console.log(err.response.data)
    })
  }

  const getRole = (token) => {
    axios.get('/role', {
      headers: {
        token: token
      }

    }).then((data) => {
      setRole(data.data.the_user.role)
      setCatalog(data.data.the_user.catalog)
      setLoading(false)

    }).catch((err) => {
      console.log(err.response.data)
    })
  }
  // getRole(token)

  const getProduct = (token) => {
    setLoading(true)
  }

  const logOut = () => {
    localStorage.setItem('token', null)
    history.push('/')
  }

  return (
    <div className="Dashboard">
      {loading && <LinearProgress size={40} />}
      <Navbar logOut={logOut} />
      <StatisticModule catalog={catalog} catalogVisits={catalogVisits} />
      {/* {role === 'superadmin' && <p>superadmin</p>}
        {role === 'admin' && <p>admin</p>} */}
    </div>
  )
}
