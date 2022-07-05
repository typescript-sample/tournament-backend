

export const randomNumber  = (min: number ,max: number) => {

    const maxNumber = Math.random() * (max - min + 1)


    return Math.floor(maxNumber) + min;
}