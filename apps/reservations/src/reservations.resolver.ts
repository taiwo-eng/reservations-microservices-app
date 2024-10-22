import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ReservationDocument } from './models/reservation.schema';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { CurrentUser, UserDto } from '@app/common';

@Resolver(() => ReservationDocument)
export class ReservationsResolver {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Mutation(() => ReservationDocument)
  createReservation(
    @Args('createReservationInput')
    createReservationInput: CreateReservationDto,
    @CurrentUser() currentUser: UserDto,
  ) {
    return this.reservationsService.create(createReservationInput, currentUser);
  }

  @Query(() => [ReservationDocument], { name: 'reservations' })
  findAllReservations() {
    return this.reservationsService.findAll();
  }

  @Query(() => ReservationDocument, { name: 'reservation' })
  findOneReservation(@Args('id', { type: () => String }) id: string) {
    return this.reservationsService.findOne(id);
  }

  @Mutation(() => ReservationDocument, { name: 'removeReservation' })
  removeReservation(@Args('id', { type: () => String }) id: string) {
    return this.reservationsService.remove(id);
  }
}
