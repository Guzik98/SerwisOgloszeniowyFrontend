import axios from 'axios';
import { GlobalState } from '../pages/post-offer/state-machine/type';
import { UpperCase } from '../functions/upperCase';

export const sendEditedOffer = (data: GlobalState) => {
    console.log(data);
    const url = `http://localhost:3000/offer/${data.yourDetails._id}`;
    console.log(url);
    const today = new Date().toISOString();

    axios.post(url,  {
        name: data.yourDetails.name,
        surname: data.yourDetails.surname,
        language: data.yourDetails.language,
        short_personal_description: data.yourDetails.short_personal_description,
        photo_url: data.yourDetails.photo_url,
        title: UpperCase(data.yourDetails.name) + ' ' + UpperCase(data.yourDetails.surname),
        street: UpperCase(data.yourDetails.street),
        city: UpperCase(data.yourDetails.city),
        country_code: data.yourDetails.country_code,
        address_text: UpperCase(data.yourDetails.street) + ', ' + UpperCase(data.yourDetails.city) + ', ' + data.yourDetails.country_code,
        email: data.yourDetails.email,
        github_url: data.yourDetails.github_url,
        linkedin_url: data.yourDetails.linkedin_url,
        phone_number: data.yourDetails.phone_number,
        education: data.yourDetails.education,
        certificate: data.yourDetails.certificate,
        experience: data.yourDetails.experience,
        project: data.yourDetails.project,
        marker_icon: data.yourDetails.marker_icon,
        latitude: data.yourDetails.latitude,
        longitude: data.yourDetails.longitude,
        published_at: today,
        employment_type: data.yourDetails.employment_type,
        skills: data.yourDetails.skills,
        experience_level: data.yourDetails.experience_level,
    }, {
        headers: {
            'Authorization': 'Bearer ' + (localStorage.getItem('accessToken') as string)
        }
    }).then((response) => {
        console.log(response);
    }).catch((error) => {
        console.log(error);
    });
};