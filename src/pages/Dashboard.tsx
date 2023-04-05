import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faQuoteLeftAlt, faTags, faComment } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import { getAllUsers } from 'services/usersService';
import UserInterface from 'types/interfaces/user.interface';
import { getAllOfQuotes } from 'services/quotesService';
import { DashBoardQuoteInterface } from 'types/interfaces/quote.interface';
import { TagFormValues } from 'types/interfaces/formValidate.interface';
import { getTags } from 'services/tagsService';
import { getAllComments } from 'services/commentsService';
import { CommentInterface } from 'types/interfaces/comment.interface';
import { Line, Bar } from 'react-chartjs-2';
import moment from 'moment';

// import { Chart as ChartJS, LinearScale, CategoryScale, PointElement } from 'chart.js';
import { Chart, registerables } from 'chart.js';
import BreadCrumbs from 'components/ui/breadCrumbs';
Chart.register(...registerables);

// ChartJS.register(CategoryScale, LinearScale, PointElement);
const Dashboard: React.FC = () => {
    const [users, setUsers] = useState<UserInterface[]>([]);
    const [quotes, setQuotes] = useState<DashBoardQuoteInterface[]>([]);
    const [tags, setTags] = useState<TagFormValues[]>([]);
    const [comments, setComments] = useState<CommentInterface[]>([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const { data } = await getAllUsers();
                setUsers(data.realData);
                const usersData = await getAllOfQuotes();
                setQuotes(usersData.data.realData);
                const res = await getTags();
                setTags(res.data.realData);
                const commentsData = await getAllComments();
                setComments(commentsData.data.realData);
            } catch (error) {
                console.log(error);
            }
        };
        loadData();
    }, []);
    const latestDays = [];
    for (let i = 0; i < 7; i++) {
        const day = moment().subtract(i, 'days');
        latestDays.unshift(day.format('D MMM'));
    }
    const commentsByDay: any = {};
    const usersByDay: any = {};
    const quotesByDay: any = {};
    const tagsByDay: any = {};
    const testing = (dataa: any, object: any) => {
        dataa.forEach((data: any) => {
            const dayOfWeek = moment(data.createdAt).format('D MMM');
            if (!object[dayOfWeek]) {
                object[dayOfWeek] = 1;
            } else {
                object[dayOfWeek]++;
            }
        });
    };

    testing(comments, commentsByDay);
    testing(users, usersByDay);
    testing(quotes, quotesByDay);
    testing(tags, tagsByDay);

    const data = {
        labels: latestDays,
        datasets: [
            {
                label: 'Number of Users',
                data: latestDays.map((day) => usersByDay[day] || 0),
                fill: false,
                borderColor: 'grey',
            },
            {
                label: 'Number of Comments',
                data: latestDays.map((day) => commentsByDay[day] || 0),
                fill: false,
                borderColor: 'green',
            },
            {
                label: 'Number of Comments',
                data: latestDays.map((day) => tagsByDay[day] || 0),
                fill: false,
                borderColor: '#0275d8',
            },
        ],
    };
    const quoteData = {
        labels: latestDays,
        datasets: [
            {
                label: 'Number of Quotes',
                data: latestDays.map((day) => quotesByDay[day] || 0),
                backgroundColor: '#7EC8E3',
                borderColor: '7EC8E3',
                borderWidth: 1,
            },
        ],
    };
    const options: any = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };
    return (
        <>
            <Container fluid className="mt-5">
                <div className="mt-4 mx-3">
                    <BreadCrumbs
                        data={[
                            {
                                text: 'Home',
                                path: '/',
                            },
                            {
                                text: 'Dashboard',
                                active: true,
                            },
                        ]}
                    />
                </div>
                <Row>
                    <Col lg="3" sm="6">
                        <Card className="pt-4 card-stats" style={{ height: '200px' }}>
                            <Card.Body>
                                <Row>
                                    <Col xs="5">
                                        <div className="text-center">
                                            <FontAwesomeIcon className="text-secondary fa-4x me-1" icon={faUsers} />
                                        </div>
                                    </Col>
                                    <Col xs="7">
                                        <h2 className="card-category">Users</h2>
                                        <Card.Title as="h4">
                                            {' '}
                                            <CountUp end={users.length} duration={2} />
                                        </Card.Title>
                                    </Col>
                                </Row>
                            </Card.Body>
                            <Card.Text className="mt-1 m-2 text-end">
                                <Link to="/admin/users" className="btn btn-dark w-100">
                                    See all Users
                                </Link>
                            </Card.Text>
                        </Card>
                    </Col>
                    <Col lg="3" sm="6">
                        <Card className="pt-4 card-stats" style={{ height: '200px' }}>
                            <Card.Body>
                                <Row>
                                    <Col xs="5">
                                        <div className="text-center">
                                            <FontAwesomeIcon className="text-dark fa-4x me-1" icon={faQuoteLeftAlt} />
                                        </div>
                                    </Col>
                                    <Col xs="7">
                                        <h3 className="card-category">Quotes</h3>
                                        <Card.Title as="h4">
                                            <CountUp end={quotes.length} duration={2} />
                                        </Card.Title>
                                    </Col>
                                </Row>
                            </Card.Body>
                            <Card.Text className="mt-1 m-2 text-end">
                                <Link to="/admin/quotes" className="btn btn-dark w-100">
                                    See all quotes
                                </Link>
                            </Card.Text>
                        </Card>
                    </Col>
                    <Col lg="3" sm="6">
                        <Card className="pt-4 card-stats" style={{ height: '200px' }}>
                            <Card.Body>
                                <Row>
                                    <Col xs="5">
                                        <div className="text-center">
                                            <FontAwesomeIcon
                                                style={{ color: '#1f93ff' }}
                                                className="fa-4x me-1"
                                                icon={faTags}
                                            />
                                        </div>
                                    </Col>
                                    <Col xs="7">
                                        <h4 className="card-category">tags</h4>
                                        <Card.Title as="h4">
                                            {' '}
                                            <CountUp end={tags.length} duration={2} />
                                        </Card.Title>
                                    </Col>
                                </Row>
                            </Card.Body>
                            <Card.Text className="mt-1 m-2 text-end">
                                <Link to="/admin/tags" className="btn btn-dark w-100">
                                    See all tags
                                </Link>
                            </Card.Text>
                        </Card>
                    </Col>
                    <Col lg="3" sm="6">
                        <Card className="pt-4 card-stats" style={{ height: '200px' }}>
                            <Card.Body>
                                <Row>
                                    <Col xs="5">
                                        <div className="text-center">
                                            <FontAwesomeIcon className="text-success  fa-4x me-1" icon={faComment} />
                                        </div>
                                    </Col>
                                    <Col xs="7">
                                        <h4 className="card-category">Comments</h4>
                                        <Card.Title as="h4">
                                            {' '}
                                            <CountUp end={comments.length} duration={2} />
                                        </Card.Title>
                                    </Col>
                                </Row>
                            </Card.Body>
                            <Card.Text className="mt-1 m-2 text-end">
                                <Link to="/admin/comments" className="btn btn-dark w-100">
                                    See all comments
                                </Link>
                            </Card.Text>
                        </Card>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col lg="6" sm="12">
                        {' '}
                        <Line data={data} options={options} />
                    </Col>
                    <Col lg="6" sm="12">
                        {' '}
                        <Bar data={quoteData} options={options} />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Dashboard;
