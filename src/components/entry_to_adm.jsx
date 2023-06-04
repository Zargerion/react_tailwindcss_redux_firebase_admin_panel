import React from 'react';
import { Link } from 'react-router-dom';

class EntryToAdm extends React.Component {
    render() {
        return (
            <div className="p-3 bg-gray-50 flex flex-wrap items-center justify-end">
                <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" to="/validation">В админку</Link>
            </div> 
        )
    }
}

export default EntryToAdm;