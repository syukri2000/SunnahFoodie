
import prisma from "@/app/libs/prismadb";

export interface IListingsParams{
    userId?: string;
    category?: string;
    title?: string;
}

export default async function getListings(
    params: IListingsParams
){
    try {
        const { userId, category ,title} =params;

        let query:any ={};

        if(userId){
            query.userId = userId;
        }

        if(category){
            query.category= category;
        }

        if(title){
            query.title = title;
        }

        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
             createdAt: 'desc'
            }
        });

    const safeListings = listings.map((listing) =>({
        ...listing,
        createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
    } catch (error: any) {
        throw new Error(error);
        
    }
}