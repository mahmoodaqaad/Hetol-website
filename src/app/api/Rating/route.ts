import prisma from '@/utils/db';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
    try {
        const body = await req.json();
        const { roomId, userId, rating } = body;

        if (!roomId || !userId || !rating) {
            return NextResponse.json({ message: 'All Felied Requerd' }, { status: 400 });
        }

        // تحقق إذا المستخدم قيّم سابقاً
        const existingRating = await prisma.rating.findUnique({
            where: {
                roomId_userId: {
                    roomId,
                    userId,
                },
            },
        });

        if (existingRating) {
            return NextResponse.json({ message: 'لقد قمت بالتقييم مسبقاً' }, { status: 400 });
        }

        // إضافة تقييم جديد
        const newRating = await prisma.rating.create({
            data: {
                roomId,
                userId,
                ratingValue: rating,
            },
        });

        return NextResponse.json({ message: 'تم التقييم بنجاح', rating: newRating });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'حدث خطأ ما' }, { status: 500 });
    }
}
