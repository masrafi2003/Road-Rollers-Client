import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Typography } from '@mui/material';
import useAuth from '../../hooks/useAuth';

const AllOrders = () => {
    const [orders , setOrders] = useState([]);
    const {user} = useAuth()

    useEffect(()=>{
        fetch('http://localhost:5000/orders')
        .then(res=>res.json())
        .then(data=>setOrders(data));
    },[])

    const handleDelete = id =>{
    
        const proceed = window.confirm('Are You Sure You Want to Delete?')
        if(proceed){
            const url =  `http://localhost:5000/orders/${id}`
            fetch(url,{
                method:"DELETE"
            })
            .then(data=>{
                if(data.deletedCount === 1){
                    alert('Deleted Successfully')
                    const remainingOrders = orders.filter(orders=>orders.email !== user.email);
                    setOrders(remainingOrders);
                }
              
            })
        }
    }
    return (
        <TableContainer component={Paper}>
            <Typography variant='h3'>All Orders</Typography>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">User</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Date Of Delivery</TableCell>
              <TableCell align="right">Cancel Delivery</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((row) => (
              <TableRow
                key={row._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.destination}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.date}</TableCell>
                <TableCell align="right"><Button variant='contained' onClick={()=>{handleDelete(row._id)}}>Cancel {row.destination}</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
};

export default AllOrders;