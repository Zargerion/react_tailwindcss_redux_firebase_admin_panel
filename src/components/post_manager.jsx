import React from 'react';
import { Posts } from './posts.jsx';
import { collection, doc, addDoc, deleteDoc, getDocs } from "firebase/firestore";
import { db } from '../firebase'

const fetchBDData = async (object) => {
    try {
        const querySnapshot = await getDocs(collection(db, "textPosts"));
        const updatedPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        updatedPosts.sort((a, b) => b.time - a.time);
        object.setState({ posts: updatedPosts, theme: '', text: '' });
    } catch (error) {
      console.error('Ошибка при чтении данных бд:', error);
    }
};

class PostManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            theme: '',
            text: ''
        }
    };
    
    handleInputChangeText = (e) => {
        this.setState({ text: e.target.value })
    };

    handleInputChangeTheme = (e) => {
        this.setState({ theme: e.target.value })
    };

    componentDidMount() {
        fetchBDData(this)
    };
    
    handleSubmit = async () => {
        const { theme, text } = this.state;
        const time = new Date().getTime();
        const newPost = { theme, text, time };
        try {
            await addDoc(collection(db, "textPosts"), newPost);
        } catch (error) {
            console.error('Ошибка добавления данных:', error);
        } 
        await fetchBDData(this)
      };
      
      handleDelete = async (postId) => {
        try {
            await deleteDoc(doc(db, "textPosts", postId));
        } catch (error) {
            console.error('Ошибка удаления данных:', error);
        } 
        await fetchBDData(this)
      };
    
    render() {
        const { posts } = this.state
        return (
            <div className="p-4 bg-gray-50">
                <div className="flex flex-wrap items-center justify-center">
                    <div className="flex flex-col mr-4">
                        <input className="border rounded-md py-2 px-4 mb-2" type="theme" placeholder="Введите тему поста" onChange={this.handleInputChangeTheme} value={this.state.theme} />
                        <input className="border rounded-md py-2 px-4" type="text" placeholder="Введите текст поста" onChange={this.handleInputChangeText} value={this.state.text} />
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={this.handleSubmit}>Добавить пост</button>
                </div>
                {posts.map(post => (
                    <Posts key={post.time} post={post} deletePost={this.handleDelete}/>
                ))}
            </div>
        )
    }
}
  


export default PostManager;