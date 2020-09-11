import React, {useState} from 'react';
import { Button } from 'antd';
import Axios from 'axios';
import { useSelector } from 'react-redux';

const Comment = (props) => {
    const { postId } = props;
    const user = useSelector(state => state.user);
    const [commentValue, setCommentValue] = useState('');

    const handleClick = (event) => setCommentValue(event.currentTarget.value)
    const onSubmit = (event) => {
        event.preventDefault();
        const variables = {
            content: commentValue,
            writer: user.userData._id,
            postId,
        }
        Axios.post('/api/comment/saveComment', variables)
            .then(res => {
                if(res.data.success) {
                    console.log(res.data);
                } else alert('댓글을 저장하지 못 했습니다.')
            })
    }
    return (
        <div>
            <br/>
            <p>Replies</p>
            <hr/>
            {/*Comments Lists*/}
            {/*Root Comment Form*/}
            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <textarea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleClick}
                    value={commentValue}
                    placeholder="댓글을 작성해 주세요"
                />
                <br/>
                <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button>
            </form>
        </div>
    )
}

export default Comment;
