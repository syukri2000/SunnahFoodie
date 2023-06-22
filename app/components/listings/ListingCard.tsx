'use client';

import { SafeUser, safeListing } from "@/app/types";
import { Listing, User } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import HeartButton from "../HeartButton";
import Button from "../Button";

interface ListingCardProps{
    data: safeListing;
    onAction?: (id:string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;

}

const ListingCard: React.FC<ListingCardProps> = ({
    data,
   
    onAction,
    disabled,
    actionLabel,
    actionId ="",
    currentUser

}) => {
    const router = useRouter();

    const handleCancel = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) =>{
            e.stopPropagation();

            if(disabled){
                return;
            }
            onAction?.(actionId);
        },[onAction, actionId ,disabled]
        
    );


    return ( 
    <div
        onClick={() => router.push(`/listings/${data.id}`)}
        className="
            col-span-1 cursor-pointer group
        "
    >
        <div className="flex flex-col gap-2 w-full">
            <div
                className="
                aspect-square
                w-full
                relative
                overflow-hidden
                rounded-xl
                "
            >
                <Image
                     fill
                    alt="Listing"
                    src={data.imageSrc}
                    className="
                        object-cover
                        h-full
                        w-full
                        group-hover:scale-110
                        transition
                    "
                />
                <div className="absolute top-3 right-3">
                    <HeartButton
                        listingId={data.id}
                        currentUser={currentUser}
                    />
                </div>
            </div>
            <div className="font-semibold text-lg">
                {data.title}
    
            </div>
            <div className="font-light text-neutral-500">
                {data.category}
            </div>
           
            {onAction && actionLabel &&(
                <Button
                    disabled={disabled}
                    small
                    label={actionLabel}
                    onClick={handleCancel}
                />
            )}
        </div>
       
    </div> );
}
 
export default ListingCard;