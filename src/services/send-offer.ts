import axios from 'axios';
import Skills from '../pages/post-offer/pages/Skills';
import { GlobalState } from '../pages/post-offer/state-machine/type';

export const sendOffer = (data: GlobalState) => {
    console.log(data.yourDetails)
    const url = 'http://localhost:3000/offer'
    const today = new Date().toISOString();
    axios.post(url,{
        name: data.yourDetails.name,
        surname: data.yourDetails.surname,
         short_personal_description: data.yourDetails.shortDescription,
         photoUrl: data.yourDetails.photoUrl,
         title: data.yourDetails.name + ' ' + data.yourDetails.surname,
         street: data.yourDetails.street,
         city: data.yourDetails.city,
         country_code: data.yourDetails.country_code,
         address_text: data.yourDetails.street + ', ' + data.yourDetails.city + ', ' + data.yourDetails.country_code,
         email: data.yourDetails.email,
         github: data.yourDetails.github_url,
         linkedin_url: data.yourDetails.linkedin_url,
         phone_number: data.yourDetails.phone_number,
         education: data.yourDetails.education,
         certificate: data.yourDetails.certificate,
         experience: data.yourDetails.experience,
         project: data.yourDetails.projects,
         marker_icon: data.yourDetails.marker_icon,
         language: data.yourDetails.language,
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
    })
        .catch((error) => {
            console.log(error);
        })
}