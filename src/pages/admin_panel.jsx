import React from 'react';
import PostManager from '../components/post_manager.jsx';
import IsAuth from '../components/is_auth.jsx';


class AdminPanel extends React.Component {
    render() {
        return (
            <div>
                <IsAuth/>
                <PostManager/>
            </div>
        )
    }
}

export default AdminPanel;