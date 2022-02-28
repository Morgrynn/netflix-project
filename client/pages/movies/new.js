import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/useRequest';

const NewMovie = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  // const [year, setYear] = useState('');
  const [workout, setWorkout] = useState('');
  // const [imgTitle, setImgTitle] = useState('');
  // const [thumbnail, setThumbnail] = useState('');
  // const [trailer, setTrailer] = useState('');
  const [video, setVideo] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/movies',
    method: 'post',
    body: {
      title,
      desc,
      workout,
      // trailer,
      video,
    },
    onSuccess: () => Router.push('/movies'),
  });

  const onSubmit = (e) => {
    e.preventDefault();
    doRequest();
  };

  return (
    <div className='newProduct'>
      <h1 className='addProductTitle'>New Movie</h1>
      <form className='addProductForm' onSubmit={onSubmit}>
        <div className='form-group addProductItem'>
          <label>Title</label>
          <input
            value={title}
            className='form-control'
            type='text'
            placeholder='title'
            name='title'
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='form-group addProductItem'>
          <label>Description</label>
          <input
            value={desc}
            className='form-control'
            type='text'
            placeholder='description'
            name='desc'
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        {/* <div className='form-group addProductItem'>
          <label>Year</label>
          <input
            value={year}
            className='form-control'
            type='text'
            placeholder='Year'
            name='year'
            onChange={(e) => setYear(e.target.value)}
          />
        </div> */}
        <div className='form-group addProductItem'>
          <label>Workout</label>
          <input
            value={workout}
            className='form-control'
            type='text'
            placeholder='Workout'
            name='workout'
            onChange={(e) => setWorkout(e.target.value)}
          />
        </div>
        {/* <div className='form-group addProductItem'>
          <label>Image</label>
          <input
            value={img}
            className='form-control'
            type='file'
            id='img'
            name='img'
            onChange={(e) => setImg(e.target.value)}
          />
        </div> */}
        {/* <div className='form-group addProductItem'>
          <label>Title image</label>
          <input
            className='form-control'
            type='file'
            value={imgTitle}
            id='imgTitle'
            name='imgTitle'
            onChange={(e) => setImgTitle(e.target.value)}
          />
        </div> */}
        {/* <div className='form-group addProductItem'>
          <label>Thumbnail image</label>
          <input
            className='form-control'
            type='file'
            value={thumbnail}
            id='thumbnail'
            name='thumbnail'
            onChange={(e) => setThumbnail(e.target.value)}
          />
        </div> */}
        {/* <div className='form-group addProductItem'>
          <label>Trailer</label>
          <input
            className='form-control'
            type='file'
            value={trailer}
            name='trailer'
            onChange={(e) => setTrailer(e.target.value)}
          />
        </div> */}
        <div className='form-group addProductItem'>
          <label>Video</label>
          <input
            className='form-control'
            type='file'
            value={video}
            name='video'
            onChange={(e) => setVideo(e.target.value)}
          />
        </div>
        {errors}
        <button className='btn btn-primary addProductButton'>Upload</button>
      </form>
    </div>
  );
};

export default NewMovie;
