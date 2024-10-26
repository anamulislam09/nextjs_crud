export default async function getAllProduct() {

    const result = await fetch('http://localhost:8000/api/products', {
        // next: {
        //     revalidate: 30, // 30 second por por render kore new data dekhabi ajonno next -> revalisate dite hoi.
        // },
    });

    return result.json();
}