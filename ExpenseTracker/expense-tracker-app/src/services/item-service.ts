import axios from 'axios';
import IItem from '../models/IItem';


const getItems = () => {
    return axios.get<IItem[]>('http://localhost:3000/items')
        .then(response => response.data)
};

const addItem = (newItem: Omit<IItem, 'id'>) => {
    return axios.post<IItem>(
        'http://localhost:3000/items',
        newItem,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
        .then(response => response.data)
};

export {
    getItems,
    addItem
}

