import axios from 'axios';

export const sendProfilePhoto = async ( data: File ):  Promise<string> => {

    const formData = new FormData();
    formData.append('file', data);
    let companyLogoUrl = 'http://localhost:3000/profile/logo/';
     await axios.post('http://localhost:3000/photo/upload', formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((r) => {
        companyLogoUrl = companyLogoUrl + r.data;
    });
     return companyLogoUrl;
};