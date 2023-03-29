import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faQuoteLeftAlt, faTags, faComment } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import { getAllUsers } from 'services/usersService';
import UserInterface from 'types/interfaces/user.interface';
import { getAllOfQuotes } from 'services/quotesService';
import QuoteInterface from 'types/quote.interface';
import { TagFormValues } from 'types/interfaces/formValidate.interface';
import { getTags } from 'services/tagsService';
import { getAllComments } from 'services/commentsService';
import { CommentInterface } from 'types/interfaces/comment.interface';
import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, LinearScale, CategoryScale, PointElement } from 'chart.js';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

// ChartJS.register(CategoryScale, LinearScale, PointElement);
const Dashboard: React.FC = () => {
    const [users, setUsers] = useState<UserInterface[]>([]);
    const [quotes, setQuotes] = useState<QuoteInterface[]>([]);
    const [tags, setTags] = useState<TagFormValues[]>([]);
    const [comments, setComments] = useState<CommentInterface[]>([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const arr = [];
                const { data } = await getAllUsers();
                setUsers(data.realData);
                const usersData = await getAllOfQuotes();
                setQuotes(usersData.data.realData);
                usersData.data.realData.map((item: QuoteInterface) => arr.push(item._id));
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
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Number of Quotes',
                data: [quotes.length],
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: false,
            },
        ],
    };
    return (
        <>
            <Container fluid className="mt-5">
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
                <Line data={data} />
            </Container>
        </>
    );
};

export default Dashboard;
