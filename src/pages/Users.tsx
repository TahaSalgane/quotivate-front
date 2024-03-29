import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { getAllUsers, disactiveUser, activeUser, banUser } from 'services/usersService';
import UserInterface from '../types/interfaces/user.interface';
import BreadCrumbs from 'components/ui/breadCrumbs';

const Users: React.FC = () => {
    const [users, setUsers] = useState<UserInterface[]>([]);
    useEffect(() => {
        const loadData = async () => {
            try {
                const { data } = await getAllUsers();
                setUsers(data.realData);
            } catch (error) {
                console.log(error);
            }
        };
        loadData();
    }, []);
    const handleClick = async (id: string) => {
        const index = users.findIndex((item: UserInterface) => item._id.toString() === id.toString());
        const listUpdate = [...users];
        console.log(users[index].status);
        if (users[index].status === 1) {
            await disactiveUser(id);
            listUpdate[index].status = 0;
            setUsers(listUpdate);
        } else if (users[index].status === 0) {
            await activeUser(id);
            listUpdate[index].status = 1;
            setUsers(listUpdate);
        } else if (users[index].status === -1) {
            await activeUser(id);
            listUpdate[index].status = 0;
            setUsers(listUpdate);
        }
    };
    const blockUser = async (id: string) => {
        const index = users.findIndex((item: UserInterface) => item._id.toString() === id.toString());
        const listUpdate = [...users];
        console.log(users[index].status);
        if (users[index].status === 1) {
            await banUser(id);
            listUpdate[index].status = -1;
            setUsers(listUpdate);
        } else if (users[index].status == -1) {
            await activeUser(id);
            listUpdate[index].status = 1;
            setUsers(listUpdate);
        }
    };
    return (
        <div className="">
            <div className="mt-4 mx-3">
                <BreadCrumbs
                    data={[
                        {
                            text: 'Home',
                            path: '/',
                        },
                        {
                            text: 'Dashboard',
                            path: '/admin/dashboard',
                        },
                        {
                            text: 'Users',
                            active: true,
                        },
                    ]}
                />
            </div>
            <h2 className="m-5">All Users</h2>
            <Table className="w-50 m-4 text-black" striped bordered hover variant="white">
                <thead>
                    <tr>
                        <th className="text-center">username</th>
                        <th className="text-center">Email</th>
                        <th className="text-center" colSpan={2}>
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user: UserInterface, index) => (
                        <tr key={index}>
                            <td className="text-center w-25 ">{user.username}</td>
                            <td className="text-center w-25 ">{user.email}</td>

                            <td style={{ width: '1%' }}>
                                <button
                                    className={`btn w-100 ${user.status === 1 ? 'btn-actived' : 'btn-desactived'}`}
                                    onClick={() => {
                                        handleClick(user._id);
                                    }}
                                >
                                    {user.status === 1 ? 'actived' : 'desactived'}
                                </button>
                            </td>
                            <td style={{ width: '1%' }}>
                                <button
                                    className={`btn w-100 ${user.status === -1 ? 'btn-banned' : 'btn-unbanned'}`}
                                    onClick={() => {
                                        blockUser(user._id);
                                    }}
                                >
                                    {user.status === -1 ? 'banned' : 'unbanned'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};
export default Users;
