import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import { Typography, Button, Form, message, Input, Icon } from "antd";
import Dropzone from "react-dropzone";
const { TextArea } = Input;
const { Title } = Typography;

const privateOptions = [
    { value: 0, label: 'Private' },
    { value: 1, label: 'Public' }
];

const categoryOptions = [
    { value: 0, label: 'Film & Animation' },
    { value: 1, label: 'Autos & Vehicles' },
    { value: 2, label: 'Music' },
    { value: 3, label: 'Pets & Animals' },
]

const VideoUploadPage = () => {

    const [videoTitle, setVideoTitle] = useState('');
    const [description, setDescription] = useState('');
    const [Private, setPrivate] = useState(0);
    const [category, setCategory] = useState('Film & Animation');
    const [filePath, setFilePath] = useState('');
    const [duration, setDuration] = useState('');
    const [thumbnailPath, setThumbnailPath] = useState('');

    const onTitleChange = (e) => setVideoTitle(e.currentTarget.value)
    const onDescriptionChange = (e) => setDescription(e.currentTarget.value)
    const onPrivateChange = (e) => setPrivate(e.currentTarget.value)
    const onCategoryChange = (e) => setCategory(e.currentTarget.value)
    const onDrop = (files) => {
        let formData = new FormData;
        const config = {
            header: { 'content-type': 'multipart/form-data'}
        }
        formData.append('file', files[0]);
        console.log('files=', files);
        Axios.post('/api/video/uploadfiles', formData, config)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data)
                    const variable = {
                        url: response.data.url,
                        fileName: response.data.fileName
                    }
                    setFilePath(response.data.url);
                    Axios.post('/api/video/thumbnail', variable)
                        .then(response => {
                            if (response.data.success) {
                                console.log(response.data);
                                setDuration(response.data.fileDuration);
                                setThumbnailPath(response.data.url);
                            } else {
                                alert('썸네일 생성에 실패했습니다.')
                            }
                        })
                } else {
                    alert('비디오 업로드 실패 했습니다.')
                }
            })
    }
    useEffect(() => {
        console.log('>>', thumbnailPath);
    }, [thumbnailPath])
    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto'}}>
            <div style={{ textAlign: 'center', marginBottom: '2rem'}}>
                <Title level={2}>Upload Video</Title>
            </div>
            <Form>
                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                     {/*Drop Zone*/}
                     <Dropzone
                        onDrop={onDrop}
                        multiple={false}
                        maxSize={100000000}
                     >
                        {
                            ({ getRootProps, getInputProps}) => (
                                <div style={{
                                    width: '300px',
                                    height: '240px',
                                    border: '1px solid lightgray',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    }} {...getRootProps()}
                                >
                                    <input {...getInputProps()}/>
                                    <Icon type='plus' style={{ fontSize: '3rem'}} />
                                </div>
                            )
                        }
                    </Dropzone>
                    {/*Thumbnail*/}
                    {
                        thumbnailPath &&
                        <div>
                            <img src={`http://localhost:5000/${thumbnailPath}`} alt='thumbnail'/>
                        </div>
                    }
                </div>

                <br/>
                <br/>
                <label>Title</label>
                <Input
                    onChange={onTitleChange}
                    value={videoTitle}
                />
                <br/>
                <br/>
                <label>Description</label>
                <TextArea
                    onChange={onDescriptionChange}
                    value={description}
                />
                <br/>
                <br/>
                <select onChange={onPrivateChange}>
                    {privateOptions.map((item, index) => (
                        <option key={index} value={item.value}>
                            {item.label}
                        </option>
                    ))}
                </select>
                <br/>
                <br/>
                <select onChange={onCategoryChange}>
                    {categoryOptions.map((item, index) => (
                        <option key={index} value={item.value}>
                            {item.label}
                        </option>
                    ))}
                </select>
                <br/>
                <br/>
                <Button type='primary' size='large' onClick>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default VideoUploadPage;
