import React, {useEffect, useState} from 'react';
import { Row, Col, List, Avatar } from 'antd';
import Axios from "axios";
import SideVideo from './Section/SideVideo';
import Subscribe from "./Section/Subscribe";
import Comment from './Section/Comment';

const VideoDetailPage = (props) => {
	const { videoId }= props.match.params;
	const variable = { videoId }
	const [videoDetail, setVideoDetail] = useState([]);

	useEffect(() => {
		Axios.post('/api/video/getVideoDetail', variable)
		.then(res => {
			if(res.data.success) {
				console.log(...res.data.videoDetail);
				setVideoDetail(...res.data.videoDetail)
			} else alert('비디오 정보를 가져오길 실패했습니다.')
		});
	}, [])

	if(videoDetail && videoDetail.filePath){
		console.log(videoDetail)
		console.log(videoDetail.writer);
		const subscribeButton = videoDetail.writer._id !== localStorage.getItem('userId')
			&& <Subscribe userTo={videoDetail.writer} userFrom={localStorage.getItem('userId')} />
		return (
			<Row gutter={[16, 16]}>
				<Col lg={18} xs={24}>
					<div style={{ width: '100%', padding: '3rem 4rem'}}>
						<video style={{ width: '100%', maxHeight: '500px' }} src={`http://localhost:5000/${videoDetail.filePath}`} controls />
						<List.Item
							actions={[subscribeButton]}
						>
							<List.Item.Meta
								avatar={<Avatar src={videoDetail.writer.image} />}
								title={videoDetail.writer.name}
								description={videoDetail.description}
							/>
						</List.Item>
						{/*Comment*/}
						<Comment postId={videoId} />
					</div>
				</Col>
				<Col lg={6} xs={24}>
					<SideVideo />
				</Col>
			</Row>
		)
	} else return (<div>...Loading</div>)
}

export default VideoDetailPage
