export default async function getAllProduct() {

    const result = await fetch('http://localhost:8000/api/products',
        {
            next: { revalidate: 10 } 
        }
        // {
        //     cache: "no-store",
        // }
    );

    return result.json();
}