import React, { useState } from 'react'
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  LinearProgress,
  DialogTitle,
  DialogContent,
  TableBody,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell
} from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import swal from 'sweetalert'
import { useEffect, useContext } from 'react'
import { UserContext } from './App'
import getUserRole from './Login'
import './Dashboard.css'
import Chart from './Chart'

const axios = require('axios')

export default function Dashboard({ history }) {
  const [token, setToken] = useState('')
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [products, setProducts] = useState([])
  const [pages, setPages] = useState(0)
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
  console.log(catalogVisits)
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
      <nav className="Navbar">
        <h2>Dashboard</h2>
        <p>{role}</p>
        <Button onClick={getProduct}>get</Button>
        <Button
          className='button_style'
          variant='contained'
          size='small'
          onClick={logOut}
        >
          Log Out
        </Button>
        {role === 'superadmin' && <p>superadmin</p>}
        {role === 'admin' && <p>admin</p>}
      </nav>
      <Chart catalog={catalog} catalogVisits={catalogVisits} />

    </div>
  )
}
