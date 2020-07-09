import React from 'react';
import moment from 'moment';
import beach from '../../img/banner2.jpg';

function Blogs(props) {
  let { blogs } = props;
  let blogsComponent = blogs.map((blog, idx) => {
    let date = moment(blog.blogCreationDate).format('MMM Do YYYY');
    return (
      <div
        key={idx}
        id={blog.id}
        className="social-links"
        style={{ marginTop: '40px' }}
      >
        <div
          style={{
            backgroundImage: `url(${
              blog.blogCoverImage
                ? 'http://' +
                  window.location.hostname +
                  ':' +
                  window.location.port +
                  '/uploads/' +
                  blog.blogCoverImage
                : beach
            })`,
            backgroundColor: 'rgba(120,120,120,1)',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            display: 'inline-block',
            width: '100%',
            height: '200px',
            verticalAlign: 'middle',
            overflow: 'hidden'
          }}
        ></div>
        <a
          href=""
          style={{
            textTransform: 'uppercase',
            color: 'rgba(204, 87, 74, 1)',
            fontSize: '0.8em',
            display: 'block',
            marginTop: '40px',
            borderBottom: '0'
          }}
        >
          {' '}
          {blog.selectedCategories}
        </a>
        <a
          href=""
          className="label"
          style={{
            fontSize: '1.5em',
            textDecoration: 'none',
            borderBottom: 'none'
          }}
        >
          {blog.blogTitle}
        </a>
        <p
          style={{
            margin: '20px',
            textAlign: 'left'
          }}
        >
          {blog.blogDescription}
        </p>
        <div
          style={{
            margin: '0px 20px 0px 20px',
            borderTop: '1px solid rgba(204,204,204,0.7)'
          }}
        >
          <p
            style={{
              fontStyle: 'italic',
              fontSize: '0.8em',
              color: '#777',
              textAlign: 'left'
            }}
          >
            By [ user ] On {date}
          </p>
        </div>
      </div>
    );
  });
  return <React.Fragment>{blogsComponent}</React.Fragment>;
}

export default Blogs;
