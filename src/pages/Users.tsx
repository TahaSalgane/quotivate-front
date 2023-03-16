import React, { useState, useEffect } from 'react';
import { Col, Button, Row, Card, Form, Collapse, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAllUsers } from 'services/usersService';
const Users: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    useEffect(() => {
        const loadData = async () => {
            try {
                const { data } = await getAllUsers();
                console.log(data);
                setUsers(data);
                console.log(users);
            } catch (error) {
                console.log(error);
            }
        };
        loadData();
    }, []);
    return (
        <div className="">
            <h2 className="m-5">All Users</h2>
            <Table className="w-75 m-4 text-black" striped bordered hover variant="white">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nme</th>
                        <th>Email</th>
                        <th className="text-center" colSpan={2}>
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>azetat@gmail.com</td>
                        <td>
                            <Link className="btn btn-warning" to="update/1">
                                Update
                            </Link>
                        </td>
                        <td>
                            <Link className="btn btn-danger" to="delete/1">
                                delete
                            </Link>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>azetat@gmail.com</td>
                        <td>
                            <Link className="btn btn-warning" to="update/2">
                                Update
                            </Link>
                        </td>
                        <td>
                            <Link className="btn btn-danger" to="delete/2">
                                delete
                            </Link>
                        </td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Skalo</td>
                        <td>azetat@gmail.com</td>
                        <td>
                            <Link className="btn btn-warning" to="update/3">
                                Update
                            </Link>
                        </td>
                        <td>
                            <Link className="btn btn-danger" to="delete/3">
                                delete
                            </Link>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
};
export default Users;
