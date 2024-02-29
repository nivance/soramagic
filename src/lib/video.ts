import { Video } from "@prisma/client";
import prisma from "./prisma"

export const randomVideos = async (limit: number): Promise<Video[]> => {
    return await prisma.$queryRaw<Video[]>`SELECT * FROM "Video" ORDER BY random() LIMIT ${limit}`;
}

export const getVideoByNumber = async (number:string): Promise<Video | null> => {
    return prisma.video.findUnique({
      where: {
        number: number
      }
    });
}
