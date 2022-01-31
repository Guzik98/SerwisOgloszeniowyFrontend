import axios from 'axios';

export const deleteOffer = (_id: string) => {
    const url = `http://localhost:3000/offer/${_id}`;
    axios.delete(url, {
        headers: {
            'Authorization': 'Bearer ' + (localStorage.getItem('accessToken') as string)
        }
    }).then(() => {

    }).catch((error) => {
        console.log(error);
    });
};