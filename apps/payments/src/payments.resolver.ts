import { Query, Resolver } from '@nestjs/graphql';
import { PaymentIntent } from './entities/payment-intent.entity';
import { PaymentsService } from './payments.service';

@Resolver(() => PaymentIntent)
export class PaymentsResolver {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Query(() => [PaymentIntent], { name: 'payments' })
  getAllPayments() {
    return this.paymentsService.getPayments();
  }
}
