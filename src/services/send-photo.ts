import axios from 'axios';

export const sendProfilePhoto = async (data: FileList):  Promise<string> => {

    const formData = new FormData();
    formData.append('file', data[0]);
    let companyLogoUrl = 'http://localhost:3000/profile/logo/';
    await axios.post('http://localhost:3000/photo/upload', formData,
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        }).then((r) => {
        companyLogoUrl = companyLogoUrl + r.data;
    });
     return companyLogoUrl;
};