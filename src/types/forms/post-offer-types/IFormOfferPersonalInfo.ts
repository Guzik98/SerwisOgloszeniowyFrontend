export type IFormOfferPersonalInfo = {
    name: string;
    surname: string;
    short_personal_description: string;
    photo: FileList | undefined,
    photoUrl: string;
}