import {Table, TableRow, TableCell, TableCaption, TableHead, TableBody, Box, Link, Button, Icon, CheckBox, Text } from '@adminjs/design-system'
import { FaRegTrashCan, FaPenToSquare  } from "react-icons/fa6";

const tableStyles = {
  backgroundColor: "white",
  padding: "16px",
  borderRadius: "6px"
};

const addBtnStyles = {
  float: "right",
}

const editBtnStyles = {
  cursor: "pointer",
  fontSize: "16px",
  color: "blue",
  marginRight: "4px"
}

const removeBtnStyles = {
  cursor: "pointer",
  fontSize: "16px",
  color: "red"
}

const userDummyData = [
    {
      id: 0,
      email: "abc1@gmail.com",
      password: "123456"
    },
    {
      id: 1,
      email: "abc1@gmail.com",
      password: "123456"
    },
    {
      id: 2,
      email: "abc1@gmail.com",
      password: "123456"
    },
    {
      id: 3,
      email: "abc1@gmail.com",
      password: "123456"
    },
    {
      id: 4,
      email: "abc1@gmail.com",
      password: "123456"
    },
    {
      id: 5,
      email: "abc1@gmail.com",
      password: "123456"
    },
    {
      id: 6,
      email: "abc1@gmail.com",
      password: "123456"
    },
]


export const UserTable = () => {
  return(
    <div className="table" style={tableStyles}>
      <Box pt="x3">
        <Table>
          <TableCaption>
            <Text as="span">Quản lí người dùng</Text>
            <Button style={addBtnStyles}>+ Add</Button>
          </TableCaption>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userDummyData.map(user => 
              <TableRow>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <FaPenToSquare className='btn edit-btn' style={editBtnStyles}/>
                  <FaRegTrashCan className='btn remove-btn' style={removeBtnStyles}/>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
    </div>
  )
}

