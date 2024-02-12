import React, { useEffect, useState } from 'react';
import './index.scss';
import { useAppDispatch, useAppSelector } from '../../redux/hooks.ts';
import { getUsers, deleteUser } from '../../redux/userSlice.ts';
import Table from '../../components/table/index.tsx';
import { User } from '../../redux/userSlice.ts';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from '../../components/Form/index.tsx';
 
const PageUsers = () => {
    
    const [show, setShow] = useState<boolean>(false);
    const [showFormModal,  setShowFormModal] = useState <boolean>(false);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
 
    const [search, setSearch] = useState(String);
 
    const columns = [{ label: "Name", accessor: "name", sortable: true, basecolumn: true },
    { label: "Username", accessor: "username", sortable: true, basecolumn: false },
 
    {
        label: "Actions", render: (row: User) => {
            return <div>
            <span  onClick={() => {
                setSelectedUserId(row.guid);
                setShow(true);
            }}
           
            style={{ color: "red" }} className="material-symbols-outlined">
                delete
            </span> </div>;
        }, accessor: "guid"
    },]
 
    const reduxDispatch = useAppDispatch();
    const userListOriginal = useAppSelector((state) => state.users.userList);
    const [userList, setUserList] = useState(Array<User>);
 
    useEffect(() => {
        reduxDispatch(getUsers())
 
    }, [reduxDispatch])
 
    useEffect(() => {
        setUserList(userListOriginal.filter((item) => {
            return item.name.toLowerCase().includes(search.toLowerCase())
        }))
    }, [userListOriginal, search])
 
    const handleClose = () => {
        setShow(false);
        setSelectedUserId(null);
    };
 
    const handleDelete = () => {
        if (selectedUserId) {
            console.log(selectedUserId);
            reduxDispatch(deleteUser(selectedUserId))
            .then((data) => {
                if (data.payload.data.status === 200) {
                    reduxDispatch(getUsers());
                    handleClose();
                } else {
                    console.error("Failed to delete user.");
                }
            });
        }
        handleClose();
    };
 
    const toggleFormModal = () => {
        setShowFormModal(!showFormModal);
    }
 
 
    return (

        <div className='user-box'>
            <div className='user-header-wrap'>
                <div className='user-search-container'>
                    <input type="text" placeholder='Search User' value={search} onChange={e => setSearch(e?.target?.value)} />
 
                </div>
 
                <div className='add-user-container' onClick={toggleFormModal}>
                    <span className="material-symbols-outlined">
                        person_add
                    </span>
                    <span className='add-user'>  Add User </span>
                </div>
 
            </div>
 
            <Table columns={columns} data={userList} />
           
            <div
                className="modal show box"
                style={{ display: show ? 'block': 'none', position: 'fixed', top:40, }}
            >
                <Modal.Dialog>
                    <Modal.Header closeButton onClick={handleClose}>
                        <Modal.Title> Buy It Now </Modal.Title>
                    </Modal.Header>
 
                    <Modal.Body>
                        <p> Do you want to delete? </p>
                    </Modal.Body>
 
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleDelete}> Yes </Button>
                        <Button variant="secondary" onClick={handleClose}> No </Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>


         {showFormModal && (
           <>
            <div className='overlay' onClick={toggleFormModal}
              style={{position: 'fixed', top:0, left:0,
             width:"100%", height: "100%", background:"rgba(0, 0, 0, 0.6)",
             zIndex:1000
            
            }}> </div>
            <div
                style={{ display: showFormModal ? 'block': 'none', position: 'fixed', top:"50%",
                left:"50%", transform: 'translate(-50%, -50%)', zIndex:1001,
            }} >
           
                <Modal.Dialog>
                <Form />
                </Modal.Dialog>
            </div> 
              </> ) }
           
        </div> 
 
    );
};
 
export default PageUsers;
 