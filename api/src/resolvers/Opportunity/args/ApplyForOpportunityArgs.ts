import { Field, InputType } from "type-graphql";

@InputType()
export class ApplyForOpportunityArgs {
  @Field()
  opportunityId: string;
}
