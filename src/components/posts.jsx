import React from 'react';
import { Post } from './post.jsx'

class Posts extends React.Component {

  render() {
    const { post } = this.props;

    return (
      <div className="p-3">
        <Post post={post} deletePost={this.props.deletePost}/>
      </div>
    );
  }
}

export {Posts};