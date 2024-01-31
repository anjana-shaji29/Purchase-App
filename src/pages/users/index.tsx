import React, { useEffect, useState } from 'react';
import './index.scss';
import { useAppDispatch, useAppSelector } from '../../redux/hooks.ts';
import { getUsers } from '../../redux/userSlice.ts';
import Table from '../../components/table/index.tsx';
import { User } from '../../redux/userSlice.ts';


    

const PageUsers = () => {

    const [search, setSearch] = useState(String);
    
    const columns = [{label: "Name", accessor: "name", sortable: true, basecolumn : true },
    {label: "Username", accessor: "username", sortable: true, basecolumn : false }, 
    
     {label: "Actions", render:(row : User) => {
        return row.guid;
    }, accessor: "guid" }, ]

    const reduxDispatch = useAppDispatch();
    const userListOriginal = useAppSelector((state) => state.users.userList); 
    const [userList, setUserList] = useState(Array<User>);
   
    useEffect(() =>{
        reduxDispatch(getUsers())

    },[reduxDispatch])

    useEffect( () => {
        setUserList(userListOriginal.filter((item) =>{
            return item.name.toLowerCase().includes(search.toLowerCase())
        }))
    }, [userListOriginal, search])
   
    return (
        <div className='user-box'>
            <div className='user-header-wrap'>
                <div className='user-search-container'>
                    <input type="text" placeholder='Search User' value={search} onChange={e=> setSearch(e?.target?.value)} />

                </div>

                <div className='add-user-container'>
                    <span className="material-symbols-outlined">
                        person_add
                    </span>
                    <span>  Add User </span>
                </div>

            </div>
        
        <Table columns={columns} data={userList} />

        </div>

    );
};

export default PageUsers;
