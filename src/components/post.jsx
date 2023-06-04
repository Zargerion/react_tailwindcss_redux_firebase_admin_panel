import React from 'react';

class Post extends React.Component {

  handleDelete = () => {
    const { post, deletePost } = this.props;
    deletePost(post.id);
  };

  render() {
    const { post } = this.props;

    return (
        <div className="p-4 rounded-md shadow-lg bg-white">
            <div className='flex flex-wrap items-center justify-center'>
                <div className="mr-auto">
                    <div className="text-lg font-semibold mb-2">
                        <p>{post.theme}</p>
                    </div>
                    <div className="text-gray-700">
                        <p>{post.text}</p>
                    </div>
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 float-right rounded" onClick={this.handleDelete}>Удалить</button>
            </div>
        </div>
    );
  }
}

export {Post};