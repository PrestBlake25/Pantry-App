'use client'
import Image from "next/image";
import {useState, useEffect} from 'react'
import {firestore} from '@/firebase'
import {Box, Button, Modal, Typography, Stack, TextField} from '@mui/material'
import { 
  collection, 
  deleteDoc, 
  getDocs, 
  doc, 
  query, 
  getDoc, 
  setDoc
} from "firebase/firestore";


export default function Home() {
  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState(false) 
  const [itemName, setItemName] = useState('')

  const updateInventory = async() => {
    const snapshot = query(collection(firestore,'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc)=>{
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      })
    })
    setInventory(inventoryList)
  };
  
  const removeItem = async(item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()){
      const {quant} = docSnap.data()
      if (quant === 1) {
        await deleteDoc(docRef)
      }else{
        await setDoc(docRef, {quant: quant - 1})
      }
      if (typeof quant !== 'number') {
        console.error('Invalid quant value:', quant);
        return;
      }
    }
    await updateInventory()
  }
  const addItem = async(item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()){
      const {quant} = docSnap.data()
      await setDoc(docRef, {quant: quant + 1})
    }else{
      await setDoc(docRef, {quant: 1})
    }
    await updateInventory()
  }

  useEffect(()=>{
    updateInventory()
  }, [])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
  <Box
    sx={{ bgcolor: 'info.main' }}
    width="100vw" 
    height="100vh" 
    display="flex" 
    flexDirection="column"
    justifyContent="center" 
    alignItems="center"
    gap={2}>
    <Modal open={open} onClose={handleClose}>
      <Box 
      position="absolute" 
      top="50%" 
      left="50%" 
      width={400}
      bgcolor="white"
      border="2px solid #000"
      boxShadow={24}
      p={4}
      display="flex"
      flexDirection="column"
      gap={3}
      sx={{
        transform:"translate(-50%,-50%)",
      }}
      >
        <Typography variant="h6"> Add Item</Typography>
        <Stack width="100%" direction="row" spacing={3}>
          <TextField
          variant='outlined'
          fullWidth
          value={itemName}
          onChange={(e) => {
            setItemName(e.target.value)
          }}/> 
          <Button
          variant="outlined"
          onClick={()=>{
            addItem(itemName)
            setItemName('')
            handleClose()
          }}>Add</Button>    
        </Stack>
      </Box>
    </Modal>
    {/* <Typography variant="h1">Inventory Management</Typography> */}
    <Button variant="contained" onClick={()=> {
      handleOpen()
    }}
    > Add New Item</Button>
    <Box border="1px solid #333" sx={{ bgcolor: 'warning.main' }}>
      <Box width="800px" 
           height="100px" 
           bgcolor="#2196f3"
           display="flex" 
           alignItems="center" 
           justifyContent="center">

        <Typography variant="h2" color="#ffebee">
          Inventory Items
        </Typography>
      </Box>
    <Stack
      height="300px"
      width="800px"
      spacing={2}
      overflow="auto">
      {inventory.map(({name, quant}) => (
            <Box
            key={name}
            width="100%"
            minHeight="150px"
            display="flex"
            alignItems="center"
            justifyContent='space-between'
            bgcolor="f0f0f0"
            padding={5}
            >
            <Typography variant="h3" color="#333" textAlign="center">
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Typography>
            <Typography variant="h3" color="#333" textAlign="center">
              Number: {quant}
            </Typography>
            <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={()=>{
              addItem(name)
            }}> Add</Button>
            <Button variant="contained" onClick={()=>{
              removeItem(name)
            }}> Remove</Button>
            </Stack>
          </Box>
        ))}
    </Stack>
    </Box>
  </Box>
  )
}
