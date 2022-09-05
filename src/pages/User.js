import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Drawer
} from '@mui/material';
import { SnackbarProvider, useSnackbar } from 'notistack';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
import AddUsers from './User_component/AddUsers';
import  SuccessMessege from '../Alerts/SuccessMessege';
// mock
// import USERLIST from '../_mock/user';


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'gender', label: 'Gender', alignRight: false },
  { id: 'public_gender', label: 'Public Gender', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'phone_number', label: 'Phone Number', alignRight: false },
  { id: 'dateofbirth', label: 'Dob', alignRight: false },
  { id: 'lat', label: 'Lat', alignRight: false },
  { id: 'lon', label: 'Lon', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [USERLIST, SETUSERLIST] = useState([])

  const [singleUser, setSingleUser] = useState({})

  const [rightDrawer, setRightDrawer] = useState({ right: false,type:"" });

  const [alertMssg, setAlertMssg] = useState({open:false,messege:"",type:"success"})

  const [reloadTable, setReloadTable] = useState("1")

  const toggleDrawer = (anchor, open, type, data) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    // setRightDrawer({type})
    console.log(data)
    setSingleUser(data)
    setRightDrawer({ ...rightDrawer, [anchor]: open ,type});
  };

 
  
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const getUser = ()=>{
    axios.get("/alluser").then((users)=>{
        console.log(users.data.users)
        SETUSERLIST(users.data.users)
    })
  }
 useEffect(()=>{
    getUser()
 },[reloadTable])
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          <Button variant="contained" component={RouterLink} onClick={toggleDrawer("right", true, "add")} to="#" startIcon={<Iconify icon="eva:plus-fill" />}>
            New User
          </Button>
        </Stack>
        
        <Drawer
          anchor="right"
          open={rightDrawer.right}
          
          onClose={toggleDrawer("right", false)}
        >
          {/* //6361747939 */}
          <div style={{padding:"20px"}}><AddUsers  reload={getUser} setRightDrawer={setRightDrawer} type={rightDrawer.type} setAlertMssg={setAlertMssg} singleUser={singleUser} /></div>
        </Drawer>
        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    
                    const isItemSelected = selected.indexOf(row.name) !== -1;

                    return (
                      <TableRow
                        hover
                        key={row._id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, row.name)} />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={row.name} src={row.profile_pic_url} />
                            <Typography variant="subtitle2" noWrap>
                              {row.name}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{row.gender}</TableCell>
                        <TableCell align="left">{row.public_gender}</TableCell>
                        <TableCell align="left"><Label variant="ghost" color={(row.role === 'user' && 'error') || 'success'}>{row.role}</Label></TableCell>
                        <TableCell align="left">{row.phone_number}</TableCell>
                        <TableCell align="left">{row.dateofbirth}</TableCell>
                        <TableCell align="left">{row.lat}</TableCell>
                        <TableCell align="left">{row.lon}</TableCell>

                        <TableCell align="right">
                        <UserMoreMenu setAlertMssg={setAlertMssg} reload={getUser} toggleDrawer={toggleDrawer} row={row}  path="http://www.koram.in:3000/api/v1/user/"  setRightDrawer={setRightDrawer} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
     <SuccessMessege open={alertMssg.open} setOpen={setAlertMssg} messege={alertMssg.messege} type={alertMssg.type}/>
    </Page>
  );
}
