import { Hotelier, PublishedReservation, Client, Reserve, PaymentMethod } from "../controllers/reservation.controller";
import { PrismaClient, Prisma} from '@prisma/client';

export default class SetupDatabaseTest{

    private prisma: PrismaClient;

    constructor(){
        this.prisma = new PrismaClient();
    }

    async resetDatabase(){
        await this.prisma.promotion.deleteMany();
        await this.prisma.reserve.deleteMany();
        await this.prisma.publishedReservation.deleteMany();
        await this.prisma.hotelier.deleteMany();
        await this.prisma.paymentMethod.deleteMany();
        await this.prisma.client.deleteMany();
    }

    async setupDatabaseforPromotionTests(hotelier: Prisma.HotelierCreateInput, publishedReservation: Prisma.PublishedReservationCreateInput[], promotion?: Prisma.PromotionCreateInput[]){
        await this.prisma.hotelier.create({data: hotelier});
        if(promotion){
            for(let i = 0; i<promotion.length; i++){
                await this.prisma.promotion.create({data: promotion[i]});
            }
        }
        for(let i = 0; i<publishedReservation.length; i++){
            await this.prisma.publishedReservation.create({data: publishedReservation[i]});
        }
    }

    async setupDatabaseforEmailTests(client: Prisma.ClientCreateInput, hotelier: Prisma.HotelierCreateInput, publishedReservation: Prisma.PublishedReservationCreateInput, paymentMethod: Prisma.PaymentMethodCreateInput, reservation?: Prisma.ReserveCreateInput){
        await this.prisma.client.create({data: client});
        await this.prisma.hotelier.create({data: hotelier});
        await this.prisma.publishedReservation.create({data: publishedReservation});
        await this.prisma.paymentMethod.create({data: paymentMethod});
        if(reservation){
            await this.prisma.reserve.create({data: reservation});
        }
    }

    async setupDatabaseforReservationTests(client: Prisma.ClientCreateInput, hotelier: Prisma.HotelierCreateInput, publishedReservation: Prisma.PublishedReservationCreateInput, paymentMethod?: Prisma.PaymentMethodCreateInput, reservation?: Prisma.ReserveCreateInput){
        await this.prisma.client.create({data: client});
        await this.prisma.hotelier.create({data: hotelier});
        await this.prisma.publishedReservation.create({data: publishedReservation});
        if(paymentMethod){
            await this.prisma.paymentMethod.create({data: paymentMethod});
        }
        if(reservation){
            await this.prisma.reserve.create({data: reservation});
        }
    }

    async setupDatabaseForBuscaTests(publishedReservation: Prisma.PublishedReservationCreateInput, reservation: Reserve, hotelier: Hotelier, promotion: Prisma.PromotionCreateInput, client: Client, paymentMethod: Prisma.PaymentMethodCreateInput){
        let {id, ...reserv} = reservation;
        await this.prisma.client.create({data: client});
        await this.prisma.paymentMethod.create({data: paymentMethod})
        await this.prisma.hotelier.create({data: hotelier});
        await this.prisma.promotion.create({data: promotion});
        await this.prisma.publishedReservation.create({data: publishedReservation});
        await this.prisma.reserve.create({data: reserv});
    }
}
