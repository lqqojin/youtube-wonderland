import React, { useEffect, useState} from 'react';
import { Card, Icon, Avatar, Col, Typography, Row } from 'antd';
import Axios from 'axios';
import moment from 'moment';
import { FaCode } from "react-icons/fa";

const { Title } = Typography;
const { Meta } = Card;

const SubscriptionPage= () => {
    const [video, setVideo] = useState([]);

    useEffect(() => {
        const subscriptionVariables = {
            userFrom: localStorage.getItem('userId')
        };

        Axios.post('/api/video/getSubscriptionVideos', subscriptionVariables)
            .then(res => {
                if(res.data.success) {
                    console.log(res.data)
                    setVideo(res.data.videos);
                } else alert('비디오 가져오기를 실패 했습니다.')
            })
    }, [])
    const renderCards = video.map((video, index) => {
        let minutes = Math.floor(video.duration/ 60) || 0;
        let seconds = Math.floor((video.duration - minutes * 60)) || 0;

        return <Col key={index} lg={6} md={8} xs={24}>

            <div style={{ position: 'relative'}}>
                <a href={`/video/${video._id}`}>
                    <img style={{width: '100%'}} src={`http://localhost:5000/${video.thumbnail}`} />
                    <div className='duration'>
                        <span>{minutes} : {seconds}</span>
                    </div>
                </a>
            </div>
            <br/>
            <Meta
                avatar={
                    <Avatar src={video.writer.image} />
                }
                title={video.title}
                description=''
            />
            <span>{video.writer.name}</span>
            <br/>
            <span style={{margineLeft: '3rem'}}> {video.views} views </span>
            <br/>
            <span>{moment(video.createdAt).format('YYYY-MM-DD')}</span>
        </Col>;
    })

    return (
        <div style={{ width: '85%', margin: '3rem auto'}}>
            <Title level={2}> Recommend </Title>
            <hr/>
            <Row gutter={[32, 16]}>
                { renderCards }
            </Row>
        </div>
    )
}

export default SubscriptionPage;
