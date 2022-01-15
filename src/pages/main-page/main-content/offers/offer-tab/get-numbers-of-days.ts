export const getNumberOfDays = ( start: string, end: string ): string => {
    const date1 = new Date(start);
    const date2 = new Date(end);

    const oneDay = 1000 * 60 * 60 * 24;

    const diffInTime = date2.getTime() - date1.getTime();

    const diffInDays = Math.round(diffInTime / oneDay);

    if ( diffInDays < 1 ){
        return 'Now';
    } else {
        return diffInDays + 'd ago';
    }
};
