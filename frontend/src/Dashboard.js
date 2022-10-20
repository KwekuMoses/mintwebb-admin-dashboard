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
import { useEffect } from 'react'
const axios = require('axios')

export default function Dashboard({ history }) {
  const [token, setToken] = useState('')
  const [openProductModal, setOpenProductModal] = useState(false)
  const [openProductEditModal, setOpenProductEditModal] = useState(false)
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [price, setPrice] = useState('')
  const [discount, setDiscount] = useState('')
  const [file, setFile] = useState('')
  const [fileName, setFileName] = useState('')
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [products, setProducts] = useState([])
  const [pages, setPages] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let token = localStorage.getItem('token')
    if (!token) {
      history.push('/login')
    } else {
      setToken(token)
    }
  }, [])

  const getProduct = () => {
    setLoading(true)

    let data = '?'
    data = `${data}page=${page}`
    if (search) {
      data = `${data}&search=${search}`
    }
    axios
      .get(`http://localhost:2000/get-product${data}`, {
        headers: {
          token: token
        }
      })
      .then((res) => {
        setLoading(false)
        setProducts(res.data.products)
        setPages(res.data.pages)
        console.log('1')
      })
      .catch((err) => {
        console.log('2')
        swal({
          text: err.response.data.errorMessage,
          icon: 'error',
          type: 'error'
        })
        setLoading(false)
        setProducts([])
        setPages(0)
      })
  }

  const logOut = () => {
    localStorage.setItem('token', null)
    history.push('/')
  }

  return (
    <div>
      {loading && <LinearProgress size={40} />}
      <div>
        <h2>Dashboard</h2>
        <Button onClick={getProduct}>get</Button>
        <Button
          className='button_style'
          variant='contained'
          size='small'
          onClick={logOut}
        >
          Log Out
        </Button>
      </div>
      <br />
      <TableContainer>
        <TextField
          id='standard-basic'
          type='search'
          autoComplete='off'
          name='search'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search by product name'
          required
        />
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Name</TableCell>
              <TableCell align='center'>Image</TableCell>
              <TableCell align='center'>Description</TableCell>
              <TableCell align='center'>Price</TableCell>
              <TableCell align='center'>Discount</TableCell>
              <TableCell align='center'>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row) => (
              <TableRow key={row.name}>
                <TableCell align='center' component='th' scope='row'>
                  {row.name}
                </TableCell>
                <TableCell align='center'>
                  <img
                    src={`http://localhost:2000/${row.image}`}
                    width='70'
                    height='70'
                  />
                </TableCell>
                <TableCell align='center'>{row.desc}</TableCell>
                <TableCell align='center'>{row.price}</TableCell>
                <TableCell align='center'>{row.discount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <br />
      </TableContainer>
    </div>
  )
}
